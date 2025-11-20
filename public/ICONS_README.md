# PWA Icons Setup

## Required Icons

The PWA manifest requires the following icon files:

- `icon-192.png` - 192x192 pixels
- `icon-512.png` - 512x512 pixels

## How to Create Icons

### Option 1: Use Online Tools

1. Visit [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload your source image (logo or icon)
3. Generate and download all icon sizes
4. Place the files in the `/public` directory

### Option 2: Use Design Tools

1. Create icons in Figma, Adobe Illustrator, or similar
2. Export as PNG with the required sizes
3. Place in `/public` directory

### Option 3: Use Command Line (ImageMagick)

```bash
# If you have a source SVG or large PNG:
convert icon.svg -resize 192x192 icon-192.png
convert icon.svg -resize 512x512 icon-512.png
```

## Icon Design Guidelines

- Use a simple, recognizable design
- Ensure it works well at small sizes
- Use the brand color (#0ea5e9 - primary blue)
- Include transparency or rounded corners
- Test on both light and dark backgrounds

## Temporary Solution

For development, you can use placeholder icons from:
```
https://placehold.co/192x192/0ea5e9/white/png?text=시민력
https://placehold.co/512x512/0ea5e9/white/png?text=시민력
```

Download these and save as `icon-192.png` and `icon-512.png` in the `/public` directory.
