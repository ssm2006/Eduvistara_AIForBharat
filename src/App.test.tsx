import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/config/theme';
import { MockAuthProvider } from '@/contexts/MockAuthContext';

// Import pages directly
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import Learning from '@/pages/Learning';
import Interview from '@/pages/Interview';
import Assessment from '@/pages/Assessment';
import Profile from '@/pages/Profile';
import LanguageSelection from '@/pages/LanguageSelection';

// Test app with mock auth - all pages accessible without Firebase
function App() {
  console.log('App.test.tsx loaded - Using mock auth!');
  
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MockAuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/language" element={<LanguageSelection />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </MockAuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
