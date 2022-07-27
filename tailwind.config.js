module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    colors: {
      'error': '#E8384D',            
      'success': '#07bc0c',
      'primary': '#01B7FF',
      'secondary': '#1a2045',
      'tertiary': '#7D36DC',
      'white': '#FFFFFF',
      'black': '#000',
      'formBg': '#F2EFF8',
      'divider': '#d9dada',
      'text': '#1B0740',
      'light': 'rgba(255,255,255,.5)',
      'transparent': 'transparent'
    },
    fontFamily: {
      'regular': ['Comfortaa_400Regular'],
      'medium': ['Comfortaa_500Medium'],
      'semiBold': ['Comfortaa_600SemiBold'],
      'bold': ['Comfortaa_700Bold'],
    }
  },
  plugins: [],
  corePlugins: require('tailwind-rn/unsupported-core-plugins'),
}
