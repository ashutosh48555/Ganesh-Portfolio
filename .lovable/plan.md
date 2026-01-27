
# Premium Cinematic Portfolio for Ganesh — VFX Artist

## Vision
A dark, cinematic portfolio website that feels like stepping into a post-production suite. The design emphasizes **mood, lighting, and realism** — the same principles Ganesh applies to his VFX work. Warm amber accents evoke film lighting and golden hour cinematography, while smooth, physically-weighted animations create an immersive experience worthy of impressing film, advertising, and gaming clients.

---

## Design Language

### Color Palette
- **Background**: Deep charcoal (#0A0A0F) — not pure black, with subtle film grain texture
- **Foreground**: Warm off-white (#F5F0E8) — soft, easy on eyes
- **Accent**: Warm amber/gold (#D4A853) — used sparingly for highlights, CTAs, and interactive elements
- **Muted**: Cool gray (#6B7280) — secondary text

### Typography
- **Headlines**: Large, bold, cinematic with tight letter-spacing
- **Body**: Clean, readable sans-serif
- **Hierarchy**: Clear visual flow from H1 → body → captions

### Motion Principles
- Spring-based easing for organic, weighted feel
- Staggered reveals for cinematic drama
- Parallax depth on scroll
- Subtle hover states that respond to user presence

---

## Site Structure

### 1. Hero Section
**"Creating clean, cinematic VFX visuals"**
- Full-viewport cinematic hero with animated text reveal
- Name "GANESH" with staggered character animation
- Floating skill tags: Lighting • Compositing • CG Integration
- Animated particles/dust to suggest film atmosphere
- Smooth scroll indicator

### 2. About Section
- Ganesh's bio with fade-in reveal
- Philosophy statement about realism and mood
- Photo placeholder with cinematic crop

### 3. Skills Section
**Three Tiers with Visual Hierarchy**

**Core Strengths** (prominent cards with glow):
- Lighting
- Compositing  
- CG Integration

**VFX & Design Skills** (grid of icons):
- Texturing, Animation, Modeling, Sculpting, FX, Motion Graphics, Roto, Matchmove

**Game & Environment Work** (secondary tier):
- Base Game Designing, Level Design, Environment Design, Real-Time Lighting

### 4. Tools Section
Professional icon grid showcasing software proficiency:
- Blender, Maya, Adobe Premiere Pro, After Effects, Photoshop
- Nuke, Silhouette, 3D Equalizer, Houdini, Unreal Engine

### 5. Portfolio Section
**Filterable Project Grid**
- Category filters: All | Lighting | Compositing | CG Integration | Personal
- Project cards with:
  - Hover parallax effect on thumbnail
  - Title + category reveal on hover
  - Click opens detailed case study

### 6. Case Study Modal/Page
- Hero image/video
- Project overview
- Before/After slider comparison
- Shot breakdown with process steps
- Tools used (icon tags)
- Close button with smooth transition

### 7. Contact Section
- Minimal contact form (Name, Email, Message)
- Visual-only for now (ready for backend integration later)
- Direct email link: mailto:ganesh@email.com
- Social icons with hover animations
- Professional CTA: "Let's create something cinematic"

### 8. Footer
- Navigation links
- Social links
- Copyright

---

## Key Animations (Cinematic Suite)

1. **Hero Intro Sequence**
   - Title characters animate in with stagger (0.05s delay each)
   - Tagline fades up from below
   - Particle/dust animation starts after text settles

2. **Scroll-Triggered Section Reveals**
   - Sections fade + scale from 95% to 100%
   - Staggered children for content blocks
   - Intersection Observer triggers at 20% visibility

3. **Project Card Interactions**
   - Image subtle parallax on hover (3D tilt)
   - Overlay slides up revealing title + category
   - Cursor changes to custom "View" indicator

4. **Micro-Interactions**
   - Buttons: Subtle scale (1.02) + glow on hover
   - Navigation links: Underline animation
   - Form fields: Border glow on focus
   - Icons: Rotate or pulse on hover

5. **Lightbox/Modal**
   - Backdrop blur fade-in
   - Modal scales up from 95%
   - Content staggers in after modal settles

---

## Features Included

### Core Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth scroll behavior
- ✅ Dark cinematic theme with amber accents
- ✅ Full animation suite with Framer Motion
- ✅ Portfolio grid with category filters
- ✅ Project lightbox/modal for case studies
- ✅ Before/After comparison slider
- ✅ Contact form (visual, ready for backend)
- ✅ Accessible navigation and focus states

### Technical Implementation
- React + TypeScript + Vite (already set up)
- Tailwind CSS with custom design tokens
- Framer Motion for all animations
- Lazy loading for images
- Semantic HTML with ARIA labels
- Mobile-first responsive approach

---

## Content Placeholders

Since content is not ready yet, I'll include:
- High-quality cinematic placeholder images
- Sample project titles (e.g., "Sci-Fi Environment", "Product CG Integration")
- Placeholder video embeds
- Before/After sample images
- All easily replaceable with Ganesh's real content

---

## Deliverables

This implementation will include:
1. **Complete page structure** — All sections from hero to footer
2. **Design system** — Custom Tailwind configuration with amber accent
3. **Reusable components** — ProjectCard, SkillCard, CaseStudyModal, BeforeAfter slider
4. **Animation variants** — Centralized Framer Motion configurations
5. **Placeholder content** — Professional placeholders matching VFX aesthetic
6. **Responsive layout** — Works beautifully on all devices
7. **Accessibility** — Keyboard navigation, focus states, semantic HTML

The result will be a production-ready, cinematic portfolio that feels custom-built for a professional VFX artist — not a generic template.
