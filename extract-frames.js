import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
ffmpeg.setFfmpegPath(ffmpegStatic);
import fs from 'fs';
import path from 'path';

const inputFile = path.join(process.cwd(), 'public', 'VideoBack.mp4');
const outputDir = path.join(process.cwd(), 'public', 'hero-frames');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Starting frame extraction...');
console.log(`Input: ${inputFile}`);
console.log(`Output: ${outputDir}`);

// We'll extract raw high-quality images. You can adjust the FPS and Scale as needed.
// 30 FPS ensures buttery smooth motion on scroll. 
// A scale of ~1280 or 1920 ensures it stays crisp depending on size requirements.
const renderFps = 30; 

ffmpeg(inputFile)
    .outputOptions([
        `-vf fps=${renderFps},scale=1920:-1`, // Maintain aspect ratio to 1080p width
        `-q:v 2` // High quality jpeg output
    ])
    .output(path.join(outputDir, 'frame-%04d.jpg'))
    .on('start', (commandLine) => {
        console.log('Spawned FFmpeg with command: ' + commandLine);
    })
    .on('progress', (progress) => {
        console.log(`Processing: ${Math.floor(progress.percent || 0)}% done`);
    })
    .on('end', () => {
        console.log('\nFrame extraction completed successfully!');
        
        // Let's count the extracted frames so we can log it for the frontend
        const files = fs.readdirSync(outputDir).filter(f => f.endsWith('.jpg'));
        console.log(`Total frames generated: ${files.length}`);
    })
    .on('error', (err) => {
        console.error('An error occurred: ' + err.message);
    })
    .run();
