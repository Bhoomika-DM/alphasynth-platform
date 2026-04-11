# Final Color System - Sage & Gold Palette

## 🎨 Complete Color Palette (Based on Palette 03)

### Primary Colors

| Color | Hex Code | Usage | RGB |
|-------|----------|-------|-----|
| **Dark Sage** | #6A994E | Profit indicators, positive changes | rgb(106, 153, 78) |
| **Gold** | #E5B960 | HOLD status, rewards, XP, highlights | rgb(229, 185, 96) |
| **Light Sage** | #B8C9A8 | Secondary elements, muted states | rgb(184, 201, 168) |
| **Medium Sage** | #A7C4A0 | Cards, surfaces, backgrounds | rgb(167, 196, 160) |
| **Red Accent** | #C17767 | **ALL BUTTONS**, primary actions, CTAs | rgb(193, 119, 103) |
| **Terracotta** | #BC4749 | Loss indicators, danger, warnings | rgb(188, 71, 73) |

### Supporting Colors

| Color | Hex Code | Usage |
|-------|----------|-------|
| Background | #F4F7F2 | Main page background (light cream) |
| Text Dark | #1F2933 | Primary text |
| Text Muted | #6B7280 | Secondary text, labels |
| White | #FFFFFF | Text on colored backgrounds |

## 🔘 Button Color System

**ALL BUTTONS USE RED ACCENT (#C17767)**

### Primary Buttons
```css
background: #C17767
color: white
hover: scale(1.02)
shadow: 0 4px 20px rgba(193,119,103,0.3)
```

### Secondary/Outline Buttons
```css
background: #C17767/8
border: #C17767/20
color: #C17767
hover: bg #C17767/12
```

### Ghost Buttons
```css
background: transparent
border: white/10
hover: border #C17767/30, text #C17767
```

## 📊 Status Indicators

### Trading Signals

**BUY Signal:**
- Color: `#6A994E` (dark sage/green)
- Background: `#6A994E/20`
- Border: `#6A994E/40`

**HOLD Signal:**
- Color: `#E5B960` (gold)
- Background: `#E5B960/20`
- Border: `#E5B960/40`

**SELL Signal:**
- Color: `#BC4749` (terracotta)
- Background: `#BC4749/20`
- Border: `#BC4749/40`

### Profit/Loss

**Profit:**
- Text: `#6A994E` (dark sage)
- Icon: Dark sage
- Background: `#6A994E/10`

**Loss:**
- Text: `#BC4749` (terracotta)
- Icon: Terracotta
- Background: `#BC4749/10`

**Neutral:**
- Text: `#E5B960` (gold)
- Icon: Gold
- Background: `#E5B960/10`

## 🎯 Component-Specific Colors

### Cards & Surfaces
- Background: `#A7C4A0` (medium sage)
- Border: `#6A994E/20` or none
- Shadow: `0 4px 12px rgba(0,0,0,0.05)`

### Input Fields
- Background: `white`
- Border: `#6B7280/20`
- Focus ring: `#C17767` (red accent)
- Placeholder: `#6B7280`

### Navigation
- Active state: `#C17767` (red accent)
- Hover: `#C17767/10`
- Text: `#1F2933`

### Icons
- Default: `#6B7280` (muted)
- Active: `#C17767` (red accent)
- Profit: `#6A994E` (dark sage)
- Loss: `#BC4749` (terracotta)
- Reward: `#E5B960` (gold)

## 🎨 CSS Variables

```css
:root {
  /* Core Colors */
  --color-primary: #6A994E;      /* Dark Sage - Profit */
  --color-accent: #C17767;       /* Red Accent - Buttons */
  --color-gold: #E5B960;         /* Gold - Rewards, HOLD */
  --color-sage-light: #B8C9A8;   /* Light Sage */
  --color-sage-dark: #7A9B6E;    /* Dark Sage variant */
  --color-bg: #F4F7F2;           /* Background */
  --color-surface: #A7C4A0;      /* Cards */
  --color-danger: #BC4749;       /* Terracotta - Loss */
  --color-text: #1F2933;         /* Text */
  --color-muted: #6B7280;        /* Muted text */
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, #6A994E, #A7C4A0);
  --gradient-accent: linear-gradient(135deg, #C17767, #D89080);
  --gradient-gold: linear-gradient(135deg, #E5B960, #F0CA7A);
  --gradient-red: linear-gradient(135deg, #BC4749, #D62828);
}
```

## 📝 Usage Guidelines

### When to Use Each Color

**Red Accent (#C17767):**
- ✅ ALL action buttons (Sign In, Sign Up, Submit, etc.)
- ✅ Primary CTAs
- ✅ Active navigation items
- ✅ Focus states
- ✅ Interactive elements

**Dark Sage (#6A994E):**
- ✅ Profit indicators
- ✅ Positive percentage changes
- ✅ BUY signals
- ✅ Success states

**Gold (#E5B960):**
- ✅ HOLD signals
- ✅ Rewards and XP
- ✅ Achievements
- ✅ Neutral states
- ✅ Highlights

**Terracotta (#BC4749):**
- ✅ Loss indicators
- ✅ Negative percentage changes
- ✅ SELL signals
- ✅ Danger/warning states
- ✅ Error messages

**Light/Medium Sage (#A7C4A0, #B8C9A8):**
- ✅ Card backgrounds
- ✅ Surface elements
- ✅ Subtle backgrounds
- ✅ Dividers

## 🔄 Migration Checklist

- [x] Button component updated to red accent
- [x] All authentication buttons → red accent
- [x] Dashboard buttons → red accent
- [x] Error boundary button → red accent
- [x] HOLD badge → gold
- [x] CSS variables updated
- [x] Focus rings → red accent
- [ ] Navigation active states → red accent
- [ ] All remaining buttons → red accent

## 🚨 Critical: Restart Dev Server

After all changes:
```bash
cd frontend
rm -rf .next
npm run dev
```

## 🎯 Design Philosophy

**"Sage & Gold with Red Accent Actions"**

- Earthy greens for growth and profit
- Golden harvest for rewards and neutral states
- Terracotta risk signals for caution
- Red accent for all user actions (mature and calming)
- Ideal for long-term portfolio views

---

**Status**: All buttons now use red accent (#C17767), HOLD uses gold (#E5B960)
