import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Grid, Card, CardContent, Button, LinearProgress, Chip, AppBar, Toolbar, IconButton, Avatar, Stack } from '@mui/material';
import { School, PlayArrow, ArrowBack, Settings, Logout } from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { coursesData, CourseData } from '@/data/coursesData';

const Learning = () => {
  const navigate = useNavigate();
  const { userProfile, signOut } = useAuth();

  // Convert coursesData object to array
  const courses: CourseData[] = Object.values(coursesData);

  const getLevelColor = (level: string) => {
    if (level === 'Beginner') return 'success';
    if (level === 'Intermediate') return 'warning';
    return 'error';
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate('/dashboard')} sx={{ mr: 2 }}><ArrowBack /></IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <School sx={{ fontSize: 32, color: 'primary.main', mr: 1.5 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>EduVistara</Typography>
          </Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton onClick={() => navigate('/profile')}><Settings /></IconButton>
            <IconButton onClick={() => { signOut(); navigate('/'); }}><Logout /></IconButton>
            <Avatar sx={{ bgcolor: 'primary.main' }}>{userProfile?.displayName?.charAt(0) || 'U'}</Avatar>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight={700}>My Learning</Typography>
          <Typography variant="body1" color="text.secondary">Continue your courses and track your progress</Typography>
        </Box>

        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item xs={12} md={6} key={course.id}>
              <Card sx={{ height: '100%', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
                <CardContent>
                  <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                    <Chip label={course.level} size="small" color={getLevelColor(course.level) as any} />
                    <Chip label={course.category} size="small" variant="outlined" />
                  </Stack>
                  <Typography variant="h6" gutterBottom fontWeight={600}>{course.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{course.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="caption" color="text.secondary">Progress</Typography>
                      <Typography variant="caption" color="text.secondary">{course.modules.length} modules</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={course.progress} sx={{ height: 8, borderRadius: 4 }} />
                  </Box>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    startIcon={<PlayArrow />}
                    onClick={() => navigate(`/course/${course.id}`)}
                  >
                    {course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Learning;