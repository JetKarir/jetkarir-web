# SEO Optimization Design — JetKarir

**Date:** 2026-08-01
**Domain:** jetkarir.com
**Scope:** Landing pages + global SEO infrastructure

---

## Goal

Make all landing pages fully discoverable by Google. Zero SEO infrastructure currently exists — no meta tags, no sitemap, no robots.txt. SSR is already wired and ready.

---

## Architecture

### 1. SeoService

**File:** `src/app/core/services/seo/seo.service.ts`

**Interface:**
```ts
interface SeoConfig {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogImage?: string;   // default: /images/foto_landing_hero.jpg
  ogType?: string;    // default: website
}
```

**Behavior:**
- `setPage(config: SeoConfig)` — sets all meta tags for a route
- `setJsonLd(data: object, id: string)` — injects/replaces a named `<script type="application/ld+json">` by `id` attribute to avoid duplicates

**Tags set by `setPage()`:**
- `<title>` via Angular `Title` service
- `<meta name="description">`
- `<meta name="keywords">`
- `<link rel="canonical">`
- `<meta property="og:title">`
- `<meta property="og:description">`
- `<meta property="og:url">`
- `<meta property="og:image">`
- `<meta property="og:type">`
- `<meta property="og:site_name">` (always "JetKarir")
- `<meta name="twitter:card">` (always "summary_large_image")
- `<meta name="twitter:title">`
- `<meta name="twitter:description">`
- `<meta name="twitter:image">`

---

### 2. Per-Page SEO Configuration

#### Home (`/`) — `src/app/pages/landing/home/landing.ts`

```
title:       "JetKarir — AI-Powered Global Recruitment Platform"
description: "Find your dream job with JetKarir's AI platform. AI Resume Builder, Auto Apply, and personalized feedback. 50K+ jobs, 200K+ users worldwide."
keywords:    "AI recruitment, job platform, AI resume builder, auto apply, global hiring, career platform, lowongan kerja AI, platform rekrutmen"
canonical:   "https://jetkarir.com/"
ogImage:     "/images/foto_landing_hero.jpg"
```

JSON-LD (WebPage):
```json
{
  "@type": "WebPage",
  "name": "JetKarir — AI-Powered Global Recruitment Platform",
  "url": "https://jetkarir.com/",
  "description": "AI-powered global recruitment platform..."
}
```

#### About (`/about`) — `src/app/pages/landing/about/about.ts`

```
title:       "About JetKarir — Our Mission, Vision & Values"
description: "Founded 2021. JetKarir is an AI-powered recruitment platform connecting 200K+ talents with 8K+ companies globally."
keywords:    "about JetKarir, AI recruitment company, global hiring platform, JetKarir vision, JetKarir story"
canonical:   "https://jetkarir.com/about"
ogImage:     "/images/logo_text_jetkarir.png"
```

JSON-LD (AboutPage):
```json
{
  "@type": "AboutPage",
  "name": "About JetKarir",
  "url": "https://jetkarir.com/about"
}
```

---

### 3. `index.html` Updates

Add default fallback meta tags (overridden per-route by SeoService at runtime):

```html
<meta name="description" content="AI-powered global recruitment platform connecting talent with opportunity worldwide.">
<meta property="og:site_name" content="JetKarir">
<meta property="og:type" content="website">
<meta property="og:image" content="https://jetkarir.com/images/foto_landing_hero.jpg">
<meta name="twitter:card" content="summary_large_image">
```

Add two static JSON-LD scripts:

**Organization:**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "JetKarir",
  "url": "https://jetkarir.com",
  "logo": "https://jetkarir.com/images/logo_text_jetkarir.png",
  "description": "AI-powered global recruitment platform"
}
```

**WebSite** (enables Google Sitelinks Search Box):
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "JetKarir",
  "url": "https://jetkarir.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://jetkarir.com/jobs?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

---

### 4. `public/robots.txt`

```
User-agent: *
Allow: /
Allow: /about
Allow: /auth/help
Disallow: /login
Disallow: /register
Disallow: /admin
Disallow: /auth/forgot-password
Disallow: /auth/verify-email
Disallow: /auth/reset-password
Disallow: /home
Disallow: /jobs
Disallow: /applications
Disallow: /profile
Disallow: /notifications

Sitemap: https://jetkarir.com/sitemap.xml
```

---

### 5. `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://jetkarir.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://jetkarir.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://jetkarir.com/auth/help</loc>
    <changefreq>monthly</changefreq>
    <priority>0.4</priority>
  </url>
</urlset>
```

---

## File Changelist

| File | Action |
|------|--------|
| `src/app/core/services/seo/seo.service.ts` | Create |
| `src/app/pages/landing/home/landing.ts` | Update — inject SeoService, call setPage + setJsonLd |
| `src/app/pages/landing/about/about.ts` | Update — inject SeoService, call setPage + setJsonLd |
| `src/index.html` | Update — add default meta tags + static JSON-LD |
| `public/robots.txt` | Create |
| `public/sitemap.xml` | Create |

---

## Out of Scope

- Auth flow pages (login, register, forgot-password) — intentionally blocked
- App pages (jobs, applications, profile, notifications) — require auth, private data
- Terms / privacy — not in sitemap per user decision
- i18n / hreflang — not needed now
- Dynamic sitemap generation — static file sufficient for current page count
