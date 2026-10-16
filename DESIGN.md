---
name: KonohaTech Precision Dark
colors:
  primary: "#df2531"
  primary-hover: "#b81c26"
  primary-glow: "rgba(223, 37, 49, 0.15)"
  background: "#050505"
  card: "#0c1017"
  card-glass: "rgba(255, 255, 255, 0.03)"
  text-primary: "#f4f4f5"
  text-muted: "#a1a1aa"
  border: "rgba(255, 255, 255, 0.12)"
  border-subtle: "rgba(255, 255, 255, 0.05)"
typography:
  font-sans:
    fontFamily: Inter, ui-sans-serif, system-ui, sans-serif
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  font-display:
    fontFamily: Space Grotesk, Inter, sans-serif
    fontSize: 24px
    fontWeight: 600
    lineHeight: 1.2
  font-mono:
    fontFamily: JetBrains Mono, monospace
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.4
rounded:
  sm: 8px
  md: 12px
  lg: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 12px 24px
  card-glass:
    backgroundColor: "{colors.card-glass}"
    rounded: "{rounded.lg}"
    border: "{colors.border-subtle}"
---

# KonohaTech Design Specification

## Overview
Design system for KonohaTech software engineering boutique. Premium dark aesthetic, high-contrast crimson accents (#df2531), glassmorphism, and micro-interactions delivering a high-performance, elite engineering feel.

## Colors
- **Primary Red (#df2531):** Key interactive driver, focus rings, and primary action CTAs.
- **Background (#050505):** Ultra-deep black providing maximum contrast.
- **Card (#0c1017):** Elevated dark surfaces with subtle border reflections.
- **Text Primary (#f4f4f5) & Muted (#a1a1aa):** High legibility typography hierarchy.

## Typography
- **Headlines & Display:** Space Grotesk / Inter for crisp tech authority.
- **Body:** Inter for optimal readability across device sizes.
- **Mono:** JetBrains Mono for technical codes and specifications.

## Shapes
- Modals, action cards, and buttons use 12px to 16px rounding with border accents and subtle glow on active states.

## Do's and Don'ts
- Do keep high-contrast crimson reserved for key action points and highlights.
- Don't use generic purple or standard SaaS templates.
