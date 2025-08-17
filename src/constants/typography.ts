// Typography Constants
export const Typography = {
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    heading: 32,
    display: 40,
  },

  // Line heights
  lineHeight: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 28,
    xl: 32,
    xxl: 36,
    xxxl: 40,
    heading: 44,
    display: 52,
  },

  // Font weights (for use with Inter font)
  fontWeight: {
    light: '300',
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
  },

  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
    widest: 2,
  },
} as const;

// Typography presets for common use cases
export const TypographyPresets = {
  heading1: {
    fontSize: Typography.fontSize.display,
    lineHeight: Typography.lineHeight.display,
    fontWeight: Typography.fontWeight.bold,
  },
  heading2: {
    fontSize: Typography.fontSize.heading,
    lineHeight: Typography.lineHeight.heading,
    fontWeight: Typography.fontWeight.bold,
  },
  heading3: {
    fontSize: Typography.fontSize.xxxl,
    lineHeight: Typography.lineHeight.xxxl,
    fontWeight: Typography.fontWeight.semiBold,
  },
  body: {
    fontSize: Typography.fontSize.md,
    lineHeight: Typography.lineHeight.md,
    fontWeight: Typography.fontWeight.regular,
  },
  caption: {
    fontSize: Typography.fontSize.sm,
    lineHeight: Typography.lineHeight.sm,
    fontWeight: Typography.fontWeight.regular,
  },
  button: {
    fontSize: Typography.fontSize.md,
    lineHeight: Typography.lineHeight.md,
    fontWeight: Typography.fontWeight.semiBold,
  },
} as const;
