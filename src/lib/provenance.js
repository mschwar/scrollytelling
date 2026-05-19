const PROVENANCE_BUCKETS = [
  {
    key: "historical",
    label: "Historical records",
    isSpeculative: false,
  },
  {
    key: "speculative",
    label: "Speculative estimates",
    isSpeculative: true,
  },
];

function summarizeSources(entries) {
  const counts = new Map();

  for (const entry of entries) {
    counts.set(entry.source, (counts.get(entry.source) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([name, count]) => ({
      name,
      count,
    }))
    .sort((left, right) => left.name.localeCompare(right.name));
}

export function buildProvenanceSummary(data = []) {
  const entries = Array.isArray(data) ? data : [];

  return PROVENANCE_BUCKETS.map(({ key, label, isSpeculative }) => {
    const bucketEntries = entries.filter(
      (entry) => Boolean(entry?.is_speculative) === isSpeculative,
    );
    const sources = summarizeSources(bucketEntries);

    return {
      key,
      label,
      entryCount: bucketEntries.length,
      sourceCount: sources.length,
      sources,
    };
  });
}
