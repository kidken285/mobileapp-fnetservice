// App Theme Colors
export const Colors = {
  // Background Colors
  background: '#1B1B1B',
  surface: '#2D2D2D',
  surfaceVariant: '#2D2D2D',

  // Primary Colors
  primary: '#8EF469',
  onPrimary: '#1B1B1B',

  // Secondary Colors
  secondary: '#11A4FF',
  onSecondary: '#FFFFFF',

  // Error Colors
  error: '#E74444',
  onError: '#FFFFFF',

  // Text Colors
  onBackground: '#FFFFFF',
  onSurface: '#FFFFFF',
  onSurfaceVariant: '#A2A2A2',

  // Border & Outline Colors
  outline: '#3D3D3D',
  outlineVariant: '#3D3D3D',

  // Additional Semantic Colors
  success: '#8EF469',
  warning: '#FFD432',
  info: '#11A4FF',

  // Grayscale
  white: '#FFFFFF',
  black: '#000',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },

  // Social Colors
  facebook: '#1877F2',
  google: '#4285F4',
  apple: '#000000',

  bg: '#1B1B1B',
  stroke: '#3D3D3D',
  dark_text: '#606060',
  gray_text: '#A2A2A2',
  solid: {
    red: '#E74444',
    blue: '#11A4FF',
    green: '#74FF41',
    gaming_green: '#8EF469',
    purple: '#9C55FF',
    pink: '#FF6AF0',
    organge: '#FF7811',
    yellow1: '#FFFF57',
    yellow2: '#FFD432',
  },
} as const;

// Color Aliases for easier usage
export const AppColors = {
  ...Colors,
  text: {
    primary: Colors.onBackground,
    secondary: Colors.onSurfaceVariant,
    inverse: Colors.onPrimary,
    error: Colors.error,
  },
  button: {
    primary: Colors.primary,
    secondary: Colors.secondary,
    success: Colors.success,
    danger: Colors.error,
  },
  border: {
    default: Colors.outline,
    focus: Colors.primary,
    error: Colors.error,
  },
} as const;

export const GradientColor = {} as const;
