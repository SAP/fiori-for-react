#!/usr/bin/env node

const childProcess = require('child_process');
const path = require('path');

const SUPPORTED_TRANSFORMERS = ['transformLibToDist', 'renamePropsV17'];

const transformerDir = path.resolve(__dirname, '..', 'codemods');

const [transform, input = 'src', ...args] = process.argv.slice(2);

if (!SUPPORTED_TRANSFORMERS.includes(transform)) {
  // eslint-disable-next-line no-console
  console.error('Invalid transform choice, pick one of:');
  // eslint-disable-next-line no-console
  console.error(SUPPORTED_TRANSFORMERS.map((x) => '- ' + x).join('\n'));
  process.exit(1);
}

const jscodeshiftOptions = [];

const transformerPath = path.join(transformerDir, `${transform}.js`);
jscodeshiftOptions.push(`--transform`, transformerPath);

if (args.includes('--typescript')) {
  jscodeshiftOptions.push('--extensions=tsx,ts,jsx,js');
  jscodeshiftOptions.push('--parser', 'tsx');
} else {
  jscodeshiftOptions.push('--extensions=jsx,js');
}

jscodeshiftOptions.push('--ignore-pattern=**/node_modules/**');

// eslint-disable-next-line no-console
console.log(`Executing 'npx jscodeshift ${jscodeshiftOptions.join(' ')} ${input}'`);
childProcess.spawnSync('npx', ['jscodeshift', ...jscodeshiftOptions, input], {
  stdio: 'inherit'
});
