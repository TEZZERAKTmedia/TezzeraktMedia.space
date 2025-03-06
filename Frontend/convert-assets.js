import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';

// Define asset directories
const assetsDir = path.resolve('src/assets');
const supportedImageFormats = ['.jpg', '.jpeg', '.png'];
const supportedVideoFormats = ['.mp4', '.mov', '.avi', '.mkv'];

async function convertImagesToWebP() {
  const files = await fs.readdir(assetsDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const inputPath = path.join(assetsDir, file);
    const outputPath = path.join(assetsDir, `${path.basename(file, ext)}.webp`);

    if (supportedImageFormats.includes(ext)) {
      console.log(`🖼️ Converting ${file} → ${path.basename(outputPath)}`);

      try {
        await sharp(inputPath)
          .webp({ quality: 80 }) // Adjust quality as needed
          .toFile(outputPath);
        
        await fs.remove(inputPath); // Remove original
      } catch (err) {
        console.error(`❌ Error converting ${file} to WebP:`, err.message);
      }
    }
  }
}

async function convertVideosToWebM() {
  const files = await fs.readdir(assetsDir);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const inputPath = path.join(assetsDir, file);
    const outputPath = path.join(assetsDir, `${path.basename(file, ext)}.webm`);

    if (supportedVideoFormats.includes(ext)) {
      console.log(`🎥 Converting ${file} → ${path.basename(outputPath)}`);

      await new Promise((resolve, reject) => {
        ffmpeg(inputPath)
          .output(outputPath)
          .videoCodec('libvpx-vp9') // Use VP9 for best compression
          .audioCodec('libopus') // Opus codec for better compression
          .outputOptions('-b:v 1M') // Adjust bitrate as needed
          .on('end', async () => {
            console.log(`✅ ${file} converted successfully!`);
            await fs.remove(inputPath); // Remove original file
            resolve();
          })
          .on('error', (err) => {
            console.error(`❌ Error converting ${file} to WebM:`, err.message);
            reject(err);
          })
          .run();
      });
    }
  }
}

async function runConversion() {
  console.log('🔄 Starting asset conversion...');
  await convertImagesToWebP();
  await convertVideosToWebM();
  console.log('✅ All assets converted successfully!');
}

runConversion().catch((err) => console.error('❌ Conversion failed:', err));
