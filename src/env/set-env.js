const fs = require('fs');
const path = require('path');

const ARG = process.argv[2] || 'dev';
const dest = path.resolve(__dirname, 'environment.ts');

const ALIAS = { development: 'dev', production: 'prod', testing: 'test' };
const target = ALIAS[ARG] ?? ARG;

function parseEnv(content) {
  const vars = {};
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    vars[key] = val;
  }
  return vars;
}

function generateTs(vars) {
  const entries = Object.entries(vars)
    .map(([k, v]) => `  ${k}: '${v.replace(/'/g, "\\'")}'`)
    .join(',\n');
  return `export const environment = {\n${entries},\n};\n`;
}

if (target === 'ci') {
  const example = path.resolve(__dirname, '.env.example');
  const vars = parseEnv(fs.readFileSync(example, 'utf8'));
  for (const key of Object.keys(vars)) {
    if (process.env[key] !== undefined) vars[key] = process.env[key];
    else console.warn(`ci: secret "${key}" not found`);
  }
  fs.writeFileSync(dest, generateTs(vars));
  console.log('env set: ci (from environment secrets)');
  process.exit(0);
}

const src = path.resolve(__dirname, `.env.${target}`);

if (!fs.existsSync(src)) {
  const fallback = path.resolve(__dirname, '.env.example');
  if (fs.existsSync(fallback)) {
    const vars = parseEnv(fs.readFileSync(fallback, 'utf8'));
    fs.writeFileSync(dest, generateTs(vars));
    console.warn(`env.${target} not found — fallback to .env.example`);
  } else {
    fs.writeFileSync(dest, 'export const environment = {};\n');
    console.warn(`env.${target} not found and no example — environment.ts cleared`);
  }
  process.exit(0);
}

const vars = parseEnv(fs.readFileSync(src, 'utf8'));
fs.writeFileSync(dest, generateTs(vars));
console.log(`env set: ${target} → environment.ts`);
