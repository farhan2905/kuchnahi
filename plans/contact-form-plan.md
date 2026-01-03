# Contact Form Implementation Plan

## Current State Analysis

### Backend ✅ (Already Implemented)
- **Prisma Schema**: Inquiry model exists (email, message, status, timestamps)
- **Controller**: contactController.ts with submitInquiry, getAllInquiries, updateInquiryStatus
- **Routes**: /api/contact endpoints (POST, GET, PATCH)
- **Validation**: validateContactForm middleware exists
- **Database**: PostgreSQL configured

### Frontend API ✅ (Already Implemented)
- **API Function**: submitInquiry() in frontend/lib/api.ts
- **Interface**: InquiryInput (email, message)
- **Base URL**: Configured with NEXT_PUBLIC_API_URL

### Frontend UI ❌ (Missing)
- **Contact Form Component**: Doesn't exist
- **Contact Modal Component**: Doesn't exist
- **Button Functionality**: "Start now" button has no onClick handler
- **Footer Contact**: No contact form in footer

## Current Buttons to Fix

### 1. "Start now" Button (Services.tsx, line 88-90)
**Location**: `frontend/components/Services.tsx`
**Current State**: Static button with no functionality
**Action Required**: Open contact modal

### 2. "Learn more" Button (Hero.tsx, line 98-100)
**Location**: `frontend/components/Hero.tsx`
**Current State**: Static button with no functionality
**Action Required**: Could scroll to Services section or open contact modal

## Proposed Solution

### Design Philosophy
Match the existing UI aesthetic:
- Large, bold typography
- Black and white color scheme
- Rounded corners (rounded-full, rounded-2xl, rounded-3xl)
- Smooth animations with Framer Motion
- Generous spacing and padding
- Minimalist, clean design
- Hover effects (scale, color transitions)

### Component Architecture

```
ContactModal (New)
├── Overlay (backdrop blur)
├── Modal Container
│   ├── Header (Title + Close Button)
│   ├── ContactForm
│   │   ├── Name Input
│   │   ├── Email Input
│   │   ├── Message Textarea
│   │   ├── Submit Button
│   └── Success Message (after submission)
```

### ContactModal Component Design

**Visual Style:**
- Full-screen overlay with backdrop blur
- Centered modal container
- Black background with white text
- Large title: "Get in touch" or "Let's talk"
- Rounded corners: rounded-3xl
- Smooth slide-up animation
- Close button with "X" icon

**Form Fields:**
1. **Name** (optional, but good for personalization)
   - Large input field
   - White background, black text
   - Rounded-full or rounded-2xl
   - Focus state with border highlight

2. **Email** (required)
   - Large input field
   - White background, black text
   - Rounded-full or rounded-2xl
   - Focus state with border highlight
   - Email validation

3. **Message** (required)
   - Large textarea
   - White background, black text
   - Rounded-2xl or rounded-3xl
   - Minimum height: 150px
   - Focus state with border highlight

4. **Submit Button**
   - Black background, white text
   - Rounded-full
   - Large padding
   - Bold text
   - Hover: scale-105
   - Loading state with spinner

**Success State:**
- Replace form with success message
- Large checkmark icon
- "Thank you!" or "Message sent!"
- "We'll get back to you soon"
- Auto-close after 3 seconds or button to close

## Implementation Details

### File: `frontend/components/ContactModal.tsx`

**Component Structure:**
```typescript
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { submitInquiry } from '@/lib/api';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Form submission logic
  // Validation
  // Animation variants
}
```

**Animation Variants:**
```typescript
const overlayVariants = {
  closed: { opacity: 0 },
  open: { opacity: 1 }
};

const modalVariants = {
  closed: {
    y: '100%',
    opacity: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  },
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  }
};
```

### File: `frontend/components/Services.tsx` (Update)

**Changes Required:**
1. Add state for modal: `const [isContactModalOpen, setIsContactModalOpen] = useState(false);`
2. Import ContactModal component
3. Add onClick handler to "Start now" button
4. Render ContactModal component

**Updated Button:**
```tsx
<button
  onClick={() => setIsContactModalOpen(true)}
  className="mt-8 bg-white text-black px-6 py-3 rounded-full font-bold self-start group-hover:scale-105 transition-transform cursor-pointer"
>
  Start now
</button>
```

### File: `frontend/components/Hero.tsx` (Optional Update)

**Option 1**: Make "Learn more" scroll to Services section
**Option 2**: Make "Learn more" open contact modal

**Recommended**: Option 1 (scroll to Services) as it's more informational

### File: `frontend/components/Footer.tsx` (Optional Enhancement)

**Add Contact Form Section:**
- Email input field
- Message textarea
- Submit button
- "Let's work together" heading
- Matches Services section aesthetic

**Alternative**: Keep footer simple, rely on modal for contact

## Form Validation

**Client-side Validation:**
- Email format validation (regex)
- Message minimum length (10 characters)
- Name validation (if provided)
- Required field checks

**Error Display:**
- Inline error messages below fields
- Red color for errors
- Shake animation on invalid submission

**Backend Validation:**
- Already implemented in validateContactForm middleware
- Email format validation
- Message length validation

## Responsive Behavior

### Mobile (< 768px)
- Full-screen modal
- Form fields: text-lg
- Button: text-base
- Padding: px-6 py-4
- Modal width: 90%

### Tablet (768px - 1024px)
- Centered modal with max-width
- Form fields: text-xl
- Button: text-lg
- Padding: px-8 py-6
- Modal width: 80%, max-w-lg

### Desktop (> 1024px)
- Centered modal with fixed width
- Form fields: text-xl
- Button: text-lg
- Padding: px-12 py-8
- Modal width: max-w-xl or max-w-2xl

## Accessibility

**Keyboard Navigation:**
- Tab through form fields
- Enter to submit
- Escape to close modal
- Focus trap when modal is open

**ARIA Attributes:**
- `aria-modal="true"` on modal
- `aria-label` for close button
- `aria-describedby` for error messages
- `role="dialog"` on modal container

**Screen Reader Support:**
- Announce modal open/close
- Read error messages
- Read success message

## Implementation Steps

1. ✅ Analyze backend and API (already done)
2. ⏳ Create ContactModal component
3. ⏳ Add form fields with validation
4. ⏳ Implement form submission logic
5. ⏳ Add success/error states
6. ⏳ Update Services.tsx with modal integration
7. ⏳ Add onClick handler to "Start now" button
8. ⏳ Test form submission
9. ⏳ Test responsive behavior
10. ⏳ Test accessibility

## Testing Checklist

- [ ] Modal opens when "Start now" is clicked
- [ ] Modal closes when close button is clicked
- [ ] Modal closes when clicking outside
- [ ] Modal closes when pressing Escape key
- [ ] Form validates email format
- [ ] Form validates message length
- [ ] Form submits successfully
- [ ] Success message displays after submission
- [ ] Error message displays on failure
- [ ] Loading state shows during submission
- [ ] Form resets after successful submission
- [ ] Works on mobile devices
- [ ] Works on tablet devices
- [ ] Works on desktop devices
- [ ] Keyboard navigation works
- [ ] Screen reader announces modal state
- [ ] Focus management is correct

## Expected Outcome

- Fully functional contact form matching the site's aesthetic
- Smooth animations and transitions
- Proper validation and error handling
- Responsive design across all devices
- Accessible to all users
- Integration with existing backend API
- Professional, polished user experience
