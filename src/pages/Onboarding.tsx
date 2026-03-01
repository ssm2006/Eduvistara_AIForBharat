import { Container, Typography } from '@mui/material';

const Onboarding = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Onboarding
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Onboarding wizard coming soon...
      </Typography>
    </Container>
  );
};

export default Onboarding;
