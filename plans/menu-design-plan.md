# Menu Design & Implementation Plan

## Current Issue Analysis

**Problem Identified:**
- The Header component has a hamburger menu button (lines 8-11 in Header.tsx) but no functionality
- No state management for menu open/close
- No menu overlay component exists
- The button is purely visual with no onClick handler

## UI Aesthetic Analysis

Based on review of Hero, WeAre, Work, and Services components:

### Design Language
1. **Typography**:
   - Large, bold headings (text-7xl to text-9xl)
   - `tracking-tighter` for tight letter spacing
   - Mix of large display text and smaller body text

2. **Color Palette**:
   - Primary: Black (#000000) and White (#FFFFFF)
   - Background: #F9F9F7 (off-white/cream)
   - Accents: Gradients (blue-500 → orange-500, orange-500 → yellow-500)

3. **Animations**:
   - Framer Motion for smooth transitions
   - Scale effects on hover (group-hover:scale-105)
   - Opacity transitions
   - Staggered animations for lists

4. **Shapes & Borders**:
   - Rounded corners (rounded-2xl, rounded-3xl)
   - border-4 border-white on images
   - Circle elements (rounded-full)

5. **Spacing**:
   - Generous padding (py-32, px-6 md:px-12)
   - Large gaps (gap-8, gap-12, gap-24)
   - Vertical rhythm with space-y-48

6. **Visual Effects**:
   - `mix-blend-difference` for text visibility
   - Shadows (shadow-xl, shadow-2xl) for depth
   - Grayscale to color transitions
   - Blur effects

## Proposed Menu Design

### Visual Style
- **Full-screen overlay** covering entire viewport
- **Background**: Black (#000000) or dark gray (#111111)
- **Text**: White (#FFFFFF) with high contrast
- **Typography**: Large, bold text matching site aesthetic (text-5xl to text-7xl)
- **Animation**: Smooth slide/fade in from right or scale up from center

### Menu Structure
```
┌─────────────────────────────────┐
│  Kuchnahi.              [Close] │  ← Logo + Close button
├─────────────────────────────────┤
│                                 │
│  Home                           │  ← Menu items (large text)
│  Work                           │
│  Services                       │
│  About                          │
│  Contact                        │
│                                 │
│  ─────────────────              │  ← Divider
│                                 │
│  Let's work together            │  ← CTA text
│  hello@kuchnahi.com             │  ← Email/contact
│                                 │
│  [Social Icons]                 │  ← Social links
└─────────────────────────────────┘
```

### Animation Patterns

1. **Menu Open Animation**:
   - Overlay slides in from right (x: 100% → 0%) OR
   - Overlay scales up from center (scale: 0.8 → 1, opacity: 0 → 1)
   - Duration: 0.5-0.6s
   - Easing: cubic-bezier or ease-out

2. **Menu Items Animation**:
   - Staggered reveal (each item appears 0.1s after previous)
   - Slide in from right with opacity fade
   - Hover: Scale up slightly (scale-105), color change, or underline animation

3. **Close Animation**:
   - Reverse of open animation
   - Smooth exit

4. **Hamburger Button Animation**:
   - Transform to "X" when menu is open
   - Lines rotate and cross each other

## Implementation Details

### File: `frontend/components/Header.tsx`

**Changes Required:**

1. **Add State Management**:
   ```typescript
   const [isOpen, setIsOpen] = useState(false);
   ```

2. **Add onClick Handler**:
   ```typescript
   <button onClick={() => setIsOpen(!isOpen)} className="...">
   ```

3. **Animate Hamburger Button**:
   - Transform lines to "X" when `isOpen` is true
   - Use Framer Motion for smooth transition

### New File: `frontend/components/MenuOverlay.tsx`

**Component Structure:**

```typescript
'use client';

import { motion, AnimatePresence } from 'framer-motion';

const menuItems = [
  { name: 'Home', href: '#home' },
  { name: 'Work', href: '#work' },
  { name: 'Services', href: '#services' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

export default function MenuOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  // Menu overlay implementation
}
```

**Key Features:**

1. **Overlay Container**:
   - `fixed inset-0 z-50 bg-black`
   - `flex flex-col justify-center items-center`
   - Full viewport coverage

2. **Menu Items**:
   - Large text (text-5xl md:text-7xl)
   - `tracking-tighter` for tight spacing
   - Hover effects with Framer Motion
   - Staggered animation on open

3. **Close Button**:
   - Position: top-right or top-left
   - Animated "X" icon
   - Click to close menu

4. **Logo**:
   - "Kuchnahi." in white
   - Large, bold text
   - Positioned at top

5. **Contact Section** (optional):
   - Email address
   - Social media links
   - "Let's work together" CTA

### Animation Code Example

```typescript
const overlayVariants = {
  closed: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  open: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};

const itemVariants = {
  closed: {
    x: 50,
    opacity: 0,
    transition: { duration: 0.3 }
  },
  open: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 }
  }
};
```

## Menu Items & Links

### Primary Navigation
1. **Home** - Scroll to top/Hero section
2. **Work** - Scroll to Work section
3. **Services** - Scroll to Services section
4. **About** - Scroll to WeAre section
5. **Contact** - Scroll to Footer or contact form

### Secondary Elements
- Email: hello@kuchnahi.com
- Social links (Instagram, Twitter, LinkedIn, etc.)
- "Let's work together" CTA button

## Responsive Behavior

### Mobile (< 768px)
- Full-screen overlay
- Menu items: text-4xl to text-5xl
- Single column layout
- Touch-friendly tap targets

### Tablet (768px - 1024px)
- Full-screen overlay
- Menu items: text-5xl to text-6xl
- Single column layout

### Desktop (> 1024px)
- Full-screen overlay
- Menu items: text-6xl to text-7xl
- Single column layout
- More spacious spacing

## Accessibility Considerations

1. **Keyboard Navigation**:
   - Tab through menu items
   - Enter/Space to select
   - Escape to close menu

2. **ARIA Attributes**:
   - `aria-expanded` on menu button
   - `aria-label` for accessibility
   - `role="navigation"` for menu

3. **Focus Management**:
   - Focus trap when menu is open
   - Return focus to button when closed

4. **Screen Reader Support**:
   - Announce menu open/close
   - Proper link descriptions

## Implementation Steps

1. ✅ Analyze current Header component
2. ✅ Review UI aesthetic from other components
3. ⏳ Create MenuOverlay component
4. ⏳ Update Header component with state and onClick
5. ⏳ Add hamburger button animation
6. ⏳ Implement menu overlay with animations
7. ⏳ Add menu items with staggered reveal
8. ⏳ Add close button functionality
9. ⏳ Test responsive behavior
10. ⏳ Add accessibility features
11. ⏳ Test on different devices

## Testing Checklist

- [ ] Menu opens when hamburger button is clicked
- [ ] Menu closes when close button is clicked
- [ ] Menu closes when clicking outside
- [ ] Menu closes when pressing Escape key
- [ ] Menu items link to correct sections
- [ ] Smooth scroll to sections
- [ ] Animations are smooth and performant
- [ ] Works on mobile devices
- [ ] Works on tablet devices
- [ ] Works on desktop devices
- [ ] Keyboard navigation works
- [ ] Screen reader announces menu state
- [ ] Focus management is correct

## Expected Outcome

- A fully functional, aesthetically matching full-screen menu
- Smooth animations that match the site's design language
- Responsive behavior across all devices
- Accessible to all users
- Professional, polished user experience
