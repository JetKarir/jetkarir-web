const fs = require('fs');
const path = require('path');

const target = process.argv[2] || 'development';
const dest = path.resolve(__dirname, 'environment.ts');

if (target === 'example') return;

if (target === 'ci') {
  const secrets = JSON.parse(process.env.SECRETS_JSON || '{}');
  const example = path.resolve(__dirname, 'environment.example.ts');
  const content = fs.readFileSync(example, 'utf8');
  const result = content.replace(/(\w+):\s*'[^']*'/g, (_, key) => {
    const val = secrets[key] ?? '';
    if (!val) console.warn(`ci: secret "${key}" not found`);
    return `${key}: '${val}'`;
  });
  fs.writeFileSync(dest, result);
  console.log('env set: ci (from SECRETS_JSON)');
  process.exit(0);
}

const src = path.resolve(__dirname, `environment.${target}.ts`);

if (!fs.existsSync(dest)) {
  fs.writeFileSync(dest, '');
}

if (!fs.existsSync(src)) {
  const example = path.resolve(__dirname, 'environment.example.ts');
  if (fs.existsSync(example)) {
    fs.copyFileSync(example, dest);
    console.warn(`env.${target} not found — fallback to environment.example.ts`);
  } else {
    fs.writeFileSync(dest, '');
    console.warn(`env.${target} not found and no example — environment.ts cleared`);
  }
  return;
}

fs.copyFileSync(src, dest);
console.log(`env set: ${target}`);
