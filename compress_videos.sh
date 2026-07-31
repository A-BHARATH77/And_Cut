#!/bin/bash
cd /Users/apple/Desktop/and_cut_deployment/public/ANDCUT_GIFs
mkdir -p compressed
for file in *.mp4; do
  echo "Compressing $file..."
  ffmpeg -y -i "$file" -vcodec libx264 -crf 32 -preset fast -vf "scale='min(480,iw)':-2" -an -loglevel warning "compressed/$file"
done
mv compressed/*.mp4 .
rmdir compressed

cd ../ANDCUT_VDS
ffmpeg -y -i "1.mp4" -vcodec libx264 -crf 32 -preset fast -vf "scale='min(720,iw)':-2" -an -loglevel warning "1_comp.mp4"
ffmpeg -y -i "4.mp4" -vcodec libx264 -crf 32 -preset fast -vf "scale='min(720,iw)':-2" -an -loglevel warning "4_comp.mp4"

echo "Done"
