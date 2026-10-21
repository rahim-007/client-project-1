# S.M.S DECORS — Architecture & Interior Digital Experience

> "Spaces That Speak."

An awards-inspired digital experience and editorial portfolio for **S.M.S DECORS**, a Chennai-based interior architecture and spatial renovation studio established in 2015.

---

## 1. Creative Direction & Visual Design System

- **Palette**:
  - Warm Ivory: `#F3EFE7` (Primary architectural canvas)
  - Charcoal: `#292A26` (Editorial typography & dark contrast volumes)
  - Muted Bronze: `#8A7658` (Refined accents, badges & metadata)
  - Soft Sage: `#D5DCCF` (Tactile surface tone)
  - Pure White: Contrast highlights and double-bezel enclosures
- **Typography**:
  - Editorial Serif: *Cormorant Garamond* (Variable optical weights, italic accents)
  - Clean Sans-Serif: *Plus Jakarta Sans* (Modern geometric sans for body, navigation, numbers, and metadata)
- **Aesthetic Principles**:
  - Double-bezel ("Doppelrand") nested cards with concentric radiuses
  - Button-in-button trailing icon architecture
  - Film grain tactile canvas overlay
  - Banned standard AI defaults: No AI-purple gradients, no cheap "SECTION 01" meta-labels, no 6-line wrapped headlines, no generic rounded cards

---

## 2. Key Interactive Motion Paradigms

1. **Scroll-Craft Camera Scrubber (Hero Walkthrough)**:
   - High-performance HTML5 `<canvas>` scrubber driven by 240 rendered frames (`frame-0001.jpg` to `frame-0240.jpg`).
   - Built to the `scroll-craft` skill `scrub` device architecture:
     - **0ms Instant First Paint**: Frame 1 paints immediately on mount; background preloader streams frames 2–240.
     - **Lerp 0.18 Playhead Smoothing**: Independent `requestAnimationFrame` lerp loop eliminates mouse wheel tick stutter.
     - **Dwell Plateaus & Narrative Cues**: 4 synchronized architectural cues with greet contracts and sustained plateau hold times so copy never flashes past.
     - **Architectural HUD**: Real-time zone indicators (*Living Salon*, *Atelier Joinery*, *Acoustic Loggia*, *Grand Atrium*), frame telemetry counter (`FRAME XXX / 240`), interactive clickable scrub bar, and optional automated tour mode.
     - **Clean Unpinning**: Releases smoothly into subsequent sections with zero scroll locking or trapping.
2. **Masked Image Reveals (Spatial Transformation Lens)**:
   - Interactive before-and-after renovation comparison slider with dynamic clip-path reveals (`polygon(...)`) and GSAP ScrollTrigger entry masks.
3. **Pinned Scroll Storytelling (Craft Archive)**:
   - Sticky dual-track layout where an architectural visual remains pinned while tactile material studies (Burma Teak, Honed Travertine, Precision Millwork, Turnkey Handover) scroll past alongside it.
4. **Horizontal Portfolio Transitions**:
   - Pinned horizontal scroll track translating projects across the viewport as the visitor scrolls, complete with category filtering (All, Residential, Commercial, Renovation) and manual arrow controls.

---

## 3. Verified Client Roster

Presented typographically in a restrained marquee and grid:
- **MNM Jain Engineering College** (Education · Chennai)
- **Dhanaraj Baid Jain College** (Education · Chennai)
- **MNM Jain School of Architecture** (Education · Chennai)
- **SOL India Pvt. Ltd.** (Corporate · Chennai)
- **UCAL Fuel Systems** (Manufacturing · Tamil Nadu)
- **Orbis India Pvt. Ltd.** (Corporate · Chennai)
- **Sri Lakshmi AGS Engineering** (Engineering · Chennai)
- **Leo Prime Comp Pvt. Ltd.** (Manufacturing · Chennai)

---

## 4. Contact & Consultation

- **Phone**: `+91 98412 13025` (working `tel:` link)
- **Email**: `smsdecorskumaran@gmail.com` (working `mailto:` link)
- **Atelier Address**: `No. 25, Seevaram 2nd Street, Perungudi, Chennai - 600 096`
- **Google Maps**: Verified direct link to Seevaram 2nd Street, Perungudi
- **Frontend-only Enquiry Brief**: Validates client requirements and automatically drafts a prefilled email without remote server data storage.

---

## 5. Development & Production Commands

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run production build & TypeScript typecheck
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

---

## 6. How to Replace Photography with Client Assets

All imagery is strictly typed and decoupled from UI components. To add original client site photographs:
1. Place image files into `public/projects/` or `src/assets/`.
2. Update the paths in [`src/data/projects.ts`](file:///C:/Users/Rahim/Desktop/client%20projest/src/data/projects.ts) and [`src/data/services.ts`](file:///C:/Users/Rahim/Desktop/client%20projest/src/data/services.ts).
