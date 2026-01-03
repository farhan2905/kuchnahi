# Mobile Responsiveness Fix Plan

## Issues Identified

### 1. Hero Component - "Scroll to Explore" Button Centering
**Location:** `frontend/components/Hero.tsx:104-106`

**Problem:** The "Scroll to explore" text is not centered on mobile devices.

**Root Causes:**
- Z-index conflicts with the rotating ferris wheel images
- The ferris wheel images (z-20) may be overlapping the scroll text
- Container positioning may be affected by the large ferris wheel container (80vmin × 80vmin)

**Solution:**
- Increase z-index of the "Scroll to explore" element to ensure it's above the ferris wheel
- Add proper mobile-specific positioning adjustments
- Ensure the text has a background or backdrop for better visibility if needed

---

### 2. WeAre Component - Image Expansion Not Working on Mobile
**Location:** `frontend/components/WeAre.tsx:14-15`

**Problem:** The image expanding animation while scrolling is not functioning properly on mobile devices.

**Root Causes:**
1. **Layout Issue:** The side-by-side layout with "We are" and "Kuchnahi." text on either side of the image doesn't work on mobile screens
2. **Scroll Progress:** The scroll progress thresholds [0.2, 0.6] may not align with mobile scrolling behavior
3. **Container Height:** The 400vh container may be too tall for mobile viewports
4. **Viewport Units:** While vw/vh should work, the expansion range may be too aggressive for mobile

**Solutions:**

#### A. Layout Restructuring for Mobile
- **Desktop:** Side-by-side layout (We are | Image | Kuchnahi.)
- **Mobile:** Stacked vertical layout (We are → Image → Kuchnahi.)
- Use responsive Tailwind classes to switch layouts based on screen size

#### B. Adjusted Scroll Progress for Mobile
- Desktop thresholds: [0.2, 0.6] for expansion
- Mobile thresholds: [0.1, 0.5] for faster, more noticeable expansion
- Adjust container height based on viewport (400vh for desktop, 300vh for mobile)

#### C. Optimized Viewport Units for Mobile
- Desktop: 15vw → 85vw width, 20vh → 50vh height
- Mobile: 80vw → 95vw width, 25vh → 60vh height (more vertical space)
- Adjust starting size to be larger on mobile for better visibility

#### D. Text Positioning Adjustments
- **Desktop:** Keep current behavior - text moves horizontally toward the image (no changes)
- **Mobile:** Text moves vertically as image expands
  - "We are" text moves up
  - "Kuchnahi." text moves down
  - Text fades slightly as image expands
- Adjust opacity and transform values for mobile
- **Mobile Font Size:** Reduce font size on phones for better readability
  - Current: text-4xl md:text-6xl lg:text-8xl
  - Adjusted: text-2xl sm:text-3xl md:text-6xl lg:text-8xl

---

## Implementation Plan

### Step 1: Fix Hero Component Scroll Button
- Add higher z-index to "Scroll to explore" element
- Ensure proper centering with flexbox
- Add mobile-specific adjustments if needed

### Step 2: Restructure WeAre Component Layout
- Implement responsive layout switching using Tailwind breakpoints
- Desktop: `flex-row` with gap
- Mobile: `flex-col` with vertical stacking

### Step 3: Create Mobile-Specific Scroll Progress
- Use conditional logic or separate transforms for mobile vs desktop
- Adjust scroll thresholds for mobile devices
- Optimize animation timing for touch scrolling

### Step 4: Adjust Viewport Units for Mobile
- Create separate width/height transforms for mobile
- Ensure image is visible and expands properly on small screens
- Adjust border radius for mobile-friendly appearance

### Step 5: Optimize Text Animations
- Desktop: Horizontal movement (x-axis)
- Mobile: Vertical movement (y-axis) or fade only
- Adjust opacity transitions for better mobile UX

### Step 6: Test and Refine
- Test on actual mobile devices or browser dev tools
- Verify scroll animation triggers correctly
- Ensure all elements are properly aligned and visible
- Fine-tune thresholds and values based on testing

---

## Technical Details

### Responsive Breakpoints
- **Mobile:** < 768px (sm: breakpoint)
- **Tablet:** 768px - 1024px (md: breakpoint)
- **Desktop:** > 1024px (lg: breakpoint)

### Key Changes Required

#### Hero.tsx
```typescript
// Line 104-106: Update scroll text styling
<div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gray-400 text-sm animate-bounce z-50">
  Scroll to explore
</div>
```

#### WeAre.tsx
```typescript
// Mobile layout structure with responsive font sizes
<div className="flex flex-col md:flex-row items-center justify-center w-full relative gap-4 md:gap-12">
  {/* "We are" text */}
  <motion.h2 className="text-2xl sm:text-3xl md:text-6xl lg:text-8xl font-bold text-black whitespace-nowrap z-10 tracking-tighter">
    We are
  </motion.h2>
  
  {/* Image container */}
  <motion.div className="relative overflow-hidden z-20 shadow-2xl bg-black border-4 border-white">
    {/* Image content */}
  </motion.div>
  
  {/* "Kuchnahi." text */}
  <motion.h2 className="text-2xl sm:text-3xl md:text-6xl lg:text-8xl font-bold text-black whitespace-nowrap z-10 tracking-tighter">
    Kuchnahi.
  </motion.h2>
</div>

// Mobile-specific vertical text movement
// Desktop: Horizontal movement (x-axis)
const weAreX = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "10%"]);
const kuchnahiX = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "-10%"]);

// Mobile: Vertical movement (y-axis)
const weAreY = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "-20%"]);
const kuchnahiY = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "20%"]);
```

### Scroll Progress Adjustments
- Mobile: Faster expansion with lower thresholds
- Desktop: More gradual expansion with higher thresholds
- Consider using `useMediaQuery` or CSS media queries for responsive transforms

---

## Success Criteria

✅ "Scroll to explore" button is perfectly centered on all mobile devices
✅ Image expands smoothly while scrolling on mobile
✅ Layout adapts properly between desktop (side-by-side) and mobile (stacked)
✅ Text animations work appropriately for each screen size
✅ Scroll progress triggers at the right moments on mobile
✅ All elements remain visible and accessible on mobile screens
✅ Performance remains smooth during scroll animations

---

## Notes

- The ferris wheel in Hero.tsx is 80vmin × 80vmin, which takes up significant space on mobile
- Consider reducing ferris wheel size on mobile to prevent overlap issues
- The WeAre section uses a 400vh container which may need adjustment for mobile
- Test on multiple devices to ensure consistent behavior across screen sizes
