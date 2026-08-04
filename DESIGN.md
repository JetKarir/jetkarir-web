# JetKarir Design Guide

Design reference derived for all UI work.

---

## 1. Brand & Tone

**Theme name:** Kinetic Professionalism  
**Aesthetic:** Corporate / Modern with Minimalist influences  
**Mood:** Velocity, trust, clarity — for high-growth professionals and recruiters

Key principles:

- Generous whitespace to reduce cognitive load
- High-contrast accents (navy + golden yellow) for urgency
- Data-dense layouts that still feel breathable
- "Kinetic" UI patterns suggesting forward motion and career progress

---

## 2. Color Tokens

### Core Semantic Palette

| Token                    | Hex       | Usage                                                  |
| ------------------------ | --------- | ------------------------------------------------------ |
| `primary`                | `#021541` | Headings, primary buttons, nav branding, active states |
| `on-primary`             | `#ffffff` | Text on primary                                        |
| `primary-container`      | `#1a2b56` | Button hover, elevated primary surface                 |
| `secondary`              | `#785900` | Golden text accent                                     |
| `secondary-container`    | `#fdc003` | "Recommended", "New" tag, CTA chip background          |
| `on-secondary-container` | `#6c5000` | Text on yellow chip                                    |

### Surfaces (Light Theme)

| Token                       | Hex       | Usage                           |
| --------------------------- | --------- | ------------------------------- |
| `background`                | `#f8f9ff` | Page background                 |
| `surface`                   | `#ffffff` | Default card/section background |
| `surface-container-lowest`  | `#ffffff` | Auth card, input background     |
| `surface-container-low`     | `#eff4ff` | Hover state on list items       |
| `surface-container`         | `#e5eeff` | Section background alternate    |
| `surface-container-high`    | `#dce9ff` | Sidebar hover, chip background  |
| `surface-container-highest` | `#d3e4fe` | Strongest tinted surface        |
| `surface-dim`               | `#cbdbf5` | Dimmed/inactive surface         |
| `surface-variant`           | `#d3e4fe` | Variant surface for contrast    |

### Text

| Token                          | Hex       | Usage                                     |
| ------------------------------ | --------- | ----------------------------------------- |
| `on-surface` / `on-background` | `#0b1c30` | Primary text                              |
| `on-surface-variant`           | `#45464f` | Secondary text, placeholders, meta        |
| `outline`                      | `#757680` | Border, divider                           |
| `outline-variant`              | `#c5c6d0` | Subtle border (default for cards, inputs) |

### Semantic

| Token                   | Hex       | Usage                   |
| ----------------------- | --------- | ----------------------- |
| `error`                 | `#ba1a1a` | Error states            |
| `error-container`       | `#ffdad6` | Error background        |
| `tertiary`              | `#000f51` | Alternate accent (rare) |
| `tertiary-container`    | `#001e84` | Blue accent chip        |
| `on-tertiary-container` | `#758cff` | Text on blue chip       |

### Inverse (Dark surfaces)

| Token                | Hex       | Usage                  |
| -------------------- | --------- | ---------------------- |
| `inverse-surface`    | `#213145` | Dark tooltip, snackbar |
| `inverse-on-surface` | `#eaf1ff` | Text on dark surface   |
| `primary-container`  | `#1a2b56` | Footer background      |

---

## 3. Typography

One-font system. Headlines and Body/UI → DM Sans.

```html
<!-- Google Fonts import -->
<link
  href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap"
  rel="stylesheet"
/>
```

### Type Scale

| Name                 | Font    | Size | Line Height | Weight | Tracking          |
| -------------------- | ------- | ---- | ----------- | ------ | ----------------- |
| `display-lg`         | DM Sans | 48px | 56px        | 700    | −0.03em           |
| `headline-lg`        | DM Sans | 32px | 40px        | 700    | −0.03em           |
| `headline-lg-mobile` | DM Sans | 28px | 36px        | 700    | −0.03em           |
| `headline-md`        | DM Sans | 24px | 32px        | 700    | −0.03em           |
| `headline-sm`        | DM Sans | 20px | 28px        | 700    | −0.03em           |
| `body-lg`            | DM Sans | 18px | 28px        | 400    | —                 |
| `body-md`            | DM Sans | 16px | 24px        | 400    | —                 |
| `body-sm`            | DM Sans | 14px | 20px        | 400    | —                 |
| `label-md`           | DM Sans | 12px | 16px        | 600    | 0.05em, UPPERCASE |

**Usage rules:**

- `display-lg` — hero H1 only
- `headline-lg/md` — section headings
- `headline-sm` — card titles, dialog headings
- `body-md` — default body text, form inputs
- `body-sm` — secondary info, meta text
- `label-md` — form labels (UPPERCASE), nav items, badges, timestamps

---

## 4. Spacing

Base unit: **4px**

| Token           | Value         | Common use                      |
| --------------- | ------------- | ------------------------------- |
| `xs`            | 8px (0.5rem)  | Icon gaps, tight paddings       |
| `sm`            | 16px (1rem)   | Button padding, card inner gap  |
| `md`            | 24px (1.5rem) | Card padding, section inner gap |
| `lg`            | 40px (2.5rem) | Section-to-section gap          |
| `xl`            | 64px (4rem)   | Major section vertical padding  |
| `gutter`        | 24px          | Horizontal page padding         |
| `margin-mobile` | 16px          | Mobile side margin              |
| `container-max` | 1280px        | Max page width                  |

---

## 5. Border Radius

| Token            | Value  | Usage                           |
| ---------------- | ------ | ------------------------------- |
| `DEFAULT`        | 4px    | Minimal rounding                |
| `lg`             | 8px    | Buttons, inputs, standard cards |
| `xl`             | 12px   | Buttons, inputs                 |
| `2xl`            | 20px   | Standard cards                  |
| `3xl` / `[2rem]` | 24px   | Larger panels, surface          |
| `full`           | 9999px | Pills, avatar, tags             |

---

## 6. Elevation & Shadows

Shadows use navy-tinted color at low opacity — never black.

| Level | CSS                                 | Usage           |
| ----- | ----------------------------------- | --------------- |
| 0     | none (border only)                  | Default card    |
| 1     | `0 4px 12px rgba(2, 21, 65, 0.08)`  | Card at rest    |
| 2     | `0 8px 24px rgba(2, 21, 65, 0.1)`   | Hover / active  |
| 3     | `0 16px 48px rgba(2, 21, 65, 0.12)` | Modal, dropdown |

**Card default:** `border border-outline-variant/30 shadow-level-1`  
**Card hover:** `shadow-level-2` + optionally `border-primary/20`

---

## 7. Layout

### App Shell — 3-Column (Desktop)

Main app pages (Home, Jobs, Applications, Profile, Notifications) use:

```
┌── Sidebar (w-80, sticky) ──┬── Content (flex-1, max-w-600px) ──┬── Right widgets ──┐
│  Logo                      │  Page content                      │  Optional          │
│  Nav items                 │  border-l + border-r               │  (e.g. profile     │
│  [Post a Job CTA]          │                                    │  completion card)  │
│  User chip                 │                                    │                    │
└────────────────────────────┴────────────────────────────────────┴────────────────────┘
```

On mobile: sidebar collapses, content goes full-width, bottom nav (optional).

```css
/* Container wrapper */
.max-w-container-max mx-auto flex min-h-screen px-lg justify-center

/* Sidebar */
.hidden lg:flex flex-col h-screen sticky top-0
.border-r border-outline-variant/30 px-4 py-8 shrink-0 w-80

/* Content column */
.flex-1 max-w-[600px] border-r border-outline-variant/30 min-h-screen border-l
```

### Auth Layout

Centered single-column card, no sidebar:

```
  Logo + brand

  ┌─ Card (max-w-[480px]) ───────────────────────────────┐
  │  ▬▬▬ [navy accent bar, 4px, full width, top]         │
  │  heading + subtext                                    │
  │  form                                                 │
  │  CTA button                                           │
  │  social login                                         │
  │  link to register / login                            │
  └──────────────────────────────────────────────────────┘

  back link + footer
```

Auth card spec:

```css
max-w-[480px]
bg-surface-container-lowest
rounded-xl
shadow-[0_4px_16px_rgba(2,21,65,0.06)]
border border-outline-variant/30
/* top accent bar */
h-2 w-full bg-primary absolute top-0 left-0
```

### Landing Layout

Full-width sections, alternating backgrounds:

- Hero: `bg-background`
- Stats: `bg-surface-container`
- Features (candidate): `bg-white`
- Enterprise features: `bg-surface-container`
- CTA: `bg-white` → inner card `bg-secondary-container rounded-[2rem]`
- Footer: `bg-primary`

---

## 8. Components

### 8.1 Navigation Sidebar

```html
<!-- Active item -->
<a
  class="rounded-xl font-bold flex items-center gap-3 px-4 py-3 
          font-label-md text-label-md bg-primary text-on-primary"
>
  <span class="material-symbols-outlined">home</span>
  Home
</a>

<!-- Default item -->
<a
  class="text-on-surface-variant flex items-center gap-3 px-4 py-3 
          hover:bg-surface-container-high transition-colors rounded-xl 
          font-label-md text-label-md hover:translate-x-1"
>
  <span class="material-symbols-outlined">work</span>
  Jobs
</a>
```

Nav rules:

- Active: `bg-primary text-on-primary rounded-xl font-bold`
- Hover: `bg-surface-container-high` + `translate-x-1` (subtle rightward motion)
- All items: `label-md` size, icon + label side by side

**"Post a Job" CTA** (bottom of sidebar):

```html
<button
  class="w-full bg-secondary-container text-on-secondary-container 
               py-3 rounded-xl font-bold flex items-center justify-center gap-2 
               shadow-sm hover:bg-secondary-container/90 active:scale-95"
>
  <span class="material-symbols-outlined">add_circle</span>
  Post a Job
</button>
```

**User chip** (bottom of sidebar):

```html
<div
  class="flex items-center justify-between p-2 rounded-xl 
            hover:bg-surface-container-high cursor-pointer"
>
  <img class="w-10 h-10 rounded-full border border-outline-variant" />
  <div>
    <p class="font-label-md text-on-surface">Name</p>
    <p class="text-[11px] text-on-surface-variant">@handle</p>
  </div>
  <span class="material-symbols-outlined">more_vert</span>
</div>
```

### 8.2 Primary Button

```html
<button
  class="px-lg py-sm bg-primary text-on-primary rounded-xl 
               font-headline-sm hover:bg-primary-container 
               hover:shadow-[0_8px_24px_rgba(2,21,65,0.12)] 
               hover:-translate-y-0.5 transition-all duration-200 
               font-label-md text-label-md uppercase tracking-wider"
>
  Get Started
</button>
```

Hover: `bg-primary-container` + shadow level 2 + `translateY(-2px)`.  
Active: `active:scale-[0.98]`.

### 8.3 Outline / Ghost Button

```html
<button
  class="px-md py-xs bg-white border border-outline-variant 
               text-on-surface font-label-md text-label-md rounded-lg 
               hover:bg-surface-container-low active:scale-[0.98]"
>
  Label
</button>
```

### 8.4 Yellow CTA Chip (Secondary)

```html
<button
  class="bg-secondary-container text-on-secondary-container 
               px-md py-xs rounded-xl font-bold"
>
  Label
</button>
```

### 8.5 Card

```html
<!-- Standard content card -->
<div
  class="bg-white rounded-2xl border border-outline-variant/30 
            shadow-[0_4px_6px_rgba(2,21,65,0.04)] p-md"
>
  ...
</div>

<!-- Surface-tinted card (on bg-surface-container backgrounds) -->
<div
  class="bg-surface rounded-2xl border border-outline-variant/30 
            hover:bg-white hover:shadow-md transition-all p-md"
>
  ...
</div>
```

Card hover: background lifts to white + shadow level 2 + scale icon inside (if any).

### 8.6 Input Field

```html
<div>
  <label class="block font-label-md text-label-md text-on-surface mb-1.5 uppercase">
    Email Address
  </label>
  <div
    class="relative rounded-md border border-outline-variant 
              bg-surface-container-lowest transition-all duration-200"
  >
    <!-- Icon prefix -->
    <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <span class="material-symbols-outlined text-on-surface-variant/70 text-[20px]">mail</span>
    </div>
    <input
      type="email"
      class="block w-full pl-10 pr-3 py-2.5 bg-transparent border-none 
                  text-on-surface font-body-md text-body-md focus:ring-0 
                  placeholder:text-outline-variant"
    />
  </div>
</div>
```

Focus state: `border-primary` + `ring-2 ring-primary/10` (2px halo).  
Labels: `label-md` (12px, UPPERCASE, DM Sans 600, 0.05em tracking).

### 8.7 Job Card

```html
<div
  class="bg-white rounded-xl border border-outline-variant/30 
            shadow-level-1 p-md hover:shadow-level-2 transition-all group"
>
  <!-- Header: logo + meta -->
  <div class="flex items-start gap-3">
    <img class="w-12 h-12 rounded-xl object-cover border border-outline-variant/30" />
    <div>
      <h3 class="font-headline-sm text-headline-sm text-on-surface">Job Title</h3>
      <p class="font-body-sm text-body-sm text-on-surface-variant">Company Name</p>
    </div>
  </div>
  <!-- Tags -->
  <div class="flex gap-2 mt-3">
    <span
      class="bg-surface-container text-on-surface-variant 
                 text-label-md font-label-md px-xs py-1 rounded-full"
    >
      Remote
    </span>
    <span
      class="bg-secondary-container text-on-secondary-container 
                 text-label-md font-label-md px-xs py-1 rounded-full"
    >
      New
    </span>
  </div>
  <!-- Salary -->
  <p class="mt-3 font-body-sm text-body-sm text-on-surface-variant">Rp 10.000.000 – 15.000.000</p>
</div>
```

### 8.8 Notification / Feed Item

```html
<div
  class="p-md flex gap-3 items-start hover:bg-surface-container-low 
            transition-colors cursor-pointer border-b border-outline-variant/30"
>
  <!-- Avatar or icon container -->
  <div
    class="w-10 h-10 rounded-full bg-secondary-container 
              flex items-center justify-center shrink-0"
  >
    <span class="material-symbols-outlined text-on-secondary-container">work</span>
  </div>
  <div class="flex-1">
    <p class="text-body-md text-on-background">
      <span class="font-bold">Company Name</span> notification text here
    </p>
    <p class="text-label-md text-on-surface-variant mt-1">2m ago</p>
  </div>
</div>
```

Unread indicator: add left border `border-l-2 border-primary` or dot badge.

### 8.9 Status / Tag Chip

```html
<!-- Default chip -->
<span
  class="bg-surface-container text-on-surface-variant 
             text-label-md font-label-md px-xs py-1 rounded-full uppercase"
>
  Applied
</span>

<!-- Yellow / accent chip -->
<span
  class="bg-secondary-container text-on-secondary-container 
             text-label-md font-label-md px-xs py-1 rounded-full uppercase"
>
  Recommended
</span>

<!-- Error / rejected -->
<span
  class="bg-error-container text-on-error-container 
             text-label-md font-label-md px-xs py-1 rounded-full uppercase"
>
  Rejected
</span>
```

### 8.10 Divider

```html
<div class="border-t border-outline-variant/30 my-md"></div>
```

Or with label:

```html
<div class="relative my-md">
  <div class="absolute inset-0 flex items-center">
    <div class="w-full border-t border-outline-variant/40"></div>
  </div>
  <div class="relative flex justify-center">
    <span
      class="px-3 bg-surface-container-lowest font-label-md text-label-md 
                 text-on-surface-variant uppercase"
      >OR</span
    >
  </div>
</div>
```

---

## 9. Icon System

All icons: **Material Symbols Outlined** (Google)

```html
<link
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=block"
  rel="stylesheet"
/>
```

```html
<!-- Default (outlined) -->
<span class="material-symbols-outlined">home</span>

<!-- Filled variant (for active states) -->
<span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">home</span>
```

Common icon mapping:

| Section       | Icon                         |
| ------------- | ---------------------------- |
| Home          | `home`                       |
| Jobs          | `work`                       |
| Applications  | `description`                |
| Saved         | `bookmark`                   |
| Notifications | `notifications`              |
| Profile       | `person`                     |
| Settings      | `settings`                   |
| Messages      | `chat`                       |
| Search        | `search`                     |
| Post Job      | `add_circle`                 |
| AI features   | `auto_awesome`, `psychology` |
| Apply         | `rocket_launch`              |
| Analytics     | `analytics`                  |

Size: use `text-[20px]` for inline UI, `text-[40px]` for feature icons in cards.

---

## 10. Page Patterns

### Landing Page

Structure: `Hero → Stats → Features (Candidate) → Features (Enterprise) → CTA → Footer`

**Hero:**

- 2-column grid: left = headline + CTA, right = image card (glass-card)
- H1: `display-lg`, color `primary`
- Sub: `body-lg`, color `on-surface-variant`
- CTA button: primary, `rounded-xl`
- Image card: `glass-card` (`bg-white/70 backdrop-blur-md border border-white/30 rounded-2xl`)

**Stats strip** (`bg-surface-container`):

- 4-column grid, centered
- Value: `headline-lg text-primary`
- Label: `label-md text-on-surface-variant uppercase tracking-widest`

**Feature cards** (`bg-surface hover:bg-white border border-outline-variant/30 rounded-2xl`):

- Icon on top (`material-symbols-outlined text-primary text-[40px]`)
- Icon scales on card hover: `group-hover:scale-110 transition-transform`
- Title: `headline-sm text-primary`
- Description: `body-md text-on-surface-variant`

**Enterprise feature cards:** white bg, `text-secondary` icons (golden yellow)

**CTA banner:**

```css
bg-secondary-container rounded-[2rem] p-lg
/* text overlay */
text-on-secondary-container
/* background orb */
absolute -top-1/2 -right-1/4 bg-white/10 rounded-full blur-3xl
```

**Footer** (`bg-primary`):

- Text: `text-on-primary-container`
- Brand: `text-secondary-fixed` (light gold)
- Links: inline, separated by `•`

---

### Login & Register Pages

Auth card: max-w `480px`, `bg-surface-container-lowest`, `rounded-xl`, subtle navy shadow, **4px navy top accent bar**.

- Logo: `headline-md font-extrabold text-primary tracking-tight`
- Heading: `headline-lg text-on-surface`
- Subtext: `body-md text-on-surface-variant`
- Form labels: `label-md UPPERCASE`
- Submit button: full-width, primary, `rounded-lg`
- Social button (Google): white bg, `border border-outline-variant`, `rounded-lg`, icon + label
- Footer links: `label-md text-on-surface-variant`

---

### App Pages (Home, Applications, Profile, Notifications)

All use 3-column layout (sidebar + content + optional right panel).

**Content area panel:**

```css
bg-surface-container-lowest rounded-xl border border-outline-variant
shadow-[0_4px_16px_rgba(2,21,65,0.06)]
```

**Panel header:**

```html
<div class="p-4 border-b border-outline-variant/30 flex items-center justify-between">
  <h3 class="font-headline-sm text-headline-sm text-primary">Page Title</h3>
  <div class="flex gap-2">
    <!-- action buttons -->
  </div>
</div>
```

**List item (notification, activity):**

- `p-md` padding, `border-b border-outline-variant/30`
- Hover: `hover:bg-surface-container-low transition-colors`
- Icon container: `w-10 h-10 rounded-full` — primary or secondary-container bg

---

## 11. Page Checklist untuk Halaman Baru

Gunakan Stitch file dari `.stitch/` sebagai reference visual sebelum coding.

- [ ] Gunakan 3-column layout (sidebar + content + right panel)
- [ ] Sidebar: sticky, w-80, nav items dengan pola active/hover di atas
- [ ] Content panel: `bg-surface-container-lowest rounded-xl border` + panel header
- [ ] Font: Hanken Grotesk headline, Inter body/label
- [ ] Color: hanya pakai token di atas — jangan hardcode hex
- [ ] Button primary: `bg-primary`, hover `bg-primary-container`
- [ ] Tags/badges: `rounded-full label-md uppercase`
- [ ] Loading: skeleton pakai `bg-surface-container-high animate-pulse rounded-xl`
- [ ] Empty state: icon (40px) + `headline-sm text-primary` + `body-md text-on-surface-variant`
- [ ] Ikon: Material Symbols Outlined

---

## 12. Do & Don't

| Do                                              | Don't                                       |
| ----------------------------------------------- | ------------------------------------------- |
| Light background `#f8f9ff`                      | Dark/glass background                       |
| Navy `#021541` untuk primary                    | Warna biru lain untuk primary               |
| Golden `#fdc003` untuk secondary CTA/accent     | Oranye atau warna lain untuk aksen          |
| Hanken Grotesk untuk headline                   | Plus Jakarta Sans atau font lain            |
| Inter untuk body/label                          | Font lain untuk body                        |
| `border border-outline-variant/30` pada card    | Shadow gelap tanpa border                   |
| `label-md` UPPERCASE untuk form label dan badge | Lowercase label atau font besar untuk badge |
| `active:scale-[0.98]` untuk button feedback     | Opacity change saat klik                    |
| Hover `translate-x-1` pada nav item             | Bold/underline untuk nav hover              |
| `rounded-xl` untuk button primer                | Button kotak atau terlalu rounded           |
| Material Symbols untuk ikon                     | Lucide atau icon library lain               |
| `text-on-surface-variant` untuk secondary text  | Grey hardcode                               |
