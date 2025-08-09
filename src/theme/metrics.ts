import { Dimensions, Platform, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

// Device dimensions
const metrics = {
  // Screen dimensions
  screenWidth: width,
  screenHeight: height,
  
  // Status bar height
  statusBarHeight: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight || 0,
  
  // Common spacing
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  
  // Common border radius
  borderRadius: {
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 24,
    round: 9999,
  },
  
  // Common padding
  padding: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  
  // Common margin
  margin: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 40,
  },
  
  // Responsive scaling functions
  scale: {
    // Scale a size based on screen width
    width: (size: number) => (width / 375) * size,
    
    // Scale a size based on screen height
    height: (size: number) => (height / 812) * size,
    
    // Scale a font size based on screen width
    font: (size: number) => {
      const scale = width / 375;
      const newSize = size * scale;
      return Math.round(newSize);
    },
  },
  
  // Common component sizes
  components: {
    button: {
      height: 48,
      borderRadius: 8,
    },
    input: {
      height: 48,
      borderRadius: 8,
    },
    card: {
      borderRadius: 12,
      padding: 16,
    },
  },
  
  // Common icon sizes
  icons: {
    xs: 16,
    s: 24,
    m: 32,
    l: 40,
    xl: 48,
  },
};

export default metrics; 