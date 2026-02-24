const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, 'dist', 'assets', 'backy.svg');
const outputPath = path.join(__dirname, 'public', 'backy-blue.svg');

// The brand dark blue color
const brandColor = '#111638';

try {
    let svgContent = fs.readFileSync(inputPath, 'utf8');

    // The SVG uses hex colors in an internal stylesheet
    // We need to parse all fill: #hex; declarations

    // Regular expression to find all classes and their fill colors in the <style> block
    const styleRegex = /\.cls-\d+\s*{\s*fill:\s*([^;]+);\s*}/g;

    let match;
    const colorMap = {};

    while ((match = styleRegex.exec(svgContent)) !== null) {
        const fullMatch = match[0];
        let colorValue = match[1].trim();

        let hex = colorValue;

        // Handle color names used in the SVG (like 'silver')
        if (colorValue === 'silver') hex = '#c0c0c0';
        if (colorValue === '#fff') hex = '#ffffff';
        if (colorValue === '#eee') hex = '#eeeeee';
        if (colorValue.length === 4) { // handle 3-char hex like #eee -> #eeeeee
            hex = '#' + colorValue[1] + colorValue[1] + colorValue[2] + colorValue[2] + colorValue[3] + colorValue[3];
        }

        // Convert hex to perceived lightness (0-1)
        // Assuming grayscale where R=G=B, so we just take one channel
        let r, g, b;
        if (hex.startsWith('#')) {
            r = parseInt(hex.slice(1, 3), 16);
            g = parseInt(hex.slice(3, 5), 16);
            b = parseInt(hex.slice(5, 7), 16);
        } else {
            console.warn("Unknown color format skipping: ", hex);
            continue;
        }

        // Grayscale value 0-255
        const lightness = r;

        // We want darker original greys to result in higher opacity of our dark blue
        // and lighter original greys to result in lower opacity.
        // E.g., #262626 (dark) -> high opacity
        // E.g., #ffffff (white) -> 0 opacity

        // Calculate opacity: 1 - (lightness / 255)
        // We'll cap the max opacity so it doesn't get too overwhelmingly dark
        const maxOpacity = 0.5; // Maximum opacity for the blackest lines
        const opacity = ((255 - lightness) / 255) * maxOpacity;

        // Replace the fill rule with our new brand color and opacity
        const newRule = fullMatch.replace(/fill:\s*[^;]+;/, `fill: ${brandColor}; opacity: ${opacity.toFixed(3)};`);

        svgContent = svgContent.replace(fullMatch, newRule);
    }

    // Ensure public directory exists
    if (!fs.existsSync(path.join(__dirname, 'public'))) {
        fs.mkdirSync(path.join(__dirname, 'public'));
    }

    fs.writeFileSync(outputPath, svgContent);
    console.log(`Successfully converted ${inputPath} and saved to ${outputPath}`);

} catch (error) {
    console.error('Error processing SVG:', error);
}
