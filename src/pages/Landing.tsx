import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next'; // Not used yet
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  AppBar,
  Toolbar,
  Stack,
  alpha,
} from '@mui/material';
import {
  School,
  MenuBook,
  RecordVoiceOver,
  TrendingUp,
  EmojiEvents,
  ArrowForward,
  Language as LanguageIcon,
  Person,
} from '@mui/icons-material';

const Landing = () => {
  const navigate = useNavigate();

  const stats = [
    {
      icon: <MenuBook sx={{ fontSize: 40, color: 'primary.main' }} />,
      label: 'Courses Completed',
      value: '0',
    },
    {
      icon: <RecordVoiceOver sx={{ fontSize: 40, color: 'success.main' }} />,
      label: 'Interviews Practiced',
      value: '0',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'warning.main' }} />,
      label: 'In Progress',
      value: '0',
    },
    {
      icon: <EmojiEvents sx={{ fontSize: 40, color: 'secondary.main' }} />,
      label: 'Overall Progress',
      value: '0%',
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Clean White Header - Matching the image */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: 'white',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar sx={{ py: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <School sx={{ fontSize: 32, color: 'primary.main', mr: 1.5 }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'text.primary',
              }}
            >
              EduVistara
            </Typography>
          </Box>
          <Stack direction="row" spacing={3} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" sx={{ color: 'text.primary' }} onClick={() => navigate('/learning')}>
              Learning
            </Button>
            <Button color="inherit" sx={{ color: 'text.primary' }} onClick={() => navigate('/interview')}>
              Interview Prep
            </Button>
            <Button color="inherit" sx={{ color: 'text.primary' }} onClick={() => navigate('/assessment')}>
              Assessment
            </Button>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ ml: 3 }}>
            <Button
              startIcon={<LanguageIcon />}
              onClick={() => navigate('/language')}
              sx={{ color: 'text.primary', display: { xs: 'none', sm: 'inline-flex' } }}
            >
              EN
            </Button>
            <Button
              startIcon={<Person />}
              onClick={() => navigate('/login')}
              sx={{ color: 'text.primary' }}
            >
              Login
            </Button>
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Hero Section - With background pattern */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '500px',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          background: 'linear-gradient(135deg, rgba(65, 105, 225, 0.95) 0%, rgba(91, 141, 239, 0.9) 100%)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 40% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)
            `,
            backgroundSize: '100% 100%',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            opacity: 0.3,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
          <Box sx={{ maxWidth: 700 }}>
            <Typography
              variant="h1"
              gutterBottom
              sx={{
                color: 'white',
                fontWeight: 700,
                mb: 2,
              }}
            >
              Welcome to EduVistara
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                mb: 4,
                fontWeight: 400,
                opacity: 0.95,
              }}
            >
              Your AI-powered learning companion
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForward />}
                onClick={() => navigate('/dashboard')}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  px: 4,
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                  },
                }}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/learning')}
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  px: 4,
                  '&:hover': {
                    borderColor: 'white',
                    bgcolor: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                Explore Courses
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>

      {/* Stats Cards - Matching the white cards at bottom */}
      <Container maxWidth="lg" sx={{ mt: -8, position: 'relative', zIndex: 3, pb: 8 }}>
        <Grid container spacing={3}>
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  bgcolor: 'white',
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.875rem' }}>
                      {stat.label}
                    </Typography>
                    {stat.icon}
                  </Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    {stat.value}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Why Choose Section */}
      <Box sx={{ bgcolor: alpha('#4169E1', 0.03), py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
              Our Learning Modules
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
              Everything you need to succeed in your learning journey
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', p: 3, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }} onClick={() => navigate('/learning')}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    bgcolor: alpha('#4169E1', 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <MenuBook sx={{ fontSize: 32, color: 'primary.main' }} />
                </Box>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Learning Courses
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Access comprehensive courses in Web Development, Python, Data Science, Digital Marketing, and UI/UX Design
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', p: 3, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }} onClick={() => navigate('/interview')}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    bgcolor: alpha('#10b981', 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <RecordVoiceOver sx={{ fontSize: 32, color: 'success.main' }} />
                </Box>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Interview Preparation
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Practice mock interviews with AI - Technical, HR, and Behavioral rounds with instant feedback
                </Typography>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', p: 3, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }} onClick={() => navigate('/assessment')}>
                <Box
                  sx={{
                    width: 56,
                    height: 56,
                    borderRadius: 2,
                    bgcolor: alpha('#f59e0b', 0.1),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <EmojiEvents sx={{ fontSize: 32, color: 'warning.main' }} />
                </Box>
                <Typography variant="h6" gutterBottom fontWeight={600}>
                  Skill Assessments
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Test your knowledge with comprehensive assessments and track your progress
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box sx={{ bgcolor: 'primary.main', py: 8 }}>
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" gutterBottom fontWeight={700} sx={{ color: 'white' }}>
            Ready to Start Learning?
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 4 }}>
            Join thousands of students transforming their careers with EduVistara
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/signup')}
            endIcon={<ArrowForward />}
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              px: 5,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.9)',
              },
            }}
          >
            Get Started Free
          </Button>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: '#f8f9fa', py: 4, borderTop: '1px solid', borderColor: 'divider' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <School sx={{ fontSize: 28, color: 'primary.main', mr: 1 }} />
                <Typography variant="h6" fontWeight={700}>
                  EduVistara
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                AI-powered multilingual learning platform for Indian students
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Product
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Features
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pricing
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Company
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  About
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Contact
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Resources
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Blog
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Help
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                Legal
              </Typography>
              <Stack spacing={1}>
                <Typography variant="body2" color="text.secondary">
                  Privacy
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Terms
                </Typography>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ borderTop: '1px solid', borderColor: 'divider', mt: 4, pt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              © 2026 EduVistara. All rights reserved.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
