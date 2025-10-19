# PWA Quick Reference

## Testing Your PWA

### Development Mode
```bash
pnpm dev
```
⚠️ **Service worker is DISABLED in dev mode for easier debugging**

### Production Mode (with PWA)
```bash
pnpm build
pnpm start
```
✅ Service worker is ACTIVE - test PWA features here

## Install the App

### Desktop (Chrome/Edge)
1. Visit http://localhost:3000 (after `pnpm start`)
2. Look for install icon (⊕) in address bar
3. Click to install

### Mobile Chrome (Android)
1. Visit your deployed site
2. Menu → "Add to Home Screen"
3. Or wait for custom install prompt

### iOS Safari
1. Visit your site
2. Share button → "Add to Home Screen"

## Check PWA Status

### Chrome DevTools
1. Press F12
2. Application tab → Service Workers
3. See registration status

### Lighthouse
1. F12 → Lighthouse tab
2. Check "Progressive Web App"
3. Click "Generate report"
4. Aim for 100/100 score

## Files Generated

After `pnpm build`:
- ✅ `public/sw.js` - Service worker
- ✅ `public/workbox-*.js` - Workbox runtime
- ✅ These are auto-generated and git-ignored

## Useful Commands

```bash
# Generate placeholder icons
pnpm generate-icons

# Build for production
pnpm build

# Start production server
pnpm start

# Dev mode (PWA disabled)
pnpm dev
```

## Common Issues

### Install prompt doesn't appear?
- Use production build (`pnpm build && pnpm start`)
- Visit site twice (5 min apart)
- Check HTTPS is enabled (or use localhost)
- Clear cache and try again

### Service worker not working?
- Make sure you ran `pnpm build`
- Check you're not in dev mode
- Verify no console errors
- HTTPS required (except localhost)

### Icons not showing?
- Verify files exist in `public/icons/`
- Check manifest.json paths
- Clear browser cache

## Quick Test

```bash
# 1. Build
pnpm build

# 2. Start
pnpm start

# 3. Visit
# Open http://localhost:3000

# 4. Install
# Click install icon in address bar

# 5. Verify
# Check if app opens in standalone mode
```

## Next Steps

1. Replace placeholder icons (see `public/icons/README.md`)
2. Customize colors in manifest.json
3. Test on real devices
4. Run Lighthouse audit
5. Deploy to production

## Documentation

- 📖 Full Guide: `PWA_SETUP.md`
- 📖 Complete: `PWA_COMPLETE.md`
- 📖 Icons: `public/icons/README.md`

---
Need help? Check the full documentation files above!
