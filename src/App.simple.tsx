import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Typography, Button, Container } from '@mui/material';
import theme from '@/config/theme';

// Simple test component
function TestPage() {
  return (
    <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
      <Typography variant="h2" gutterBottom>
        ✅ EduVistara is Working!
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        The app is loading successfully. Firebase and i18n are configured.
      </Typography>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" size="large" href="/">
          Go to Full App
        </Button>
      </Box>
    </Container>
  );
}

function AppSimple() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="*" element={<TestPage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default AppSimple;
