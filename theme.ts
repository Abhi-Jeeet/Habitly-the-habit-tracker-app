import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6366F1',
    secondary: '#F59E42',
    background: '#F8FAFC',
    surface: '#FFFFFF',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onBackground: '#22223B',
    onSurface: '#22223B',
    error: '#EF4444',
    outline: '#A5B4FC',
  },
  roundness: 10,
};
