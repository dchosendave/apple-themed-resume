---
name: LowieOS Portfolio
description: Dark-first recruiter portfolio with mint-lit glass surfaces, calm systems detail, and a handcrafted finish.
colors:
  forest-afterglow: "#b7e4c7"
  afterglow-lift: "#d3f2dc"
  soft-mint: "#f3f7f1"
  warm-brass: "#e2b867"
  night-canopy: "#070a08"
  deep-canopy: "#111711"
  smoked-glass: "#141b15b8"
  smoked-glass-border: "#b7e4c721"
  chip-mist: "#ffffff12"
  mint-wash: "#b7e4c71f"
  paper-mist: "#f4f7f1"
  paper-glass: "#ffffffc2"
  forest-ink: "#182019"
typography:
  display:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2rem)"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
    fontSize: "1.75rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  control: "8px"
  tab: "12px"
  pill: "999px"
  module: "18px"
  panel: "20px"
  card: "24px"
spacing:
  compact: "12px"
  room: "16px"
  section: "20px"
  frame: "24px"
  chip-x: "12px"
  chip-y: "4px"
components:
  button-primary:
    backgroundColor: "{colors.forest-afterglow}"
    textColor: "{colors.night-canopy}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  button-secondary:
    backgroundColor: "{colors.chip-mist}"
    textColor: "{colors.soft-mint}"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  icon-button:
    backgroundColor: "{colors.chip-mist}"
    textColor: "{colors.soft-mint}"
    rounded: "{rounded.pill}"
    size: "36px"
  chip-default:
    backgroundColor: "{colors.chip-mist}"
    textColor: "{colors.soft-mint}"
    rounded: "{rounded.pill}"
    padding: "5px 10px"
  badge-signal:
    backgroundColor: "{colors.mint-wash}"
    textColor: "{colors.forest-afterglow}"
    rounded: "{rounded.pill}"
    padding: "4px 10px"
  card-shell:
    backgroundColor: "{colors.smoked-glass}"
    textColor: "{colors.soft-mint}"
    rounded: "{rounded.card}"
    padding: "20px 24px"
  panel-inner:
    backgroundColor: "{colors.deep-canopy}"
    textColor: "{colors.soft-mint}"
    rounded: "{rounded.module}"
    padding: "16px"
  input-command:
    backgroundColor: "{colors.chip-mist}"
    textColor: "{colors.soft-mint}"
    rounded: "{rounded.control}"
    height: "32px"
  segmented-tab-active:
    backgroundColor: "{colors.forest-afterglow}"
    textColor: "{colors.night-canopy}"
    rounded: "{rounded.tab}"
    height: "32px"
  dialog-command:
    backgroundColor: "{colors.smoked-glass}"
    textColor: "{colors.soft-mint}"
    rounded: "{rounded.card}"
    padding: "16px 0"
---

# Design System: LowieOS Portfolio

## 1. Overview

**Creative North Star: "The Calm Systems Deck"**

This portfolio should feel like a recruiter's private systems deck, assembled by the engineer himself. It is complete, confident, and softly cinematic, but never theatrical. The dark-first default matches the real viewing moment: a recruiter reviewing candidates on a laptop after hours, in a dim room, while deciding who feels credible enough to remember.

The mint accent behaves like a trusted systems signal, not a marketing highlighter. Glass shells behave like ordered drawers, holding dense information in calm modules. Warm brass exists only as a human note, enough to keep the page personal without weakening its technical poise. The light theme is a daylight counterpart, not a different brand.

This system explicitly rejects anything that reads AI-generated, generic, or template-driven. It should never feel cloned from a SaaS landing page, never drift into decorative glassmorphism, and never flatten Lowie's voice into a personality-free developer template. The craft must look owned.

**Key Characteristics:**
- Dark-first, recruiter-legible surfaces with green-tinted neutrals.
- One-sans typography system that earns hierarchy through weight, spacing, and scale.
- Ambient glass depth, rounded utility pills, and calm motion.
- Dense information broken into orderly modules that stay easy to scan.

## 2. Colors: The Calm Systems Deck Palette

The palette is restrained and atmospheric: one mint signal, one brass human note, and a full stack of green-tinted neutrals doing the structural work.

### Primary
- **Forest Afterglow** (`#b7e4c7`): the default accent for primary actions, active tabs, metric numerals, section eyebrows, and focus states. It is the page's trust signal.

### Secondary
- **Warm Brass** (`#e2b867`): reserved for geography, progress bars, and occasional human details. It adds warmth without becoming a second CTA color.

### Tertiary
- **Soft Mint** (`#f3f7f1`): the high-legibility reading color in dark mode. Use it when mint needs to become a readable surface instead of a saturated action.

### Neutral
- **Night Canopy** (`#070a08`): the page field. It is nearly black, but still visibly green-tinted.
- **Deep Canopy** (`#111711`): the denser interior tone for grouped sections, drawers, and nested trays.
- **Smoked Glass** (`#141b15b8`): the main translucent shell for cards, dialogs, and overlays. It always pairs with blur and a low-alpha mint border.
- **Paper Mist** (`#f4f7f1`): the light-theme page background. It keeps the same green cast instead of resetting to neutral white.
- **Forest Ink** (`#182019`): the light-theme primary text color. It keeps the system grounded when the page flips to daylight mode.

### Named Rules
**The Afterglow Rule.** Forest Afterglow carries actions, active states, and key numerals. If whole regions turn mint, the signal hierarchy is gone.

**The Warmth Rule.** Warm Brass is a humanizing accent, not a second CTA color. Use it where the page needs warmth, never where the page needs authority.

## 3. Typography

**Display Font:** Inter, -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif  
**Body Font:** Inter, -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif  
**Label/Mono Font:** None distinct. Labels stay in Inter.

**Character:** The type system is complete, confident, and softly cinematic because it commits to one voice. Expression comes from weight, tracking, and casing, not from bolting on a decorative second family.

### Hierarchy
- **Display** (800, `clamp(1.5rem, 3vw, 2rem)`, 1.1): reserved for the hero name and the few places that need immediate identity.
- **Headline** (800, `1.75rem`, 1): used for metric numerals and other short, high-confidence callouts.
- **Title** (600, `1rem`, 1.35): used for company names, card headers, and sectional anchors inside dense content.
- **Body** (400, `0.9rem`, 1.65): used for narrative copy and bullet content. Keep text blocks tight and readable, capped around 58ch to 65ch.
- **Label** (600, `0.72rem`, `0.1em`, uppercase): used for section eyebrows, chips, tab labels, and metadata that must scan fast.

### Named Rules
**The Single Voice Rule.** Inter carries the whole system. Contrast comes from weight, scale, casing, and tracking, not from adding a second display face.

## 4. Elevation

This system uses ambient depth, soft glass, and reassuring controls. Outer shells float gently above the page field, inner trays sit denser inside them, and hover states lift only enough to confirm interactivity. Depth should feel like air around a clean machine, not like stacked paper or frosted decoration.

### Shadow Vocabulary
- **Resting shell** (`box-shadow: 0 18px 40px rgba(18, 31, 20, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.08)`): default outer card treatment when the surface is calm.
- **Dialog float** (`box-shadow: 0 24px 64px rgba(0, 0, 0, 0.4)`): high-priority surfaces such as drawers and command dialogs in dark mode.
- **Hover lift** (`box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35)`): interactive cards and tiles on hover. It should register instantly, then disappear just as fast.
- **Mint glow** (`box-shadow: 0 12px 28px color-mix(in srgb, var(--ios-blue) 30%, transparent)`): reserved for primary actions and active controls, never for large passive surfaces.

### Named Rules
**The Ambient Depth Rule.** Depth should feel like air. If a shadow edge becomes crisp, blue-gray, or obviously decorative, the surface is too heavy.

## 5. Components

### Buttons
Buttons feel reassuring, not salesy.
- **Shape:** fully pill-rounded (`999px`) for primary, secondary, and icon actions.
- **Primary:** Forest Afterglow fill with Night Canopy text, `8px 16px` padding, `0.8rem` semibold label. Used for the resume CTA and any action that deserves the strongest signal.
- **Hover / Focus:** lift by `1px` on hover, brighten slightly, and add a soft mint shadow. Focus uses a `2px` mint ring with a `2px` background offset.
- **Secondary / Ghost / Tertiary:** Smoked Glass or Chip Mist background, low-alpha border, Soft Mint or Forest Afterglow text. Icon buttons stay circular at `34px` to `36px`, never square.

### Chips
Chips are utility markers, not decoration.
- **Style:** misted pill background, `1px` low-alpha border, `0.68rem` to `0.72rem` semibold text, tight horizontal padding.
- **State:** neutral chips summarize facts, signal badges use mint wash, and warm brass chips are reserved for human details such as location or lighter personal cues.

### Cards / Containers
Cards behave like drawers inside a well-organized kit.
- **Corner Style:** generous outer shells (`24px`), medium inner modules (`18px` to `20px`), smaller active tabs and controls (`8px` to `12px`).
- **Background:** outer shells use Smoked Glass with blur, inner trays use Deep Canopy or mint-tinted washes.
- **Shadow Strategy:** ambient by default, hover-only intensification for interactive cards.
- **Border:** `1px` low-alpha mint or forest border. Borders separate structure, never call attention to themselves.
- **Internal Padding:** `18px` to `24px` on major cards, `12px` to `16px` on nested modules.

### Inputs / Fields
The only canonical field is the command search input, and it stays integrated with the shell.
- **Style:** a compact `32px` field nested inside a rounded tray instead of floating alone. The wrapper owns most of the chrome.
- **Focus:** subtle border and ring shift. Never a loud neon outline, never a detached floating shadow.
- **Error / Disabled:** shadcn token states are acceptable, but keep the dark shell, soft edge, and low-drama contrast intact.

### Navigation
Navigation is handled as segmented utility controls, not page chrome.
- **Style, typography, default/hover/active states, mobile treatment.** Tabs sit in `16px` rounded rails with `4px` inner padding, `12px` active pills, and `0.72rem` semibold labels.
- **Default / Hover / Active:** default state is muted mint text on a smoked rail, hover sharpens toward Soft Mint, active fills with Forest Afterglow and switches text to Night Canopy.
- **Mobile treatment:** horizontal scroll without visible scrollbars. Do not collapse this pattern into a dropdown unless the options become materially longer.

### Command Center
The signature overlay should feel like a private tool drawer inside the portfolio.
- It uses a `24px` smoked-glass shell, section eyebrow, hotkey chip, recessed search field, and mint-selected action rows.
- It should read like a handcrafted systems utility, not a generic modal dropped on top of the page.

## 6. Do's and Don'ts

### Do:
- **Do** tint every neutral toward green in both dark and light themes. Pure black, pure white, and neutral gray flatten the identity.
- **Do** keep Forest Afterglow concentrated on actions, active controls, key numbers, and section eyebrows.
- **Do** preserve the `24px` outer shell and `18px` to `20px` inner-module rhythm. The rounded system is part of the voice.
- **Do** use blur, translucency, and ambient shadow only when they clarify hierarchy or grouping.
- **Do** keep recruiter-facing copy compact, legible, and immediately scannable.

### Don't:
- **Don't** make it look AI-generated. If a new section could be dropped into any generic portfolio template, it failed.
- **Don't** make it generic or template-driven. Avoid repeated icon-heading-text grids, canned hero metrics, or default SaaS landing-page composition.
- **Don't** turn the glass treatment into decorative glassmorphism. Blur is structural here, not candy.
- **Don't** introduce unrelated accent colors that compete with Forest Afterglow and Warm Brass.
- **Don't** swap in decorative serif or editorial-magazine styling just to signal "design." This system earns personality through complete execution, not genre cosplay.
- **Don't** use side-stripe accent borders, gradient text, or oversized rounded icons above every heading.
