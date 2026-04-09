# Design System Document: Stardust Studios

## 1. Overview & Creative North Star: "The Celestial Narrative"
This design system is engineered to transform a digital interface into a cinematic experience. The "Creative North Star" is **The Celestial Narrative**—a philosophy that treats the UI not as a flat grid, but as a vast, atmospheric expanse. 

To achieve a "High-End Editorial" feel, we move away from standard functionalism toward intentional, rhythmic layouts. We break the "template" look by using exaggerated typographic scales, intentional asymmetry (e.g., staggering content blocks), and a depth model based on light and translucency rather than lines and boxes. This system is designed to feel as though it is being projected onto a dark lens, where light doesn't just indicate a button—it signals a moment of magic.

---

## 2. Colors: Depth through Atmosphere
The color palette avoids the "flat grey" trap of typical dark modes, instead utilizing a rich, chromatic range of indigos and violets to maintain vibrancy even in the shadows.

### The Palette
- **Primary (Magic Amber):** `#ffd79b` | Used for moments of peak interaction and conversion.
- **Secondary (Ethereal Lavender):** `#edb1ff` | Used for highlights, accents, and soft illumination.
- **Background (Midnight Indigo):** `#0b0e14` to `#1a1f2c` | Always implement as a subtle radial or linear gradient to mimic a cinematic lens vignette.

### The "No-Line" Rule
Explicitly prohibit the use of 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. To separate sections, transition from `surface` to `surface-container-low`. The eye should perceive a change in depth, not a physical barrier.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of frosted glass.
- **Layer 0 (Base):** `surface` (#10131a) - The infinite background.
- **Layer 1 (Sections):** `surface-container-low` (#191c22) - For large content blocks.
- **Layer 2 (Interactive):** `surface-container-high` (#272a31) - For cards and modals.
- **The Glass & Gradient Rule:** For floating navigation or high-impact cards, use a semi-transparent `surface-variant` with a 20px backdrop-blur. Apply a subtle gradient from `primary` to `primary-container` (at 10% opacity) as a "sheen" to provide visual soul.

---

## 3. Typography: Editorial Authority
The typography system relies on the tension between the expressive, quirky personality of Bricolage Grotesque (represented by Epilogue for this framework) and the technical precision of Manrope.

- **Display (Epilogue):** Set with tight letter-spacing (-2%). Use for hero headers to command attention.
- **Headline (Epilogue):** Large and rhythmic. Use these to anchor the page, often offset to one side to create asymmetrical white space.
- **Body (Manrope):** Set with generous line-height (1.6) to ensure readability against the dark background. 
- **Labels (Manrope):** Always uppercase with +5% letter-spacing to create a "technical/premium" feel for metadata and small captions.

| Token | Font | Size | Intent |
| :--- | :--- | :--- | :--- |
| **display-lg** | Epilogue | 3.5rem | Cinematic Hero Moments |
| **headline-md** | Epilogue | 1.75rem | Section Narrative |
| **body-lg** | Manrope | 1.0rem | High-readability narrative text |
| **label-md** | Manrope | 0.75rem | Meta-data and Micro-copy |

---

## 4. Elevation & Depth: Tonal Layering
In this design system, shadows are not "darkness"—they are the absence of glow.

- **The Layering Principle:** Depth is achieved by "stacking." Place a `surface-container-lowest` card on a `surface-container-low` section to create a soft, natural "recess" effect. 
- **Ambient Glows:** Instead of traditional drop shadows, use "Ambient Glows." When an element floats, use a wide-spread blur (30px+) of the `primary` or `secondary` color at a very low opacity (8%). This mimics the way light bleeds from a screen in a dark room.
- **The "Ghost Border" Fallback:** If a container needs a perimeter for accessibility, use the `outline-variant` token at **15% opacity**. Never use 100% opaque lines; they shatter the cinematic illusion.
- **Glassmorphism:** Use `surface-bright` at 40% opacity with a heavy `backdrop-filter: blur(12px)` for headers and floating menus to allow the "Midnight Indigo" background to bleed through.

---

## 5. Components: The Signature Elements

### Buttons (The "Magic" Trigger)
- **Radius:** Always `md` (1.5rem / 24px) to feel organic and premium.
- **Primary:** `primary` background with `on-primary` text. Add a 12px outer glow of `primary` at 20% opacity.
- **States:** On hover, the glow should expand and the background should shift toward `primary-fixed-dim`.

### Cards & Lists
- **The "No-Divider" Mandate:** Forbid the use of horizontal rules. Use vertical white space (80px–120px) or a subtle shift to `surface-container-highest` to differentiate content blocks.
- **Padding:** Use exaggerated internal padding (`xl` scale) to give content "room to breathe," mimicking a high-end magazine layout.

### Input Fields
- **Style:** Underlined only, or a subtle `surface-container-lowest` fill. 
- **Active State:** The bottom border should glow with `secondary` (Ethereal Lavender).

### Cinematic Modals
- **Style:** Full-screen overlays using a 60% opacity `surface-dim` with a heavy blur. The modal container itself should have no visible border, defined only by its elevation and the light it reflects from the background.

---

## 6. Do’s and Don’ts

### Do:
- **Do** use intentional asymmetry. Align a headline to the left and the body text to a narrow column on the right.
- **Do** use "Magic Amber" sparingly. It is a spotlight, not a floodlight.
- **Do** lean into gradients. Use a 45-degree linear gradient for any large surface to prevent it from looking "dead."

### Don't:
- **Don't** use pure white (#FFFFFF) for body text. Use `on-surface-variant` to reduce eye strain and maintain the "mood."
- **Don't** use standard 8px corner radii. Use the `md` (24px) or `full` tokens to maintain the signature soft-premium aesthetic.
- **Don't** place a shadow on an element that is already on the lowest surface tier. Light must have a logical source.

---

## 7. Spacing Scale
The spacing scale is intentionally generous to enforce a premium, unhurried user flow.
- **Section Gap:** 160px (Used to separate distinct narrative beats).
- **Component Gap:** 32px (Standard vertical rhythm).
- **Inner Padding:** 24px - 48px (Within cards and containers).

*This design system is a living framework. When in doubt, ask: "Does this feel like a utility, or does it feel like a scene?"*
