# PWA Icons

This directory should contain the PWA icons for your Expense Tracker app.

## Required Icons

You need to create icons in the following sizes:
- 72x72 → icon-72x72.png
- 96x96 → icon-96x96.png
- 128x128 → icon-128x128.png
- 144x144 → icon-144x144.png
- 152x152 → icon-152x152.png
- 192x192 → icon-192x192.png
- 384x384 → icon-384x384.png
- 512x512 → icon-512x512.png

## How to Generate Icons

### Option 1: Using Online Tools
1. Visit https://www.pwabuilder.com/imageGenerator
2. Upload a 512x512 base image
3. Download the generated icon pack
4. Copy the icons to this directory

### Option 2: Using a Design Tool
1. Create a square design (512x512 recommended)
2. Export in multiple sizes as listed above
3. Use tools like:
   - Figma
   - Adobe Illustrator
   - Canva
   - GIMP

### Option 3: Using ImageMagick (command line)
```bash
# Install ImageMagick first
# Then run these commands from your base 512x512 icon:

convert icon-512x512.png -resize 72x72 icon-72x72.png
convert icon-512x512.png -resize 96x96 icon-96x96.png
convert icon-512x512.png -resize 128x128 icon-128x128.png
convert icon-512x512.png -resize 144x144 icon-144x144.png
convert icon-512x512.png -resize 152x152 icon-152x152.png
convert icon-512x512.png -resize 192x192 icon-192x192.png
convert icon-512x512.png -resize 384x384 icon-384x384.png
```

## Design Tips
- Use a simple, recognizable design
- Ensure good contrast
- Avoid fine details that won't be visible at smaller sizes
- Use your app's primary colors
- For "maskable" icons, keep important content in the safe zone (center 80% of the image)
