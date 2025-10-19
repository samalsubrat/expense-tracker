# PWA Setup Guide for Expense Tracker

Your Expense Tracker app is now configured as a Progressive Web App (PWA)! 🎉

## What's Been Configured

### 1. **PWA Plugin** (`next-pwa`)
- Installed and configured in `next.config.ts`
- Service worker will be automatically generated
- Caching strategies configured for optimal performance

### 2. **Web App Manifest** (`public/manifest.json`)
- Defines your app's name, icons, colors, and display mode
- Enables "Add to Home Screen" functionality
- Configured for standalone app experience

### 3. **PWA Metadata** (in `src/app/layout.tsx`)
- Apple-specific meta tags for iOS devices
- Theme color for Android devices
- Open Graph and Twitter cards for better sharing

### 4. **Install Prompt Component**
- Custom install prompt in `src/app/components/pwa-install-prompt.tsx`
- Shows when the app can be installed
- User-friendly install/dismiss options

### 5. **Caching Strategies**
- **Fonts**: Cached for 1 year
- **Images**: Cached for 24 hours with stale-while-revalidate
- **Static assets**: Optimized caching for JS, CSS
- **API routes**: Network-first strategy
- **Next.js data**: Cached with revalidation

## Next Steps

### 1. Create PWA Icons

You need to create icons for your PWA. Here are your options:

#### Option A: Use an online generator (Easiest)
1. Visit https://www.pwabuilder.com/imageGenerator
2. Upload a 512x512 base image of your app logo
3. Download the icon pack
4. Extract and copy all icons to `public/icons/`

#### Option B: Use the included script
1. Install sharp: `pnpm add -D sharp`
2. Create/place your base icon at `public/icons/icon-512x512.png`
3. Run: `node scripts/generate-icons.js`

#### Option C: Create manually
Create these icon sizes in `public/icons/`:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

See `public/icons/README.md` for detailed instructions.

### 2. Customize Colors

Update theme colors in:
- `public/manifest.json` - `theme_color` and `background_color`
- `src/app/layout.tsx` - `<meta name="theme-color">`

### 3. Test Your PWA

#### Local Testing:
```bash
pnpm build
pnpm start
```
Then visit http://localhost:3000

#### Test PWA Features:
1. **Desktop (Chrome/Edge)**:
   - Look for install icon in address bar
   - Click to install

2. **Mobile (Chrome Android)**:
   - Visit the site
   - Tap menu → "Add to Home Screen"
   - Or use the install prompt

3. **iOS Safari**:
   - Tap Share button
   - Tap "Add to Home Screen"

#### Use Lighthouse:
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Progressive Web App"
4. Click "Generate report"

### 4. PWA Checklist

- [ ] Create all required icon sizes
- [ ] Test offline functionality
- [ ] Verify install prompt appears
- [ ] Test on mobile devices
- [ ] Check Lighthouse PWA score (aim for 100)
- [ ] Verify service worker registration
- [ ] Test "Add to Home Screen" on iOS
- [ ] Test "Install App" on Android
- [ ] Verify app works in standalone mode

## Testing Offline Mode

1. Build and start the production app:
   ```bash
   pnpm build && pnpm start
   ```

2. Open DevTools → Network tab
3. Select "Offline" from throttling dropdown
4. Reload the page
5. The app should still load from cache

## Service Worker Files

After building, these files will be generated in `public/`:
- `sw.js` - Service worker
- `workbox-*.js` - Workbox runtime
- `worker-*.js` - Additional workers

These files are automatically ignored in `.gitignore`.

## Deployment

### On Vercel:
PWA will work automatically. Just deploy as usual:
```bash
git push
```

### On Other Platforms:
Ensure your hosting serves the service worker with proper headers:
- `Service-Worker-Allowed: /`
- HTTPS is required for PWA features

## Troubleshooting

### Install prompt doesn't appear?
- Must be served over HTTPS (or localhost)
- User must visit site at least twice (with 5 min gap)
- User hasn't already installed the app
- Check browser console for errors

### Service worker not registering?
- Run `pnpm build` first (disabled in development)
- Check browser console for errors
- Verify HTTPS is enabled (required for SW)

### Icons not showing?
- Verify all icon files exist in `public/icons/`
- Check manifest.json paths are correct
- Clear cache and reload

## Resources

- [Next PWA Documentation](https://github.com/shadowwalker/next-pwa)
- [PWA Builder](https://www.pwabuilder.com/)
- [Web.dev PWA Guide](https://web.dev/progressive-web-apps/)
- [MDN: PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)

## Customization

### Disable PWA in development:
Already configured in `next.config.ts`:
```typescript
disable: process.env.NODE_ENV === "development"
```

### Update cache strategies:
Modify `runtimeCaching` array in `next.config.ts`

### Customize install prompt:
Edit `src/app/components/pwa-install-prompt.tsx`

---

**Congratulations!** Your Expense Tracker is now a PWA! 🚀
