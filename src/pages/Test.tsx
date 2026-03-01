import { Box, Container, Typography, Paper, Alert } from '@mui/material';

const Test = () => {
  const envVars = {
    'VITE_FIREBASE_API_KEY': import.meta.env.VITE_FIREBASE_API_KEY ? '✓ Set' : '✗ Missing',
    'VITE_FIREBASE_AUTH_DOMAIN': import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '✓ Set' : '✗ Missing',
    'VITE_FIREBASE_PROJECT_ID': import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✓ Set' : '✗ Missing',
    'VITE_FIREBASE_STORAGE_BUCKET': import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? '✓ Set' : '✗ Missing',
    'VITE_FIREBASE_MESSAGING_SENDER_ID': import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? '✓ Set' : '✗ Missing',
    'VITE_FIREBASE_APP_ID': import.meta.env.VITE_FIREBASE_APP_ID ? '✓ Set' : '✗ Missing',
  };

  const allConfigured = Object.values(envVars).every(v => v.includes('✓'));

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        🔍 EduVistara Configuration Test
      </Typography>

      {allConfigured ? (
        <Alert severity="success" sx={{ mb: 3 }}>
          All Firebase environment variables are configured!
        </Alert>
      ) : (
        <Alert severity="error" sx={{ mb: 3 }}>
          Some Firebase environment variables are missing. Please check your .env file.
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Environment Variables Status
        </Typography>
        {Object.entries(envVars).map(([key, value]) => (
          <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
            <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
              {key}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: value.includes('✓') ? 'success.main' : 'error.main',
                fontWeight: 600,
              }}
            >
              {value}
            </Typography>
          </Box>
        ))}
      </Paper>

      <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
        <Typography variant="h6" gutterBottom>
          Next Steps
        </Typography>
        {allConfigured ? (
          <>
            <Typography variant="body2" paragraph>
              ✅ Configuration looks good! You can now:
            </Typography>
            <Typography variant="body2" component="div">
              • Navigate to <a href="/">Home</a>
              <br />
              • Try <a href="/login">Login</a>
              <br />
              • Create an account at <a href="/signup">Sign Up</a>
            </Typography>
          </>
        ) : (
          <>
            <Typography variant="body2" paragraph>
              ❌ Please fix the configuration:
            </Typography>
            <Typography variant="body2" component="div" sx={{ fontFamily: 'monospace', bgcolor: 'white', p: 2, borderRadius: 1 }}>
              1. Create .env file: copy .env.example .env
              <br />
              2. Add your Firebase credentials to .env
              <br />
              3. Restart the dev server: npm run dev
              <br />
              4. Run verification: npm run verify
            </Typography>
          </>
        )}
      </Paper>
    </Container>
  );
};

export default Test;
