const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const RAW_DIR = path.join(__dirname, '../client/public/assets/raw');
const IMG_DIR = path.join(__dirname, '../client/public/assets/img');
const PLACEHOLDER_DIR = path.join(IMG_DIR, 'placeholder');

if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });
if (!fs.existsSync(PLACEHOLDER_DIR)) fs.mkdirSync(PLACEHOLDER_DIR, { recursive: true });

const WIDTHS = [400, 800, 1200, 1920];

async function optimize() {
  const files = fs.readdirSync(RAW_DIR).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  
  for (const file of files) {
    const ext = path.extname(file);
    const name = path.basename(file, ext);
    const inputPath = path.join(RAW_DIR, file);

    console.log(`Optimizing ${file}...`);

    // Tiny placeholder
    const placeholder = await sharp(inputPath)
      .resize(20)
      .blur()
      .toBuffer();
    const base64 = `data:image/jpeg;base64,${placeholder.toString('base64')}`;
    fs.writeFileSync(path.join(PLACEHOLDER_DIR, `placeholder-${name}.txt`), base64);

    for (const w of WIDTHS) {
      // WebP
      await sharp(inputPath)
        .resize(w)
        .webp({ quality: 80 })
        .toFile(path.join(IMG_DIR, `${name}-${w}.webp`));
      
      // JPEG Fallback
      await sharp(inputPath)
        .resize(w)
        .jpeg({ quality: 80 })
        .toFile(path.join(IMG_DIR, `${name}-${w}.jpg`));
    }
  }
}

optimize().catch(console.error);
