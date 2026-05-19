#!/usr/bin/env node

import { access, readFile } from 'node:fs/promises';
import { constants as fsConstants } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const args = new Set(process.argv.slice(2));
const strict = args.has('--check');
const errors = [];
const warnings = [];

async function fileExists(relativePath) {
  try {
    await access(path.join(root, relativePath), fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function readText(relativePath) {
  return readFile(path.join(root, relativePath), 'utf8');
}

function addError(message) {
  errors.push(message);
}

function addWarning(message) {
  warnings.push(message);
}

async function requireFile(relativePath) {
  if (!(await fileExists(relativePath))) {
    addError(`Missing required file: ${relativePath}`);
  }
}

async function checkMarkdownLinks(relativePath) {
  const content = await readText(relativePath);
  const dir = path.dirname(relativePath);
  const linkRegex = /\[[^\]]+\]\(([^)]+)\)/g;
  let match;

  while ((match = linkRegex.exec(content))) {
    const target = match[1].trim();

    if (
      target.startsWith('http://') ||
      target.startsWith('https://') ||
      target.startsWith('mailto:') ||
      target.startsWith('#')
    ) {
      continue;
    }

    const cleanTarget = target.split('#')[0].split('?')[0];
    const resolved = cleanTarget.startsWith('/')
      ? cleanTarget.slice(1)
      : path.normalize(path.join(dir, cleanTarget));

    if (cleanTarget && !(await fileExists(resolved))) {
      addError(`${relativePath} links to missing local target: ${target}`);
    }
  }
}

async function checkHtmlAssets(relativePath) {
  const content = await readText(relativePath);
  const assetRegex = /\b(?:href|src)=["']([^"']+)["']/g;
  let match;

  while ((match = assetRegex.exec(content))) {
    const target = match[1].trim();

    if (
      target.startsWith('http://') ||
      target.startsWith('https://') ||
      target.startsWith('data:') ||
      target.startsWith('mailto:') ||
      target.startsWith('#')
    ) {
      continue;
    }

    const cleanTarget = target.split('#')[0].split('?')[0];
    const resolved = cleanTarget.startsWith('/')
      ? cleanTarget.slice(1)
      : path.normalize(path.join(path.dirname(relativePath), cleanTarget));

    if (cleanTarget && !(await fileExists(resolved))) {
      addError(`${relativePath} references missing asset: ${target}`);
    }
  }
}

function assert(condition, message) {
  if (!condition) {
    addError(message);
  }
}

async function main() {
  const requiredFiles = [
    'package.json',
    'README.md',
    'AGENTS.md',
    'CURRENT_STATE.md',
    'docs/agentic-overhaul/two-prompt-loop-plan.md',
    'index.html',
    'vite.config.js',
    'svelte.config.js',
    'src/main.js',
    'src/App.svelte',
    'src/app.css',
    'src/components/Background.svelte',
    'src/components/Chart.svelte',
    'src/components/Narrative.svelte',
    'src/components/Scrolly.svelte',
    'src/components/Tooltip.svelte',
    'src/data/compute_history.json',
    'scripts/validate_repo.js',
    '.github/workflows/validate.yml',
    'docs/agentic-overhaul/2026-05-audit.md',
  ];

  for (const relativePath of requiredFiles) {
    await requireFile(relativePath);
  }

  const packageJson = JSON.parse(await readText('package.json'));
  assert(
    typeof packageJson.scripts?.build === 'string',
    'package.json is missing the build script',
  );
  assert(
    typeof packageJson.scripts?.validate === 'string',
    'package.json is missing the validate script',
  );
  assert(
    packageJson.scripts?.validate === 'node scripts/validate_repo.js',
    'package.json validate script should call scripts/validate_repo.js',
  );

  const readme = await readText('README.md');
  assert(
    readme.includes('npm run validate'),
    'README.md should document npm run validate',
  );

  const agents = await readText('AGENTS.md');
  assert(
    agents.includes('npm run validate'),
    'AGENTS.md should document npm run validate',
  );

  await checkMarkdownLinks('README.md');
  await checkMarkdownLinks('AGENTS.md');
  await checkMarkdownLinks('CURRENT_STATE.md');
  await checkMarkdownLinks('docs/agentic-overhaul/2026-05-audit.md');
  await checkHtmlAssets('index.html');

  const data = JSON.parse(await readText('src/data/compute_history.json'));
  assert(Array.isArray(data), 'compute_history.json must contain an array');
  assert(data.length > 0, 'compute_history.json must not be empty');

  const seenIds = new Set();
  const allowedCategories = new Set([
    'Historical',
    'Deep Learning',
    'Theory',
    'Speculative',
  ]);

  for (const [index, entry] of data.entries()) {
    const prefix = `compute_history.json entry ${index}`;

    assert(entry && typeof entry === 'object', `${prefix} must be an object`);

    const requiredStringFields = [
      'id',
      'name',
      'organization',
      'category',
      'hardware_analogy',
      'human_analogy',
      'source',
    ];

    for (const field of requiredStringFields) {
      assert(
        typeof entry[field] === 'string' && entry[field].trim().length > 0,
        `${prefix} is missing a valid ${field} field`,
      );
    }

    assert(
      Number.isFinite(entry.date_decimal),
      `${prefix} must have a finite date_decimal`,
    );
    assert(
      Number.isFinite(entry.training_compute_flops),
      `${prefix} must have a finite training_compute_flops value`,
    );
    assert(
      typeof entry.is_highlight === 'boolean',
      `${prefix} must have a boolean is_highlight field`,
    );
    assert(
      allowedCategories.has(entry.category),
      `${prefix} has an unsupported category: ${entry.category}`,
    );

    if ('training_cost_usd' in entry) {
      assert(
        Number.isFinite(entry.training_cost_usd),
        `${prefix} has a non-numeric training_cost_usd value`,
      );
    }

    if ('cost_estimate' in entry) {
      assert(
        typeof entry.cost_estimate === 'string' &&
          entry.cost_estimate.trim().length > 0,
        `${prefix} has an invalid cost_estimate value`,
      );
    }

    if ('is_speculative' in entry) {
      assert(
        typeof entry.is_speculative === 'boolean',
        `${prefix} has a non-boolean is_speculative value`,
      );
    }

    if (entry.category === 'Speculative') {
      assert(
        entry.is_speculative === true,
        `${prefix} should be marked speculative`,
      );
    }

    assert(!seenIds.has(entry.id), `${prefix} has a duplicate id: ${entry.id}`);
    seenIds.add(entry.id);

  }

  if (warnings.length) {
    console.warn('Validation warnings:');
    for (const warning of warnings) {
      console.warn(`- ${warning}`);
    }
    if (strict) {
      console.error('\nStrict validation requested; warnings are treated as failures.');
      process.exit(1);
    }
  }

  if (errors.length) {
    console.error('Validation failed:');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(
    `Validation passed: ${data.length} data points, ${requiredFiles.length} required files checked.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
