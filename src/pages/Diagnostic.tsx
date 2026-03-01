import { Box, Container, Typography, Card, CardContent, Alert } from '@mui/material';

const Diagnostic = () => {
  const envVars = {
    'VITE_FIREBASE_API_KEY': import.meta.env.VITE_FIREBASE_API_KEY ? '✓ Set' : '✗ Missing',
    'VITE_FIREBASE_AUTH_DOMAIN': import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '✓ Set' : '✗ Missing',
    'VITE_FIREBASE_PROJECT_ID': import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✓ Set' : '✗ Missing',
    'VITE_FIREBASE_STORAGE_BUCKET': import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? '✓ Set' : '✗ Missing',
    'VITE_FIREBASE_MESSAGING_SENDER_ID': import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? '✓ Set' : '✗ Missing',
    'VITE_FIREBASE_APP_ID': import.meta.env.VITE_FIREBASE_APP_ID ? '✓ Set' : '✗ Missing',
  };

  const allSet = Object.values(envVars).every(v => v === '✓ Set');

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        EduVistara Diagnostic
      </Typography>

      {allSet ? (
        <Alert severity="success" sx={{ mb: 3 }}>
          All Firebase environment variables are configured!
        </Alert>
      ) : (
        <Alert severity="error" sx={{ mb: 3 }}>
          Some Firebase environment variables are missing. Check your .env file.
        </Alert>
      )}

      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Environment Variables
          </Typography>
          {Object.entries(envVars).map(([key, value]) => (
            <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
              <Typography variant="body2">{key}:</Typography>
              <Typography variant="body2" fontWeight={600} color={value.includes('✓') ? 'success.main' : 'error.main'}>
                {value}
              </Typography>
            </Box>
          ))}
        </CardContent>
      </Card>

      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Quick Fixes
          </Typography>
          <Typography variant="body2" paragraph>
            1. If variables are missing, copy .env.example to .env and fill in your Firebase credentials
          </Typography>
          <Typography variant="body2" paragraph>
            2. Restart the dev server after updating .env
          </Typography>
          <Typography variant="body2" paragraph>
            3. Enable Authentication in Firebase Console
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Diagnostic;
