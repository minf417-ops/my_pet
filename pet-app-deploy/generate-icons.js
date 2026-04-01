// Generate PWA icons as simple colored squares with emoji-style paw
const fs = require('fs');

// Minimal valid PNG generator for solid color icons
function createPNG(size) {
  // We'll create a simple SVG and save it, then reference it
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#FF9A76"/>
        <stop offset="100%" style="stop-color:#FF7B54"/>
      </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" rx="${size*0.2}" fill="url(#bg)"/>
    <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="${size*0.55}">🐾</text>
  </svg>`;
  return svg;
}

fs.writeFileSync('src/icon-192.svg', createPNG(192));
fs.writeFileSync('src/icon-512.svg', createPNG(512));

// Also create simple colored PNG placeholders using raw bytes
// For PWA we need actual PNG files, so let's create SVG-based icons
// and reference them in manifest as SVG
console.log('SVG icons created. Updating manifest to use SVG...');

// Update manifest to use SVG
const manifest = JSON.parse(fs.readFileSync('src/manifest.json','utf8'));
manifest.icons = [
  {"src": "/icon-192.svg", "sizes": "192x192", "type": "image/svg+xml"},
  {"src": "/icon-512.svg", "sizes": "512x512", "type": "image/svg+xml"}
];
fs.writeFileSync('src/manifest.json', JSON.stringify(manifest, null, 2));
console.log('Done!');
