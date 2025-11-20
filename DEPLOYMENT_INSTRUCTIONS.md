# GitHub Pages Deployment Instructions

## ✅ AUTOMATIC DETECTION - PDF Will Work Either Way!

**Good news!** The code now automatically detects where it's deployed and uses the correct PDF URL:

- Deploy to `dentsun.github.io` (user page) → PDF at `https://dentsun.github.io/Denton_Sun_Resume.pdf`
- Deploy to `iamdenton` (project page) → PDF at `https://dentsun.github.io/iamdenton/Denton_Sun_Resume.pdf`
- Local development → Uses relative path

**No code changes needed regardless of which option you choose!**

You have two deployment options:

---

## ✅ Option 1: User Page (RECOMMENDED)

**Result**: Clean URL at `https://dentsun.github.io/` with PDF at `https://dentsun.github.io/Denton_Sun_Resume.pdf`

### Steps:
1. **Create a new repository** on GitHub named **exactly** `dentsun.github.io`
   - Go to https://github.com/new
   - Name: `dentsun.github.io` (must match your username)
   - Don't initialize with README

2. **Push your code** to the new repository:
   ```bash
   cd /c/Users/Dento/Desktop/Projects/iamdenton
   git remote add userpage https://github.com/Dentsun/dentsun.github.io.git
   git push userpage main
   ```

3. **Enable GitHub Pages**:
   - Go to the new repo's Settings → Pages
   - Source: Deploy from branch `main`
   - Folder: `/ (root)`
   - Save

4. **Wait 1-2 minutes**, then visit:
   - Site: `https://dentsun.github.io/`
   - PDF: `https://dentsun.github.io/Denton_Sun_Resume.pdf` ✅

### Why this is better:
- ✅ Clean, professional URL without repo name
- ✅ PDF at root: `https://dentsun.github.io/Denton_Sun_Resume.pdf`
- ✅ More memorable and professional
- ✅ Automatically detected by the code

---

## Option 2: Keep Project Page (iamdenton repo)

**Result**: URL at `https://dentsun.github.io/iamdenton/` with PDF at `https://dentsun.github.io/iamdenton/Denton_Sun_Resume.pdf`

### Steps:
1. **Deploy** (that's it!):
   ```bash
   npm run deploy:project
   ```

The code will automatically detect it's a project page and use the correct PDF URL!

### Considerations:
- ⚠️ URL includes repo name: `/iamdenton/` in the path
- ⚠️ Less memorable than user page
- ✅ But PDF will still work automatically!

---

## 🎯 My Recommendation

**Use Option 1 (User Page)** because:
1. Cleaner, more professional URL (no `/iamdenton/` in path)
2. Easier to share and remember
3. PDF at the root domain
4. Code automatically handles both options anyway!

## Quick Start (Option 1)
```bash
# 1. Create dentsun.github.io repo on GitHub first
# 2. Then run:
git remote add userpage https://github.com/Dentsun/dentsun.github.io.git
git push userpage main

# 3. Enable Pages in repo settings
# 4. Done! Visit https://dentsun.github.io/
```

## Testing After Deployment

After deploying, test these URLs:
- [ ] Main site loads: `https://dentsun.github.io/`
- [ ] PDF opens: `https://dentsun.github.io/Denton_Sun_Resume.pdf`
- [ ] Weather widget shows live data
- [ ] Market widget shows live data
- [ ] Desktop icons are draggable
- [ ] Minimized windows restore from taskbar
