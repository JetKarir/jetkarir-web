---
name: Kinetic Professionalism
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464f'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#757680'
  outline-variant: '#c5c6d0'
  surface-tint: '#4d5d8b'
  primary: '#021541'
  on-primary: '#ffffff'
  primary-container: '#1a2b56'
  on-primary-container: '#8393c5'
  inverse-primary: '#b5c5f9'
  secondary: '#785900'
  on-secondary: '#ffffff'
  secondary-container: '#fdc003'
  on-secondary-container: '#6c5000'
  tertiary: '#000f51'
  on-tertiary: '#ffffff'
  tertiary-container: '#001e84'
  on-tertiary-container: '#758cff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae1ff'
  primary-fixed-dim: '#b5c5f9'
  on-primary-fixed: '#051944'
  on-primary-fixed-variant: '#354572'
  secondary-fixed: '#ffdf9e'
  secondary-fixed-dim: '#fabd00'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5b4300'
  tertiary-fixed: '#dee1ff'
  tertiary-fixed-dim: '#bac3ff'
  on-tertiary-fixed: '#001159'
  on-tertiary-fixed-variant: '#0031c4'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 0.5rem
  sm: 1rem
  md: 1.5rem
  lg: 2.5rem
  xl: 4rem
  gutter: 24px
  margin-mobile: 16px
  container-max: 1280px
---

## Brand & Style
The design system is built on the pillars of **velocity, trust, and clarity**. It caters to high-growth professionals and recruiters who value efficiency and institutional reliability. 

The aesthetic is **Corporate / Modern** with subtle **Minimalist** influences. It utilizes generous whitespace to reduce cognitive load during complex tasks like CV building and application tracking. Visual interest is maintained through high-contrast accents and "kinetic" UI patterns that suggest forward motion and career progress. The interface avoids unnecessary decoration, focusing instead on data density that feels breathable yet informative.

## Colors
The palette is anchored by **Deep Navy Blue**, signifying stability and corporate authority. **Golden Yellow** is used strategically as a "high-velocity" accent for calls-to-action and critical status updates, ensuring high visibility without overwhelming the professional tone. 

- **Primary:** Used for headers, primary buttons, and navigational branding.
- **Secondary:** Reserved for highlighting "Recommended" tags, premium features, and active application statuses.
- **Surface Tints:** Use ultra-light variations of the primary blue (#F8FAFC) for background sections to distinguish between different content modules.
- **Semantic Colors:** Success (Emerald), Error (Rose), and Warning (Amber) should follow standard accessibility ratios against the white background.

## Typography
This design system utilizes a dual-sans-serif pairing. **Hanken Grotesk** provides a sharp, contemporary edge for headlines, suggesting tech-forwardness. **Inter** is used for all functional text, providing industry-leading legibility for job descriptions and form inputs.

Hierarchy is maintained through strict weight differentiation. Labels and "overlines" use uppercase tracking to create a rhythmic break in data-heavy recruiter dashboards. Body text should maintain a minimum contrast ratio of 4.5:1 against surfaces.

## Layout & Spacing
The layout follows a **Fluid Grid** model with a 12-column structure for desktop. 

- **Desktop (1280px+):** 24px gutters, 80px side margins.
- **Tablet (768px - 1279px):** 16px gutters, 40px side margins.
- **Mobile (<767px):** 16px margins, single-column stack.

Spacing follows an 8pt rhythm to ensure mathematical harmony. Use `lg` (40px) spacing between major sections (e.g., Hero to Job Board) and `sm` (16px) for internal card padding to maintain a compact, efficient feel.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and **Ambient Shadows**. This design system avoids heavy blacks in shadows, opting instead for shadows tinted with the primary navy color at very low opacities.

- **Level 0 (Base):** #FFFFFF.
- **Level 1 (Cards):** 1px border (#E2E8F0) with a 4px blur, 2% opacity Navy shadow.
- **Level 2 (Hover/Active States):** 8px blur, 6% opacity Navy shadow.
- **Level 3 (Modals/Overlays):** 24px blur, 12% opacity Navy shadow.

Interactive elements like "Swipe Cards" should feel physically lifted from the background when engaged, using Level 2 elevation during the drag interaction.

## Shapes
The shape language is **Rounded**, utilizing an 8px (0.5rem) base radius. This softens the "corporate" feel of the navy blue, making the platform feel approachable and modern.

- **Buttons & Inputs:** 8px radius for a standard professional look.
- **Job Cards:** 12px (rounded-lg) to create a distinct containerized feel.
- **Status Chips:** Full "Pill" rounding to differentiate them from interactive buttons.
- **Progress Trackers:** Use rounded ends for the track and circular nodes for individual steps.

## Components

### Job Cards
Cards feature a white background with a subtle Level 1 elevation. The Company Logo is placed top-left, with the Salary/Location info grouped at the bottom using `body-sm`. A secondary yellow tag is used for "New" or "Urgent" listings.

### Progress Trackers
Inspired by high-clarity logistics flows:
- **Completed:** Navy circle with a white checkmark.
- **Active:** Navy outline with a pulsing center.
- **Pending:** Soft grey circle.
- Connecting lines should be 2px thick, transitioning from Navy to Grey.

### CV Builder Elements
Modular "blocks" that can be reordered. Each block uses a subtle `dashed` border on hover to indicate "Draggable" status. Use `label-md` for section headers (e.g., EXPERIENCE, EDUCATION) to maintain a clean, resume-like structure.

### Swipe Interface
Mobile-first card stack. 
- **Swipe Right:** Card tilts green with a "Save" icon overlay.
- **Swipe Left:** Card tilts red with a "Skip" icon overlay.
- Ensure the background behind the stack is a neutral light grey (#F1F5F9) to provide maximum contrast for the white cards.

### Input Fields
Default state uses a 1px border (#CBD5E1). On focus, the border transitions to Primary Navy with a 2px outer "halo" of the same color at 10% opacity.