// =============================================================================
// APP COLOR SCHEME CONFIGURATION
// =============================================================================
// 
// To change the entire app's color scheme, simply modify the values below:
// 
// Examples:
// - For blue theme: change 'yellow' to 'blue' in all color values
// - For green theme: change 'yellow' to 'green' in all color values
// - For purple theme: change 'yellow' to 'purple' in all color values
// - For red theme: change 'yellow' to 'red' in all color values
//
// Available color options: blue, green, purple, red, orange, pink, indigo, teal, cyan, emerald, violet, fuchsia, rose, amber, lime, sky, slate, gray, zinc, neutral, stone
//
// =============================================================================

// Primary brand color (used throughout the app)
export const BRAND_COLOR = 'yellow' as const;

// Color configuration object
export const APP_COLORS = {
  // Primary brand colors
  primary: {
    light: `${BRAND_COLOR}-500`,
    dark: `${BRAND_COLOR}-400`,
    hover: `${BRAND_COLOR}-400`,
    text: 'black',
    border: `${BRAND_COLOR}-400`,
    borderLight: `${BRAND_COLOR}-500/30`,
    background: `${BRAND_COLOR}-500/10`,
    backgroundLight: `${BRAND_COLOR}-500/5`,
  },
  
  // Button colors
  button: {
    primary: `bg-${BRAND_COLOR}-500 hover:bg-${BRAND_COLOR}-400 text-black`,
    outline: `hover:bg-${BRAND_COLOR}-500 hover:text-black`,
    ghost: `hover:bg-${BRAND_COLOR}-500 hover:text-black`,
    link: `hover:text-${BRAND_COLOR}-500`,
  },
  
  // Border colors
  border: {
    primary: `border-${BRAND_COLOR}-500/30`,
    thick: `border-4 border-${BRAND_COLOR}-500/30`,
    button: `border-2 border-${BRAND_COLOR}-400`,
  },
  
  // Background colors
  background: {
    primary: `bg-${BRAND_COLOR}-500/10`,
    secondary: `bg-${BRAND_COLOR}-500/5`,
    gradient: `bg-gradient-to-br from-${BRAND_COLOR}-500/10 via-background to-${BRAND_COLOR}-500/5`,
  },
  
  // Text colors
  text: {
    primary: `text-${BRAND_COLOR}-500`,
    hover: `hover:text-${BRAND_COLOR}-500`,
  },
  
  // Shadow colors
  shadow: {
    primary: `shadow-lg hover:shadow-xl`,
  },
} as const;

// Helper function to get color classes
export const getColorClasses = (type: keyof typeof APP_COLORS, variant?: string) => {
  if (variant && APP_COLORS[type] && typeof APP_COLORS[type] === 'object' && variant in APP_COLORS[type]) {
    return APP_COLORS[type][variant as keyof typeof APP_COLORS[typeof type]];
  }
  return APP_COLORS[type];
};

// Quick color change function for AI assistance
export const changeAppColor = (newColor: string) => {
  console.log(`To change the app color to ${newColor}, replace all instances of '${BRAND_COLOR}' with '${newColor}' in this file.`);
  console.log(`Example: Change 'yellow' to '${newColor}' in the BRAND_COLOR constant above.`);
}; 