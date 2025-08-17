// Spacing Constants
export const Spacing = {
  // Base spacing (8px system)
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 40,
  xxxl: 48,

  // Component specific spacing
  component: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginBottom: 24,
    borderRadius: 12,
  },

  // Screen spacing
  screen: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },

  // Button spacing
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 40,
  },

  // Input spacing
  input: {
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
} as const;
