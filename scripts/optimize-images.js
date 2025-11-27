const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const imgDir = 'src/assets/img';
if(!fs.existsSync(imgDir)) {
  console.log('No images found at', imgDir);
  process.exit(0);
}

(async function(){
  const files = fs.readdirSync(imgDir).filter(f=>/\.(jpe?g|png)$/i.test(f));
  for(const f of files){
    const full = path.join(imgDir,f);
    const ext = path.extname(f).toLowerCase();
    try {
      // overwrite optimized jpg/png
      if(ext === '.jpg' || ext === '.jpeg'){
        await sharp(full).jpeg({quality:78}).toFile(full);
      } else {
        await sharp(full).png({compressionLevel:8}).toFile(full);
      }
      // write webp
      await sharp(full).webp({quality:80}).toFile(full.replace(ext,'.webp'));
      console.log('Optimized', f);
    } catch(e){ console.error('Error optimizing', f, e); }
  }
})();
