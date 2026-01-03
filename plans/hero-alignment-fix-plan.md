# Hero Component Alignment Fix Plan

## Current Alignment Issues Identified

### 1. Circular Ring Container (Lines 32-72)
**Problem**: The circular ring container uses `absolute w-[80vmin] h-[80vmin]` but lacks proper centering classes.

**Current Code**:
```tsx
<motion.div
  className="absolute w-[80vmin] h-[80vmin]"
  animate={{ rotate: 360 }}
  ...
>
```

**Issue**: Absolute positioned element without `top`, `left`, `right`, or `bottom` positioning classes. It may not be perfectly centered in the viewport.

**Fix Required**: Add centering classes:
```tsx
className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vmin] h-[80vmin]"
```

### 2. Central Text Container (Lines 75-102)
**Current Structure**:
```tsx
<div className="z-10 text-center relative">
  <p className="text-gray-500 text-lg md:text-xl font-medium mb-4 uppercase tracking-widest">We create</p>
  <div className="h-24 md:h-32 overflow-hidden flex items-center justify-center">
    <AnimatePresence mode="wait">
      <motion.h2 ...>
        {texts[textIndex]}
      </motion.h2>
    </AnimatePresence>
  </div>
  
  <motion.div className="mt-12" ...>
    <button ...>Learn more</button>
  </motion.div>
</div>
```

**Analysis**: 
- Parent section has `flex flex-col items-center justify-center`
- Text container has `text-center relative`
- This should work, but the absolute positioned ring might interfere

**Potential Issues**:
- Text might not be perfectly vertically centered due to varying heights
- The `h-24 md:h-32` on the animated text container might cause alignment issues
- Button margin `mt-12` might create uneven spacing

**Fix Required**:
- Ensure consistent vertical alignment
- Consider using flexbox for better control
- Add proper spacing between elements

### 3. Scroll Indicator (Lines 104-106)
**Current Code**:
```tsx
<div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gray-400 text-sm animate-bounce">
  Scroll to explore
</div>
```

**Analysis**: This looks correctly positioned with `left-1/2 -translate-x-1/2` for horizontal centering.

**Potential Issue**: `bottom-12` (3rem) might not be the optimal distance from the bottom edge.

## Proposed Fixes

### Fix 1: Perfectly Center Circular Ring
Add centering classes to the ring container:
```tsx
className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vmin] h-[80vmin]"
```

### Fix 2: Improve Text Alignment
Restructure the central text container for better alignment:
```tsx
<div className="z-10 flex flex-col items-center justify-center gap-6 md:gap-8">
  <p className="text-gray-500 text-lg md:text-xl font-medium uppercase tracking-widest">
    We create
  </p>
  
  <div className="h-20 md:h-28 overflow-hidden flex items-center justify-center">
    <AnimatePresence mode="wait">
      <motion.h2
        key={textIndex}
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-black text-center"
      >
        {texts[textIndex]}
      </motion.h2>
    </AnimatePresence>
  </div>
  
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
  >
    <button className="bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform cursor-hover shadow-lg">
      Learn more
    </button>
  </motion.div>
</div>
```

**Changes**:
- Added `flex flex-col items-center justify-center` to the container
- Replaced `mb-4` and `mt-12` with `gap-6 md:gap-8` for consistent spacing
- Reduced height of text container from `h-24 md:h-32` to `h-20 md:h-28` for tighter alignment
- Added `text-center` to the h2 element for extra safety

### Fix 3: Optimize Scroll Indicator Position
Adjust bottom position for better visual balance:
```tsx
<div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 text-gray-400 text-sm animate-bounce">
  Scroll to explore
</div>
```

**Change**: Added responsive bottom position (`bottom-8 md:bottom-12`) for better mobile experience.

## Expected Outcome

After these fixes:
1. ✅ Circular ring will be perfectly centered in the viewport
2. ✅ Text elements will have consistent vertical spacing
3. ✅ "We create", animated text, and "Learn more" button will be perfectly aligned
4. ✅ Scroll indicator will be properly positioned
5. ✅ All elements will maintain pixel-perfect alignment across different screen sizes

## Testing Checklist

- [ ] Circular ring is perfectly centered (horizontal and vertical)
- [ ] "We create" text is centered
- [ ] Animated text is centered and doesn't jump
- [ ] "Learn more" button is centered
- [ ] Spacing between text elements is consistent
- [ ] Scroll indicator is centered horizontally
- [ ] All elements align correctly on mobile (320px - 768px)
- [ ] All elements align correctly on tablet (768px - 1024px)
- [ ] All elements align correctly on desktop (1024px+)
- [ ] No visual misalignment during animations
- [ ] Text doesn't overflow or get cut off
