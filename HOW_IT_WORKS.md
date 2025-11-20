# How Automatic GitHub Pages Detection Works

## The Smart PDF URL System

Your portfolio now automatically detects where it's running and uses the correct PDF URL!

### Detection Logic (Desktop.tsx lines 26-52)

```typescript
const openResume = () => {
  const isProduction = import.meta.env.PROD;
  const hostname = window.location.hostname;

  if (isProduction && hostname.includes('github.io')) {
    // On GitHub Pages - detect if user or project page
    const currentPath = window.location.pathname;
    const isProjectPage = currentPath.includes('/iamdenton');

    if (isProjectPage) {
      pdfUrl = 'https://dentsun.github.io/iamdenton/Denton_Sun_Resume.pdf';
    } else {
      pdfUrl = 'https://dentsun.github.io/Denton_Sun_Resume.pdf';
    }
  } else {
    // Local development - use relative path
    pdfUrl = `${import.meta.env.BASE_URL}Denton_Sun_Resume.pdf`;
  }

  window.open(pdfUrl, '_blank');
};
```

### How It Works

1. **Check Environment**: Is this production? (`import.meta.env.PROD`)
2. **Check Hostname**: Are we on GitHub Pages? (`hostname.includes('github.io')`)
3. **Check Path**: Are we on a project page? (`pathname.includes('/iamdenton')`)
4. **Use Correct URL**:
   - Local dev → Relative path
   - User page (`dentsun.github.io`) → `https://dentsun.github.io/Denton_Sun_Resume.pdf`
   - Project page (`dentsun.github.io/iamdenton`) → `https://dentsun.github.io/iamdenton/Denton_Sun_Resume.pdf`

### Build Commands

- **Local development**: `npm run build:bundle`
  - Sets `PROD=false`
  - Uses relative paths
  - Perfect for testing with `npm run dev`

- **Production deployment**: `npm run build:prod`
  - Sets `PROD=true`
  - Enables automatic detection
  - Used by both `deploy:user` and `deploy:project` commands

### Deployment Commands

- **User page**: `npm run deploy:user`
  - Builds with production settings
  - Pushes to `dentsun.github.io` repository
  - PDF will be at: `https://dentsun.github.io/Denton_Sun_Resume.pdf`

- **Project page**: `npm run deploy:project`
  - Builds with production settings
  - Pushes to `iamdenton` repository's gh-pages branch
  - PDF will be at: `https://dentsun.github.io/iamdenton/Denton_Sun_Resume.pdf`

## Testing

### Local Testing
1. Run `npm run dev`
2. Open http://localhost:5173/
3. Click "Resume.pdf" icon
4. Should open `/Denton_Sun_Resume.pdf` (relative path)

### Production Testing (User Page)
1. Deploy to `dentsun.github.io`
2. Visit `https://dentsun.github.io/`
3. Click "Resume.pdf" icon
4. Should open `https://dentsun.github.io/Denton_Sun_Resume.pdf`

### Production Testing (Project Page)
1. Deploy to `iamdenton` repo
2. Visit `https://dentsun.github.io/iamdenton/`
3. Click "Resume.pdf" icon
4. Should open `https://dentsun.github.io/iamdenton/Denton_Sun_Resume.pdf`

## Benefits

✅ **No manual configuration needed**
✅ **Works in all environments automatically**
✅ **Same codebase for both deployment types**
✅ **PDF always works, no matter where you deploy**
✅ **Easy to test locally and in production**

## All Other Features Also Working

- ✅ Desktop icons are draggable
- ✅ Minimized windows restore from taskbar
- ✅ Live weather data updates hourly
- ✅ Live market data updates hourly
- ✅ Resume PDF works everywhere
