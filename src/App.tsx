import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from '@/contexts/AuthContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AppStateProvider } from '@/contexts/AppStateContext';
import ErrorBoundary from '@/components/ErrorBoundary';
import AppRoutes from '@/routes';
import theme from '@/config/theme';

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LanguageProvider>
            <AuthProvider>
              <AppStateProvider>
                <AppRoutes />
              </AppStateProvider>
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
