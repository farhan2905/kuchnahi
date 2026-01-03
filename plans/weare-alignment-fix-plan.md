# WeAre Section Alignment & Spacing Fix Plan

## Current Issues Identified

1. **Insufficient spacing**: Text elements have only `mr-8` and `ml-8` margins, causing them to be too close to the image
2. **No border on image**: Unlike Hero section images (which have `border-4 border-white`), the WeAre image lacks a border
3. **Image expansion causes overlap**: Image expands from 20vw×30vh to 60vw×60vh, potentially colliding with text
4. **Text animation moves inward**: Text moves toward the image as it expands, increasing collision risk

## Proposed Changes

### 1. Increase Spacing Between Text and Image
- Change `mr-8` (2rem) to `mr-12` or `mr-16` (3-4rem) for "We are" text
- Change `ml-8` (2rem) to `ml-12` or `ml-16` (3-4rem) for "Kuchnahi." text
- Add responsive spacing: smaller on mobile, larger on desktop

### 2. Add Border to Image
- Add `border-4 border-white` class to the image container
- This matches the Hero component's style for consistency
- Add `shadow-2xl` for better visual separation (already present)

### 3. Adjust Image Expansion Range
- Current: 20vw×30vh → 60vw×60vh
- Proposed: 25vw×35vh → 55vw×55vh (slightly smaller max size to prevent overlap)
- Or keep max size but increase initial spacing

### 4. Modify Text Animation
- Reduce text movement distance to maintain better spacing
- Current: "We are" moves to 15%, "Kuchnahi." moves to -15%
- Proposed: Move to 10% and -10% respectively (less inward movement)
- Or maintain position while image expands around it

### 5. Ensure Proper Alignment
- Verify flexbox alignment: `items-center justify-center` (already present)
- Add `gap-8` or `gap-12` to the flex container for consistent spacing
- Ensure responsive behavior with proper breakpoints

## Implementation Details

### File to Modify: `frontend/components/WeAre.tsx`

**Key Changes:**

1. **Line 38-72**: Update the flex container and spacing
   - Add `gap-8` or `gap-12` to the flex container
   - Increase margin values on text elements
   - Add border to image container

2. **Lines 19-22**: Adjust text animation values
   - Reduce movement distance from 15% to 10%
   - Maintain opacity transitions

3. **Lines 14-15**: Adjust image expansion range (optional)
   - Fine-tune width/height transformation values

## Expected Outcome

- Text and image will have proper spacing at all scroll positions
- Image will have a white border matching Hero section style
- No overlap or collision between text and image during scroll animation
- Better visual alignment and professional appearance
- Consistent styling across components

## Testing Checklist

- [ ] Verify spacing on mobile devices
- [ ] Verify spacing on tablet devices
- [ ] Verify spacing on desktop devices
- [ ] Test scroll animation - no overlap occurs
- [ ] Verify border appears correctly on image
- [ ] Check that text remains readable during animation
- [ ] Ensure responsive behavior works smoothly
