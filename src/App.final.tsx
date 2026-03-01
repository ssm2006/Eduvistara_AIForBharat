import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/config/theme';
import { MockAuthProvider } from '@/contexts/MockAuthContext';

// Import all pages (excluding Interview for now)
import Landing from '@/pages/Landing';
import Dashboard from '@/pages/Dashboard';
import Learning from '@/pages/Learning';
import Assessment from '@/pages/Assessment';
import Profile from '@/pages/Profile';
import LanguageSelection from '@/pages/LanguageSelection';

// App with working pages (Interview excluded temporarily)
function App() {
  console.log('App.final.tsx loaded - 5 modules working!');
  
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
