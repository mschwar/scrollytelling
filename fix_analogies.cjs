const fs = require('fs');
const path = require('path');

// Constants
const SECS_PER_LIFETIME = 86400 * 365 * 75; // 2,365,200,000 seconds

function calculateHumanAnalogy(flops) {
    const lifetimes = flops / SECS_PER_LIFETIME;

    if (lifetimes < 0.00001) {
        const minutes = flops / 60;
        return `${Math.round(minutes)} minutes`;
    } else if (lifetimes < 0.001) {
        const hours = flops / 3600;
        return `${Math.round(hours)} hours`;
    } else if (lifetimes < 0.1) {
        const days = flops / 86400;
        return `${Math.round(days)} days`;
    } else if (lifetimes < 1) {
        const years = flops / (86400 * 365);
        if (years < 10) {
            return `${years.toFixed(1)} years`;
        }
        return `${Math.round(years)} years`;
    } else if (lifetimes < 1000) {
        return `${Math.round(lifetimes)} human lifetimes`;
    } else if (lifetimes < 1e6) {
        const k = lifetimes / 1000;
        return `${Math.round(k)}K human lifetimes`;
    } else if (lifetimes < 1e9) {
        const m = lifetimes / 1e6;
        return `${m.toFixed(1)}M human lifetimes`;
    } else {
        const b = lifetimes / 1e9;
        return `${b.toFixed(1)}B human lifetimes`;
    }
}

// Load and process
const dataPath = path.join(__dirname, 'src', 'data', 'compute_history.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

console.log(`\nRecalculating ${data.length} entries...`);
console.log(`Formula: FLOPs / ${SECS_PER_LIFETIME.toLocaleString()} seconds\n`);

let changed = 0;
data.forEach(entry => {
    const old = entry.human_analogy;
    const newVal = calculateHumanAnalogy(entry.training_compute_flops);

    if (old !== newVal) {
        changed++;
        console.log(`${entry.name}:`);
        console.log(`  ${entry.training_compute_flops.toExponential(1)} FLOPs`);
        console.log(`  OLD: "${old}"`);
        console.log(`  NEW: "${newVal}"`);
        console.log('');
    }

    entry.human_analogy = newVal;
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));
console.log(`\n✅ Updated ${changed} entries`);
console.log(`✅ Saved to: ${dataPath}`);
