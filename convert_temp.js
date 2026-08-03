const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');

const tempDir = path.join(__dirname, 'public', 'Temp');
const files = fs.readdirSync(tempDir).filter(f => f.toLowerCase().endsWith('.mp4'));

console.log(`Found ${files.length} MP4 files to convert in ${tempDir}`);

files.forEach((file, index) => {
  const inputPath = path.join(tempDir, file);
  const outputName = file.substring(0, file.lastIndexOf('.')) + '.webm';
  const outputPath = path.join(tempDir, outputName);

  console.log(`[${index + 1}/${files.length}] Converting "${file}" -> "${outputName}"...`);
  const cmd = `"${ffmpegPath}" -y -i "${inputPath}" -c:v libvpx-vp9 -b:v 2M -c:a libvorbis "${outputPath}"`;
  
  try {
    execSync(cmd, { stdio: 'inherit' });
    console.log(`Converted successfully: ${outputName}`);
    console.log(`Deleting original MP4: ${file}`);
    fs.unlinkSync(inputPath);
  } catch (err) {
    console.error(`Failed to convert ${file}:`, err.message);
  }
});

console.log('All conversions and cleanup completed!');
