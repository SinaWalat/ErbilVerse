const ffmpeg = require('fluent-ffmpeg');
const ffmpegInstaller = require('@ffmpeg-installer/ffmpeg');

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

console.log('Starting frame extraction...');

ffmpeg('public/VideoBack.mp4')
  .outputOptions([
    '-vf fps=30', // Extract at 30 fps
    '-qscale:v 2' // High quality JPG
  ])
  .on('end', () => {
    console.log('Extraction finished successfully!');
  })
  .on('error', (err) => {
    console.error('An error occurred:', err.message);
  })
  .save('public/hero-frames/frame-%04d.jpg');
