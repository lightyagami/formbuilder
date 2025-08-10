import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useState } from 'react';
import { store } from './store';
import getTheme from './theme';
import { Button, Box } from '@mui/material';

import FormBuilder from './components/FormBuilder';
import MyForms from './components/MyForms';
import FormPreview from './components/FormPreview';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Provider store={store}>
      <ThemeProvider theme={getTheme(darkMode ? 'dark' : 'light')}>
        <CssBaseline />
        <Router>
          <Box
            sx={{
              position: 'fixed',
              top: 16,
              right: 16,
              zIndex: 1300,
            }}
          >
            <Button
              variant={darkMode ? 'contained' : 'outlined'}
              color="primary"
              onClick={() => setDarkMode(!darkMode)}
              sx={{
                borderRadius: '8px',
                boxShadow: darkMode
                  ? '0 4px 12px rgba(0,0,0,0.2)'
                  : '0 2px 6px rgba(0,0,0,0.1)',
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </Box>

          <Routes>
            <Route path="/create" element={<FormBuilder />} />
            <Route path="/myforms" element={<MyForms />} />
            <Route path="/preview" element={<FormPreview />} />
            <Route path="/" element={<MyForms />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
