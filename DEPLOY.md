# Deploying your portfolio (live + private options)

## Recommended: Vercel (free, works with Next.js)

### 1. Push code to GitHub

```bash
git init
git add .
git commit -m "Prepare portfolio for deployment"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/new_portfolio.git
git push -u origin main
```

### 2. Import on Vercel

1. Go to [https://vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New → Project** → select your repository.
3. Framework preset: **Next.js** (auto-detected).
4. Add **Environment Variables** (see below).
5. Click **Deploy**.

Your site will be live at something like:

`https://new-portfolio-xyz.vercel.app`

You can add a custom domain later in Vercel → Project → Settings → Domains.

### 3. Required environment variables (Vercel → Settings → Environment Variables)

| Variable | Example | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-site.vercel.app` | SEO / Open Graph URLs |
| `FORMSPREE_FORM_ID` | `abcdwxyz` | Contact form → your email |
| `SITE_PRIVATE` | `false` or `true` | Hide from Google when `true` |

Apply to **Production** (and Preview if you want).

### 4. Set up contact form (Formspree — free tier)

1. Create an account at [https://formspree.io](https://formspree.io).
2. **New Form** → set notification email to `dilberozer.ceng@gmail.com`.
3. Copy the form ID from `https://formspree.io/f/THIS_PART`.
4. Paste into Vercel as `FORMSPREE_FORM_ID`.
5. Redeploy (or wait for next deploy).

Test: open `/contact`, send a message, check your inbox.

---

## Can you share it privately?

**Yes — several levels:**

### A) Unlisted link (free, easiest)

- Deploy on Vercel as above.
- Set `SITE_PRIVATE=true` → search engines won’t index (`robots.txt` blocks crawling).
- **Do not** post the URL publicly; only send the link to recruiters or friends.
- Anyone with the link can still open the site (not password-protected).

### B) Vercel Password Protection (paid)

- Vercel **Pro** plan: **Settings → Deployment Protection → Password**.
- Visitors must enter a password — good for “private preview” before public launch.

### C) Preview deployments (free)

- Every push to a branch gets a unique preview URL, e.g.  
  `https://new-portfolio-git-feature-username.vercel.app`
- Share only that URL; production URL can stay unchanged.

### D) Private GitHub repo

- Keep the repo **private** on GitHub.
- Vercel can still deploy from a private repo (only you see the code).
- The **website URL itself is still public** unless you use password protection or unlisted + no sharing.

---

## After deploy checklist

- [ ] `NEXT_PUBLIC_SITE_URL` matches your live URL
- [ ] Contact form sends email (test once)
- [ ] GitHub / LinkedIn / Medium links work
- [ ] CV download works (`/cv/dilber_ozer.pdf` in `public/cv/`)
- [ ] Decide: `SITE_PRIVATE=true` or public launch

---

## Local production test

```bash
cp .env.example .env.local
# Edit .env.local with your Formspree ID and URL

npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000).
