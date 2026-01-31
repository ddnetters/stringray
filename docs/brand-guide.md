# Stringly-Typed Brand Guide

## Brand Overview

**Stringly-Typed** is an AI-powered GitHub Action that validates UI strings against your brand voice. It catches tone violations before code merges, enforcing style guides consistently across codebases.

### Brand Essence
A thoughtful, practical tool that brings order and consistency to brand voice across engineering teams. The brand feels craft-like, warm, and human-centered—not sterile or overly technical.

### Tagline Options
- "Catch off-brand copy before it ships"
- "Your brand voice, enforced automatically"
- "Every PR, on-brand"

---

## Brand Personality

| Trait | Description | Voice Example |
|-------|-------------|---------------|
| **Confident** | Knows its value, doesn't oversell | "2-minute setup. Runs in ~2-5 seconds." |
| **Approachable** | Friendly, not corporate | "This is a small project" |
| **Witty** | Clever wordplay, subtle humor | Name plays on "strongly-typed" |
| **Practical** | Focuses on solving real problems | Shows real costs, limitations |
| **Developer-friendly** | Speaks technical language naturally | Uses code examples, not marketing fluff |

### Tone Guidelines
- **Do**: Be direct, use active voice, show don't tell
- **Don't**: Use jargon without context, be preachy, overpromise

---

## Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Burnt Sienna** | `#C45D3E` | 196, 93, 62 | Primary actions, CTAs, brand accent |
| **Mustard Gold** | `#D4A853` | 212, 168, 83 | Secondary accent, highlights, cursors |
| **Warm Cream** | `#F4E8DD` | 244, 232, 221 | Backgrounds, cards, logo background |
| **Chocolate Brown** | `#3D2B23` | 61, 43, 35 | Primary text, headings |
| **Deep Burgundy** | `#8B3A3A` | 139, 58, 58 | Emphasis, error states |

### Extended Palette

| Name | Hex | Usage |
|------|-----|-------|
| **Soft White** | `#FDFCFA` | Light backgrounds |
| **Warm Gray** | `#9B8B7A` | Secondary text, borders |
| **Success Green** | `#4A7C59` | Success states, passing checks |
| **Warning Amber** | `#D4A853` | Warning states (uses Mustard Gold) |
| **Error Red** | `#8B3A3A` | Error states (uses Deep Burgundy) |

### Color Usage Rules
1. **Burnt Sienna** is the hero color—use sparingly for maximum impact
2. **Chocolate Brown** on **Warm Cream** is the default text combination
3. Never use pure black (#000) or pure white (#FFF)
4. Maintain minimum 4.5:1 contrast ratio for accessibility

---

## Typography

### Font Stack

| Purpose | Font | Fallback | Weight |
|---------|------|----------|--------|
| **Display/Headlines** | Righteous | system-ui, sans-serif | 400 |
| **Body Copy** | Source Serif 4 | Georgia, serif | 400, 600 |
| **Code/Technical** | JetBrains Mono | monospace | 400, 500 |

### Type Scale

| Element | Size | Line Height | Font |
|---------|------|-------------|------|
| H1 | 48px / 3rem | 1.1 | Righteous |
| H2 | 36px / 2.25rem | 1.2 | Righteous |
| H3 | 24px / 1.5rem | 1.3 | Righteous |
| Body | 18px / 1.125rem | 1.6 | Source Serif 4 |
| Small | 14px / 0.875rem | 1.5 | Source Serif 4 |
| Code | 16px / 1rem | 1.5 | JetBrains Mono |

### Typography Rules
1. Headlines use **Righteous**—bold, geometric, attention-grabbing
2. Body text uses **Source Serif 4**—elegant, readable, professional
3. All code samples use **JetBrains Mono**
4. Avoid all-caps except for small labels/badges

---

## Logo

### Logo Concept
The Stringly-Typed logo combines:
- **Typography focus**: Emphasizes the "string" aspect
- **Warmth**: Uses the brand color palette
- **Craft aesthetic**: Subtle vintage/artisanal feel
- **Simplicity**: Works at small scale (GitHub badges, favicons)

### Logo Variations

| Version | Usage |
|---------|-------|
| **Primary (Full)** | Website hero, documentation headers |
| **Horizontal** | README badges, navigation |
| **Icon Only** | Favicon, app icon, social avatars |
| **Monochrome** | Single-color contexts, print |

### Logo Clear Space
- Minimum clear space = height of the "S" in Stringly
- Never place logo on busy backgrounds without a container

### Logo Don'ts
- Don't stretch or distort
- Don't change colors outside the brand palette
- Don't add effects (shadows, gradients, outlines)
- Don't place on low-contrast backgrounds

---

## Visual Elements

### Texture & Effects
- **Film grain overlay**: Subtle, adds organic warmth
- **Scan lines**: Used on terminal/code sections for retro-futuristic feel
- **Rounded corners**: 8px default, 12px for cards

### Iconography
- Use simple, line-based icons
- Stroke width: 2px
- Color: Chocolate Brown or Burnt Sienna
- Rounded caps and joins

### Photography/Imagery
- Warm, natural lighting
- Desaturated/muted tones
- Avoid stock photo clichés
- Prefer abstract/textural imagery over people

---

## UI Components

### Buttons

```css
/* Primary Button */
background: #C45D3E;
color: #F5EDE4;
border-radius: 8px;
padding: 12px 24px;
font-family: 'Source Serif 4';
font-weight: 600;

/* Secondary Button */
background: transparent;
border: 2px solid #C45D3E;
color: #C45D3E;
```

### Cards

```css
background: #FDFCFA;
border: 1px solid rgba(61, 43, 35, 0.1);
border-radius: 12px;
box-shadow: 0 2px 8px rgba(61, 43, 35, 0.05);
```

### Code Blocks

```css
background: #3D2B23;
color: #F5EDE4;
font-family: 'JetBrains Mono';
border-radius: 8px;
/* Optional: scan line overlay */
```

---

## Voice & Messaging

### Key Messages

1. **Problem Statement**
   > "Every PR is a chance to ship off-brand copy. Catch it automatically."

2. **Value Proposition**
   > "Define your style guide once. Enforce it on every commit."

3. **Ease of Use**
   > "2-minute setup. One workflow file. Done."

4. **Speed**
   > "Runs in ~2-5 seconds. Only checks changed files."

### Writing Style
- Use contractions (it's, don't, you'll)
- Prefer short sentences
- Lead with benefits, follow with features
- Use second person ("you" not "users")
- Be specific with numbers and examples

---

## Social Media

### Profile Images
- Use icon-only logo version
- Burnt Sienna background with Warm Cream icon
- Or Warm Cream background with Chocolate Brown icon

### Banner Images
- Include tagline
- Show product in action (PR comment screenshot)
- Use brand colors consistently

### Hashtags
- #StringlyTyped
- #BrandVoice
- #GitHubActions
- #DevTools

---

## File Naming Convention

```
stringly-typed-logo-primary.svg
stringly-typed-logo-horizontal.svg
stringly-typed-logo-icon.svg
stringly-typed-logo-monochrome.svg
stringly-typed-banner-github.png
stringly-typed-og-image.png
stringly-typed-favicon.ico
```

---

## Asset Checklist

- [ ] Primary logo (SVG, PNG @1x, @2x)
- [ ] Horizontal logo (SVG, PNG)
- [ ] Icon only (SVG, PNG, ICO)
- [ ] Monochrome versions
- [ ] GitHub social preview (1280x640)
- [ ] Twitter/X banner (1500x500)
- [ ] Favicon (16x16, 32x32, 180x180)
- [ ] Open Graph image (1200x630)

---

*Brand Guide v1.0 — Stringly-Typed*
