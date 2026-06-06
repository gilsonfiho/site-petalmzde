// Paleta extraída da logo: roxo/lavanda profissional

export const colors = {
  purple: {
    50:  '#F5F0FF',
    100: '#EDE7F6',
    200: '#D8C8EE',
    300: '#C8B4E3',
    400: '#A97FCC',
    500: '#9B7EC8',   // roxo médio
    600: '#7B5EA7',   // roxo principal (texto da logo)
    700: '#5C3D8F',   // roxo escuro (sparkles da logo)
    800: '#3E2470',
    900: '#25134F',
  },
  lavender: {
    50:  '#FAF8FF',
    100: '#F5F0FF',
    200: '#EDE7F6',
    300: '#E1D5F0',
  },
  gray: {
    50:  '#FAFAFA',
    100: '#F5F5F5',
    200: '#E5E5E5',
    300: '#D4D4D4',
    400: '#A3A3A3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
};

export const gradients = {
  hero:    'linear-gradient(135deg, #5C3D8F 0%, #7B5EA7 50%, #A97FCC 100%)',
  card:    'linear-gradient(135deg, #F5F0FF 0%, #EDE7F6 100%)',
  button:  'linear-gradient(135deg, #7B5EA7 0%, #A97FCC 100%)',
  subtle:  'linear-gradient(180deg, #FAF8FF 0%, #F5F0FF 100%)',
  dark:    'linear-gradient(135deg, #25134F 0%, #3E2470 100%)',
};

export const shadows = {
  sm:   '0 1px 3px rgba(91,61,143,0.08)',
  md:   '0 4px 16px rgba(91,61,143,0.12)',
  lg:   '0 8px 32px rgba(91,61,143,0.18)',
  card: '0 2px 12px rgba(0,0,0,0.07)',
  glow: '0 0 24px rgba(123,94,167,0.35)',
};

export const themeConfig = {
  palette: {
    mode: 'light',
    primary:    { main: colors.purple[600], contrastText: '#FFFFFF' },
    secondary:  { main: colors.purple[400], contrastText: '#FFFFFF' },
    background: { default: '#FAF8FF', paper: '#FFFFFF' },
    text:       { primary: colors.gray[900], secondary: colors.gray[600] },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    button:     { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 14 },
};
