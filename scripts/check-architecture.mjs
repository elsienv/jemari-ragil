import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../src/', import.meta.url));
const files = [];

function collect(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) collect(file);
    else if (/\.(js|jsx)$/.test(entry.name)) files.push(file);
  }
}
collect(root);

const violations = [];
let importCount = 0;

for (const file of files) {
  const source = fs.readFileSync(file, 'utf8');
  const relative = path.relative(root, file).split(path.sep).join('/');
  if (!/^(app|features|layouts|pages|shared)\//.test(relative) && relative !== 'main.jsx') {
    violations.push(relative + ': place source code in an established application layer');
  }
  const imports = /(?:import|export)\s+(?:(?:[^'";]+?)\s+from\s*)?['"]([^'"]+)['"]/g;

  for (const match of source.matchAll(imports)) {
    const specifier = match[1];
    if (relative.includes('/lib/') && /^react(?:-dom|-router-dom)?(?:\/|$)/.test(specifier)) {
      violations.push(relative + ': pure logic must not import React');
    }
    if (!specifier.startsWith('.')) continue;
    importCount++;
    const base = path.resolve(path.dirname(file), specifier);
    const resolved = [
      base,
      ...['.js', '.jsx', '.css', '.json'].map((extension) => base + extension),
    ].find((candidate) => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
    if (!resolved) {
      violations.push(relative + ': unresolved ' + specifier);
      continue;
    }

    const dependency = path.relative(root, resolved).split(path.sep).join('/');
    if (relative.startsWith('shared/') && !dependency.startsWith('shared/')) {
      violations.push(relative + ': shared must not depend on ' + dependency);
    }
    if (relative.startsWith('features/') && /^(app|layouts|pages)\//.test(dependency)) {
      violations.push(relative + ': feature must not depend on ' + dependency);
    }
    if (
      relative.startsWith('features/') &&
      dependency.startsWith('features/') &&
      relative.split('/')[1] !== dependency.split('/')[1] &&
      dependency.includes('/providers/')
    ) {
      violations.push(relative + ': feature providers are composed only by the application');
    }
    if (relative.includes('/lib/') && dependency.endsWith('.jsx')) {
      violations.push(relative + ': pure logic must not depend on JSX ' + dependency);
    }
  }

  if (relative.includes('/context/')) {
    assert.ok(
      !/use(?:State|Effect|Context)\s*\(/.test(source),
      relative + ': context should only declare the context',
    );
  }
}

assert.deepEqual(violations, [], violations.join('\n'));
console.log(
  'Architecture checks passed: ' + files.length + ' modules, ' + importCount + ' local imports.',
);
