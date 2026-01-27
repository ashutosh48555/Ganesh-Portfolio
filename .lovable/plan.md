
# Implementation Plan: Remove CurvedLoop & Add MagicBento Component

## Overview
This plan will remove the CurvedLoop component from the Tools section and integrate a customized MagicBento grid component to showcase VFX projects or skills in an interactive, visually stunning way that matches the cinematic amber/gold theme.

## Best Placement for MagicBento
After analyzing the site structure, the **MagicBento component would work best as a Featured Work showcase** between the Skills section and Portfolio section. This creates a visual highlight before the full portfolio grid, featuring 6 key project categories or specializations with interactive effects.

---

## Technical Implementation

### 1. Remove CurvedLoop from Tools Section
**File:** `src/components/Tools.tsx`

Changes:
- Remove the CurvedLoop import
- Remove the CurvedLoop wrapper div (lines 31-41)
- Keep the tool icons grid with existing animations

### 2. Create MagicBento Component
**New File:** `src/components/MagicBento.tsx`

The component will be customized to match the portfolio theme:
- **Color Scheme:** Amber/gold glow (`212, 168, 83` - matching the primary color `#D4A853`)
- **Card Data:** VFX-specific categories (Lighting, Compositing, CG Integration, Personal Projects, Automotive, Architectural)
- **Features Enabled:**
  - `enableStars` - Floating particles on hover
  - `enableSpotlight` - Global spotlight following cursor
  - `enableBorderGlow` - Amber border glow effect
  - `enableTilt` - 3D tilt on hover
  - `clickEffect` - Ripple effect on click
  - `textAutoHide` - Text fades on hover for cleaner look

### 3. Integrate into Index Page
**File:** `src/pages/Index.tsx`

Add the MagicBento component between Skills and Portfolio sections:
```text
<Hero />
<About />
<Skills />
<MagicBento /> ← New component here
<Tools />
<Portfolio />
<Contact />
```

---

## Component Customization Details

### Card Data (VFX-Themed)
```text
┌─────────────────┬─────────────────┬───────────────────────┐
│   LIGHTING      │   COMPOSITING   │                       │
│   Master of     │   Seamless      │    CG INTEGRATION     │
│   atmosphere    │   blending      │    (Large Card)       │
├─────────────────┼─────────────────┤    Matching CG to     │
│                 │   PERSONAL      │    live action        │
│   AUTOMOTIVE    │   Creative      │                       │
│   (Large Card)  │   exploration   ├───────────────────────┤
│   Showroom      ├─────────────────┤    ARCHITECTURAL      │
│   quality       │                 │    Photorealistic     │
│                 │                 │    visualization      │
└─────────────────┴─────────────────┴───────────────────────┘
```

### Visual Styling
- **Background:** Deep charcoal (`#060010` → adjusted to match `--card` color)
- **Glow Color:** `212, 168, 83` (amber matching `--primary`)
- **Border:** Subtle amber glow on hover
- **Animation:** Staggered particle effects with amber/gold colors

### Framer Motion Integration
Since the project uses Framer Motion (not GSAP to avoid React conflicts), the MagicBento will be adapted:
- Replace GSAP animations with Framer Motion equivalents
- Use `motion.div` for tilt effects
- Use `AnimatePresence` for particle spawning
- Maintain smooth 60fps animations

---

## Files to Modify

| File | Action |
|------|--------|
| `src/components/Tools.tsx` | Remove CurvedLoop import and usage |
| `src/components/MagicBento.tsx` | Create new (Framer Motion version) |
| `src/pages/Index.tsx` | Add MagicBento between Skills and Portfolio |
| `src/components/CurvedLoop.tsx` | Can be deleted (no longer used) |

---

## Animation Features

### Spotlight Effect
- Large ambient glow following cursor across the grid
- Intensity increases near card boundaries
- Smooth transitions using spring physics

### Border Glow
- Radial gradient border that follows cursor position
- Intensity based on proximity to card center
- Amber/gold color matching theme

### Particle Stars
- Small floating particles on hover
- Random movement with subtle opacity pulsing
- Spawn in staggered pattern

### Tilt Effect
- 3D perspective tilt based on cursor position
- Max rotation: ±10 degrees
- Smooth spring-based return on mouse leave

### Click Ripple
- Expanding radial gradient from click point
- Fades out with scale animation
- Amber color with transparency

---

## Responsive Design

```text
Mobile (< 600px):     1 column, full width cards
Tablet (600-1024px):  2 columns
Desktop (> 1024px):   4 columns with spanning cards
```

The bento grid maintains visual hierarchy at all breakpoints while preserving interactivity (particles disabled on mobile for performance).

---

## Expected Result

A stunning interactive grid showcasing 6 VFX specialization areas with:
- Cinema-quality amber glow effects
- Smooth hover animations and 3D tilt
- Click feedback with ripple effects
- Particle effects that match the existing ClickSpark aesthetic
- Perfect integration with the dark cinematic theme
