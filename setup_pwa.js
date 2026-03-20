const fs = require('fs');
const path = require('path');

const srcLogo = path.join(__dirname, 'src', 'assets', 'TexUs.png');
const dest1 = path.join(__dirname, 'public', 'pwa-192x192.png');
const dest2 = path.join(__dirname, 'public', 'pwa-512x512.png');

if (fs.existsSync(srcLogo)) {
  fs.copyFileSync(srcLogo, dest1);
  fs.copyFileSync(srcLogo, dest2);
  console.log('Successfully copied PWA icons.');
} else {
  console.log('Source logo not found.');
}
