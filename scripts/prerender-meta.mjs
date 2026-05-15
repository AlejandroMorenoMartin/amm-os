import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, '..', 'dist');

const OG_IMAGE = 'https://alejandromorenomartin.com/og-image.png';
const BASE_URL = 'https://alejandromorenomartin.com';

const ROUTE_META = {
  '/': {
    title: 'Alejandro Moreno Martín · AI Product Designer',
    description:
      'Designing digital products with people at the centre. Obsessed with usability, always learning how AI changes what good design means.',
  },
  '/projects': {
    title: 'Projects · Alejandro Moreno Martín',
    description:
      'Explore the selection of projects I have worked on and continue to develop.',
  },
  '/projects/amm-os': {
    title: 'AMM-OS · Alejandro Moreno Martín',
    description:
      'Discover the portfolio built as a functional OS experience, where design meets production code.',
  },
  '/projects/senzo-studio': {
    title: 'SENZO-STUDIO · Alejandro Moreno Martín',
    description: 'Enter the immersive platform designed for a high-end visual effects studio.',
  },
  '/projects/casa-del-aire': {
    title: 'Casa del Aire · Alejandro Moreno Martín',
    description:
      'Explore the booking experience designed for a boutique rural accommodation.',
  },
  '/projects/sazon': {
    title: 'SAZON · Alejandro Moreno Martín',
    description:
      'Access the social platform built for intelligent recipe management and culinary culture.',
  },
  '/projects/forma': {
    title: 'FORMA · Alejandro Moreno Martín',
    description:
      'Discover the biometric platform designed to optimise athletic performance and recovery.',
  },
  '/skills': {
    title: 'Skills · Alejandro Moreno Martín',
    description:
      'Explore the strategy, design engineering and AI orchestration skills I bring to every project.',
  },
  '/resume': {
    title: 'Resume · Alejandro Moreno Martín',
    description:
      'Access the background, experience and education of Alejandro Moreno Martín, AI Product Designer.',
  },
};

const baseHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

function buildHeadTags(route) {
  const meta = ROUTE_META[route] ?? ROUTE_META['/'];
  const url = `${BASE_URL}${route === '/' ? '' : route}`;
  return `  <title>${meta.title}</title>
  <meta name="description" content="${meta.description}" />
  <link rel="canonical" href="${url}" />
  <meta property="og:title" content="${meta.title}" />
  <meta property="og:description" content="${meta.description}" />
  <meta property="og:image" content="${OG_IMAGE}" />
  <meta property="og:url" content="${url}" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${meta.title}" />
  <meta name="twitter:description" content="${meta.description}" />
  <meta name="twitter:image" content="${OG_IMAGE}" />`;
}

function injectMeta(html, route) {
  const tags = buildHeadTags(route);
  return html
    .replace(/<title>.*?<\/title>/s, '')
    .replace(/<meta name="description"[^>]*>/g, '')
    .replace(/<link rel="canonical"[^>]*>/g, '')
    .replace(/<meta property="og:[^>]*>/g, '')
    .replace(/<meta name="twitter:[^>]*>/g, '')
    .replace('<head>', `<head>\n${tags}`);
}

for (const route of Object.keys(ROUTE_META)) {
  const html = injectMeta(baseHtml, route);
  const outDir = route === '/' ? distDir : path.join(distDir, ...route.slice(1).split('/'));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
  console.log(`✓ ${route}`);
}

console.log('Prerender meta done.');
