# Design Tokens

Design tokens are the atomic values that make up the design system.

## Colors

### Primary Palette

```css
--primary: #2563eb         /* Blue-600 */
--primary-light: #3b82f6   /* Blue-500 */
--primary-dark: #1d4ed8    /* Blue-700 */
```

**Usage**: Primary actions, links, brand elements

### Secondary Palette

```css
--accent: #8b5cf6          /* Purple-500 */
--success: #10b981         /* Green-500 */
--warning: #f59e0b         /* Amber-500 */
--error: #ef4444           /* Red-500 */
```

### Neutral Palette

```css
--background: #fafafa      /* Gray-50 */
--foreground: #0a0a0a      /* Gray-950 */
--muted: #f3f4f6          /* Gray-100 */
--border: #e5e7eb          /* Gray-200 */
```

## Typography

### Font Family

```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

**Source**: Google Fonts (Inter variable font)

### Font Sizes

```css
--text-xs: 0.75rem      /* 12px */
--text-sm: 0.875rem     /* 14px */
--text-base: 1rem       /* 16px */
--text-lg: 1.125rem     /* 18px */
--text-xl: 1.25rem      /* 20px */
--text-2xl: 1.5rem      /* 24px */
--text-3xl: 1.875rem    /* 30px */
--text-4xl: 2.25rem     /* 36px */
--text-5xl: 3rem        /* 48px */
```

### Font Weights

```css
--font-normal: 400
--font-medium: 500
--font-semibold: 600
--font-bold: 700
```

### Letter Spacing

```css
--tracking-tight: -0.025em    /* Headings */
--tracking-normal: -0.011em   /* Body text */
```

### Line Heights

```css
--leading-tight: 1.2     /* Headings */
--leading-normal: 1.5    /* Body */
--leading-relaxed: 1.75  /* Long-form content */
```

## Spacing

Based on 4px (0.25rem) increments:

```css
--spacing-1: 0.25rem   /* 4px */
--spacing-2: 0.5rem    /* 8px */
--spacing-3: 0.75rem   /* 12px */
--spacing-4: 1rem      /* 16px */
--spacing-5: 1.25rem   /* 20px */
--spacing-6: 1.5rem    /* 24px */
--spacing-8: 2rem      /* 32px */
--spacing-10: 2.5rem   /* 40px */
--spacing-12: 3rem     /* 48px */
--spacing-16: 4rem     /* 64px */
```

## Border Radius

```css
--radius-sm: 0.25rem    /* 4px - Small elements */
--radius-md: 0.375rem   /* 6px - Inputs */
--radius-lg: 0.5rem     /* 8px - Buttons */
--radius-xl: 0.75rem    /* 12px */
--radius-2xl: 1rem      /* 16px - Cards */
--radius-full: 9999px   /* Badges, pills */
```

## Shadows

### Card Shadows

```css
--card-shadow:
  0 0 0 1px rgba(0, 0, 0, 0.03),
  0 2px 4px rgba(0, 0, 0, 0.05),
  0 12px 24px rgba(0, 0, 0, 0.05)

--card-shadow-hover:
  0 0 0 1px rgba(0, 0, 0, 0.03),
  0 8px 16px rgba(0, 0, 0, 0.08),
  0 24px 48px rgba(0, 0, 0, 0.08)
```

**Usage**: Modern borderless cards with soft depth

### Other Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05)
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1)
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1)
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15)
```

## Transitions

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1)
--transition-card: 500ms cubic-bezier(0.4, 0, 0.2, 1)
```

## Z-Index Scale

```css
--z-dropdown: 1000
--z-sticky: 1100
--z-fixed: 1200
--z-modal: 1300
--z-popover: 1400
--z-tooltip: 1500
--z-toast: 9999
```

## Breakpoints

```css
--screen-sm: 640px
--screen-md: 768px
--screen-lg: 1024px
--screen-xl: 1280px
--screen-2xl: 1536px
```

## Usage in Components

### Using CSS Variables

```tsx
// In component
<div style={{ boxShadow: 'var(--card-shadow)' }}>
  Content
</div>
```

### Using Tailwind Classes

```tsx
// Tailwind classes map to these tokens
<div className="rounded-2xl shadow-lg bg-white p-6">
  Content
</div>
```

### Custom Gradients

```css
/* Text gradient */
.gradient-text {
  background: linear-gradient(to right, var(--primary), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Background gradient */
.gradient-bg {
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
}
```

## Accessibility

### Color Contrast

All color combinations meet WCAG AA standards:
- Text on background: 4.5:1 minimum
- Large text: 3:1 minimum
- Interactive elements: 3:1 minimum

### Focus States

```css
--focus-ring: 0 0 0 2px var(--background), 0 0 0 4px var(--primary)
```

Applied to all interactive elements for keyboard navigation.
