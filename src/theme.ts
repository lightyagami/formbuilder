import { createTheme, ThemeOptions } from '@mui/material/styles';

const getTheme = (mode: 'light' | 'dark') => {
  const baseColors = {
    primary: {
      main: '#1976d2',
      light: '#63a4ff',
      dark: '#004ba0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f50057',
      light: '#ff5983',
      dark: '#c51162',
    },
  };

  const lightMode: ThemeOptions = {
    palette: {
      mode: 'light',
      ...baseColors,
      background: {
        default: '#f5f7fa',
        paper: '#ffffff',
      },
      text: {
        primary: '#2d3748',
        secondary: '#4a5568',
      },
    },
  };

  const darkMode: ThemeOptions = {
    palette: {
      mode: 'dark',
      ...baseColors,
      background: {
        default: '#1a202c',
        paper: '#2d3748',
      },
      text: {
        primary: '#edf2f7',
        secondary: '#a0aec0',
      },
    },
  };

  return createTheme({
    ...(mode === 'light' ? lightMode : darkMode),
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 700,
      },
      h6: {
        fontWeight: 600,
      },
      body1: {
        fontSize: '1rem',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            boxShadow: mode === 'light'
              ? '0 2px 4px rgba(0,0,0,0.1)'
              : '0 2px 4px rgba(0,0,0,0.4)',
            transition: 'all 0.2s ease',
            '&:hover': {
              boxShadow: mode === 'light'
                ? '0 4px 8px rgba(0,0,0,0.2)'
                : '0 4px 8px rgba(0,0,0,0.6)',
            },
            '&:active': {
              transform: 'scale(0.98)',
            },
            '&.Mui-disabled': {
              backgroundColor: '#4a5568',
              color: '#ffffff',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            marginBottom: '16px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: mode === 'light' ? '#ffffff' : '#2d3748',
              '&:hover fieldset': {
                borderColor: '#1976d2',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1976d2',
                boxShadow: '0 0 0 2px rgba(25, 118, 210, 0.2)',
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            border: '1px solid rgba(0,0,0,0.05)',
            transition: 'transform 0.2s ease-in-out',
            boxShadow: mode === 'light'
              ? '0 4px 12px rgba(0,0,0,0.1)'
              : '0 4px 12px rgba(0,0,0,0.5)',
            '&:hover': {
              transform: 'translateY(-4px)',
            },
          },
        },
      },
    },
  });
};

export default getTheme;
