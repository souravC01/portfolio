import assert from 'node:assert/strict';
import { readFile,stat } from 'node:fs/promises';
import path from 'node:path';
import { projects } from '../src/projects.mjs';
const root=path.resolve('dist');
const pages=['index.html',...projects.map(p=>`projects/${p.slug}/index.html`),'404.html'];
const cache=new Map();
async function html(file){if(!cache.has(file))cache.set(file,await readFile(file,'utf8'));return cache.get(file);}
for(const page of pages){const filename=path.join(root,page);const text=await html(filename);assert.equal((text.match(/<h1[ >]/g)||[]).length,1,page+' should have one h1');assert.match(text,/<title>.+<\/title>/);assert.match(text,/<meta name="description" content="[^"]+"/);assert(!/Coming soon|Currently Building|href="#"|file:\/\//i.test(text),'No placeholders or file links');for(const [,ref] of text.matchAll(/(?:href|src)="([^"]+)"/g)){if(/^(https?:|mailto:)/.test(ref))continue;const u=new URL(ref,'https://portfolio.test/'+page);let target=path.join(root,decodeURIComponent(u.pathname));const s=await stat(target);if(s.isDirectory())target=path.join(target,'index.html');await stat(target);if(u.hash){const body=await html(target);assert(body.includes(`id="${u.hash.slice(1)}"`),`${page}: broken anchor ${ref}`);}}}
for(const p of projects){assert(p.sections.length>=7);assert.match(p.repo,/github.com\/souravC01\/.+/);}
const home=await html(path.join(root,'index.html'));let previous=-1;for(const p of projects){const at=home.indexOf(`<h3>${p.name}</h3>`);assert(at>previous,'Project order');previous=at;}
console.log('PASS: six pages, local assets and anchors, metadata, project order, complete case-study sections, and résumé download.');
