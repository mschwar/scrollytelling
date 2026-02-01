// Script to recalculate human analogies with correct formula
// FLOPs / (1 calc/s * 86400 sec/day * 365 days/year * 75 years)

const fs = require('fs');
const path = require('path');

const HUMAN_CALCS_PER_SEC = 1;
const SECS_PER_DAY = 86400;
const DAYS_PER_YEAR = 365;
const HUMAN_LIFESPAN = 75; // years
const SECS_PER_LIFETIME = SECS_PER_DAY * DAYS_PER_YEAR * HUMAN_LIFESPAN; // 2,365,200,000

function calculateHumanAnalogy(flops) {
    const lifetimes = flops / SECS_PER_LIFETIME;

    if (lifetimes < 0.001) {
        const hours = flops / (60 * 60);
        if (hours < 1) {
            const minutes = flops / 60;
            return `${minutes.toFixed(0)} human minutes`;
        }
        return `${hours.toFixed(0)} human hours`;
    } else if (lifetimes < 0.1) {
        const days = flops / SECS_PER_DAY;
        return `${days.toFixed(0)} human days`;
    } else if (lifetimes < 1) {
        const years = flops / (SECS_PER_DAY * DAYS_PER_YEAR);
        return `${years.toFixed(1)} human years`;
    } else if (lifetimes < 1000) {
        return `${lifetimes.toFixed(0)} human lifetimes`;
    } else if (lifetimes < 1e6) {
        const thousands = lifetimes / 1000;
        return `${thousands.toFixed(0)}K human lifetimes`;
    } else if (lifetimes < 1e9) {
        const millions = lifetimes / 1e6;
        return `${millions.toFixed(1)}M human lifetimes`;
    } else {
        const billions = lifetimes / 1e9;
        return `${billions.toFixed(1)}B human lifetimes`;
    }
}

// Load data
const dataPath = path.join(__dirname, 'src', 'data', 'compute_history.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log('Recalculating human analogies...\n');
console.log(`Formula: FLOPs / (${SECS_PER_LIFETIME.toLocaleString()} seconds per lifetime)\n`);

// Update each entry
data.forEach(entry => {
    const oldAnalogy = entry.human_analogy;
    const newAnalogy = calculateHumanAnalogy(entry.training_compute_flops);
    entry.human_analogy = newAnalogy;

    if (oldAnalogy !== newAnalogy) {
        console.log(`${entry.name}:`);
        console.log(`  FLOPs: ${entry.training_compute_flops.toExponential(1)}`);
        console.log(`  OLD: ${oldAnalogy}`);
        console.log(`  NEW: ${newAnalogy}`);
        console.log('');
    }
});

// Write back
fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));
console.log(`✓ Updated ${data.length} entries`);
console.log(`✓ Saved to ${dataPath}`);
