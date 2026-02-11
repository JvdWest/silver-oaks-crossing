# Silver Oaks Crossing – Website

A modern, responsive website for Silver Oaks Crossing shopping centre in Pretoria East, South Africa.

Built with **React** + **Vite**, deployed to **GitHub Pages**.

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the site.

---

## Deploy to GitHub Pages

### First-time setup

1. **Create a GitHub repo** called `silver-oaks-crossing` (or whatever you prefer).

2. **Update two files** with your actual repo name:

   - `package.json` → change `homepage` to:
     ```
     https://YOUR_USERNAME.github.io/silver-oaks-crossing/
     ```

   - `vite.config.js` → change `base` to:
     ```js
     base: '/silver-oaks-crossing/',
     ```

3. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/silver-oaks-crossing.git
   git push -u origin main
   ```

### Deploy

```bash
npm run deploy
```

This builds the site and pushes the `dist` folder to the `gh-pages` branch automatically.

### Enable GitHub Pages

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose **gh-pages** branch, **/ (root)** folder
4. Save

Your site will be live at `https://YOUR_USERNAME.github.io/silver-oaks-crossing/` within a minute or two.

---

## Custom Domain (optional)

To use a domain like `silveroakscrossing.co.za`:

1. Create a file `public/CNAME` containing just:
   ```
   silveroakscrossing.co.za
   ```

2. Update `vite.config.js`:
   ```js
   base: '/',
   ```

3. Update your domain's DNS:
   - Add a **CNAME** record pointing to `YOUR_USERNAME.github.io`
   - Or add **A** records pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```

4. In GitHub repo → Settings → Pages → enter your custom domain and enable **Enforce HTTPS**.

5. Redeploy: `npm run deploy`

---

## Project Structure

```
silver-oaks-site/
├── index.html          # HTML entry point
├── package.json        # Dependencies & scripts
├── vite.config.js      # Vite config with base path
├── src/
│   ├── main.jsx        # React entry point
│   └── App.jsx         # Main website component
└── README.md
```

## Making Changes

Edit `src/App.jsx` to update content, stores, hours, etc. The store data is in the `STORES` and `CENTRE_HOURS` arrays at the top of the file. After changes:

```bash
npm run deploy
```
