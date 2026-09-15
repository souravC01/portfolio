import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = new URL('../src/assets/', import.meta.url);

const downloads = [
  // Fonts
  {
    url: 'https://emmanuelebeh.dev/assets/Baufra-Regular-uKAsOBuO.woff2',
    path: 'fonts/Baufra-Regular.woff2'
  },
  {
    url: 'https://emmanuelebeh.dev/assets/Baufra-Medium-BxwubhkV.woff2',
    path: 'fonts/Baufra-Medium.woff2'
  },
  {
    url: 'https://emmanuelebeh.dev/assets/Baufra-SemiBold-Jl2eLYYU.woff2',
    path: 'fonts/Baufra-SemiBold.woff2'
  },
  {
    url: 'https://emmanuelebeh.dev/assets/Baufra-Bold-BRg_0T6l.woff2',
    path: 'fonts/Baufra-Bold.woff2'
  },
  // Texture
  {
    url: 'https://emmanuelebeh.dev/images/noise-bg.webp',
    path: 'images/noise-bg.webp'
  },
  // Default cover
  {
    url: 'https://emmanuelebeh.dev/images/utils/default-cover.png',
    path: 'images/default-cover.png'
  },
  // Flags
  {
    url: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/us.svg',
    path: 'images/us.svg'
  },
  {
    url: 'https://cdn.jsdelivr.net/gh/lipis/flag-icons/flags/4x3/fr.svg',
    path: 'images/fr.svg'
  },
  // Hero portrait
  {
    url: 'https://bbsfmyufuuksgzewczzz.supabase.co/storage/v1/render/image/public/images/1771236286656-me.png?width=864&height=1094',
    path: 'images/me.png'
  },
  // Projects
  {
    url: 'https://bbsfmyufuuksgzewczzz.supabase.co/storage/v1/render/image/public/project-images/1780660209836-Screenshot%202026-06-05%20at%2011.48.07.png?width=1080&height=611',
    path: 'images/project-feank.png'
  },
  {
    url: 'https://bbsfmyufuuksgzewczzz.supabase.co/storage/v1/render/image/public/project-images/1774092401437-553616956-d0443cff-1494-47cf-9cd3-32aef988f1e4.jpeg?width=1080&height=611',
    path: 'images/project-lkm.jpg'
  },
  {
    url: 'https://bbsfmyufuuksgzewczzz.supabase.co/storage/v1/render/image/public/project-images/1771291985162-screenshot.jpeg?width=1080&height=611',
    path: 'images/project-lofi.jpg'
  },
  // Audio
  {
    url: 'https://bbsfmyufuuksgzewczzz.supabase.co/storage/v1/object/public/media-files/1771286169823-good-night-lofi-cozy-chill-music.mp3',
    path: 'audio/lofi.mp3'
  }
];

async function run() {
  console.log('Downloading assets...');
  for (const item of downloads) {
    const targetUrl = new URL(item.path, root);
    await mkdir(new URL('./', targetUrl), { recursive: true });
    try {
      const res = await fetch(item.url);
      if (!res.ok) {
        console.error(`Failed to download ${item.url}: HTTP ${res.status}`);
        continue;
      }
      const buffer = Buffer.from(await res.arrayBuffer());
      await writeFile(targetUrl, buffer);
      console.log(`Saved ${item.path} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`Error downloading ${item.url}:`, err.message);
    }
  }
  console.log('All assets processed.');
}

run();
