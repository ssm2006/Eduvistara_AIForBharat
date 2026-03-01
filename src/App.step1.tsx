import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/config/theme';

// Import only Landing page first
import Landing from '@/pages/Landing';

// Step 1: Just landing page
function App() {
  console.log('App.step1.tsx loaded - Landing page only');
  
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="*" element={<Landing />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
