import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/config/theme';
import { MockAuthProvider } from '@/contexts/MockAuthContext';

import Landing from '@/pages/Landing';
import Dashboard from '@/pages/Dashboard';
import Learning from '@/pages/Learning';
import Interview from '@/pages/Interview';
import Assessment from '@/pages/Assessment';
import Profile from '@/pages/Profile';
import LanguageSelection from '@/pages/LanguageSelection';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MockAuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/language" element={<LanguageSelection />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </MockAuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;