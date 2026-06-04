# Dilber Özer — Portfolio

Next.js portföy sitesi: projeler, stajlar, AI çalışmaları, about ve contact.

Bu README, projeyi **GitHub’a push** edip başka bir makinede **kaldığın yerden devam** etmen için ana rehberdir.

---

## Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **CSS Modules** + Framer Motion
- **Contact:** Formspree (`/api/contact`)

---

## Sayfalar

| Route | Açıklama |
|-------|----------|
| `/` | Proje galerisi |
| `/internships` | Staj & iş deneyimi |
| `/artificial-intelligence` | AI odaklı içerik + proje galerisi |
| `/about` | Profil, eğitim, referanslar, CV indirme |
| `/contact` | İletişim formu |
| `/projects/[slug]` | Case study detay |

---

## Klasör yapısı

```text
new_portfolio/
├── src/
│   ├── app/              # Sayfalar, API (contact)
│   ├── components/
│   └── data/             # site, projects, internships, about, artificial-intelligence
├── public/
│   ├── projects/         # Proje görselleri
│   ├── internships/
│   └── cv/dilber_ozer.pdf
├── scripts/              # PDF extract vb.
├── DEPLOY.md             # Vercel deploy rehberi
└── .env.example
```

---

## İçerik düzenleme

| Ne | Dosya |
|----|--------|
| İsim, sosyal linkler | `src/data/site.ts` |
| Projeler | `src/data/projects.ts` |
| Stajlar | `src/data/internships.ts` |
| About | `src/data/about.ts` |
| AI sayfası metinleri | `src/data/artificial-intelligence.ts` |
| Menü | `src/data/site.ts` → `navItems` |
| CV | `public/cv/dilber_ozer.pdf` |

---

## Yerel geliştirme

```bash
npm install
cp .env.example .env.local
npm run dev
```

→ http://localhost:3000

Production build:

```bash
npm run build
npm start
```

---

## Ortam değişkenleri

| Değişken | Açıklama |
|----------|----------|
| `NEXT_PUBLIC_SITE_URL` | Canlı site URL (SEO; sonda `/` yok) |
| `FORMSPREE_FORM_ID` | Contact form → Formspree form ID |
| `SITE_PRIVATE` | `true` → arama motorları indexlemez |

---

## GitHub’a push

```bash
git add .
git commit -m "Portfolio update"
git remote add origin https://github.com/Androidmedaa/new_portfolio.git   # ilk sefer
git push -u origin main
```

`.env.local` commit etme.

---

## Canlıya alma (Vercel)

Detaylı adımlar: **[DEPLOY.md](./DEPLOY.md)**

1. GitHub’a push  
2. [vercel.com](https://vercel.com) → Import repo  
3. Env: `NEXT_PUBLIC_SITE_URL`, `FORMSPREE_FORM_ID`, isteğe `SITE_PRIVATE`  
4. Deploy  

**Private paylaşım:** `SITE_PRIVATE=true` + linki sadece seçtiğin kişilere gönder (şifre yok; linki bilen açar).

---

## Özellikler (mevcut)

- Proje kartları + case study (9 bölüm veya mini projects)
- Görsel lightbox (linkli olmayan görseller; ok, Esc, dış tıklama)
- Internships: role overview, highlights, fotoğraflar
- LinkedIn banner, sosyal linkler (GitHub / LinkedIn / Medium)
- Medium OCR feature (ana sayfa)

---

## Yeni makinede kurulum özeti

```bash
git clone https://github.com/Androidmedaa/new_portfolio.git
cd new_portfolio
npm install
cp .env.example .env.local
# .env.local düzenle
npm run dev
```

---

## Linkler

- GitHub: https://github.com/Androidmedaa  
- LinkedIn: https://www.linkedin.com/in/dilber-ozer  
- Medium: https://medium.com/@dilberozer  

---

*AI Digital Twin / Ollama / Whisper backend bu repodan kaldırıldı — sadece statik portföy + Formspree contact.*
