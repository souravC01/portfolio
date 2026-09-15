import { mkdtemp, cp, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

// No old dist files are copied: missing generation or source assets must fail.
const root = fileURLToPath(new URL('../', import.meta.url));
await mkdir(path.join(root, 'tmp'), { recursive: true });
const fixture = await mkdtemp(path.join(root, 'tmp', 'clean-build-'));
for (const directory of ['src', 'scripts']) {
  await cp(path.join(root, directory), path.join(fixture, directory), { recursive: true });
}
for (const script of ['build.mjs', 'check.mjs']) {
  execFileSync(process.execPath, [path.join(fixture, 'scripts', script)], { cwd: fixture, stdio: 'inherit' });
}
console.log('PASS: Build from source alone; fixture retained in', fixture);
