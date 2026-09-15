import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.mp3': 'audio/mpeg'
};

const server = http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = path.resolve(root, '.' + pathname);
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(403);
      return res.end();
    }
    const fileStat = await stat(file);
    if (fileStat.isDirectory()) {
      file = path.join(file, 'index.html');
    }
    const data = await readFile(file);
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, {
      'Content-Type': mime[ext] ?? 'application/octet-stream',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0'
    });
    res.end(data);
  } catch (err) {
    try {
      const notFoundData = await readFile(path.join(root, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(notFoundData);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found');
    }
  }
});

const PORT = 4173;
server.listen(PORT, '127.0.0.1', () => {
  console.log(`Local preview server running at http://127.0.0.1:${PORT}`);
});
