# Public Assets Folder

This folder contains static assets that are served directly by Next.js.

## Directory Structure

```
public/
├── favicon.ico           # Browser tab icon
├── logo.svg             # SolPay Express logo
├── solana-logo.svg      # Solana logo
├── images/              # Image assets
│   ├── hero-bg.png      # Hero background
│   └── features/        # Feature images
├── icons/               # Icon assets
│   ├── wallet.svg       # Wallet icon
│   ├── send.svg         # Send icon
│   └── receive.svg      # Receive icon
└── fonts/               # Custom fonts (if needed)
```

## Usage

Files in this folder are served from the root URL:

```typescript
// In your components:
<Image src="/logo.svg" alt="Logo" />
<link rel="icon" href="/favicon.ico" />
```

## Adding Assets

1. **Images**: Add to `/public/images/`
2. **Icons**: Add to `/public/icons/`
3. **Fonts**: Add to `/public/fonts/`
4. **Other**: Add to root `/public/`

## Best Practices

- Use SVG for logos and icons (scalable)
- Optimize images before adding (use tools like TinyPNG)
- Use descriptive filenames
- Keep file sizes small for performance
- Use WebP format for photos when possible

## Next.js Image Optimization

Next.js automatically optimizes images in the public folder when using the `<Image>` component:

```typescript
import Image from 'next/image'

<Image 
  src="/logo.svg" 
  alt="SolPay Express" 
  width={200} 
  height={50}
/>
```
