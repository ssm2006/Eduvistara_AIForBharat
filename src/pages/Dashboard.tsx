import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useAppState } from '@/contexts/AppStateContext';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  LinearProgress,
  Avatar,
  Stack,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  School,
  MenuBook,
  RecordVoiceOver,
  TrendingUp,
  EmojiEvents,
  PlayArrow,
  Logout,
  Settings,
} from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();
  const { userProfile, signOut } = useAuth();
  const { getStats } = useAppState();
  
  const stats = getStats();

  const statsCards = [
    {
      icon: <MenuBook sx={{ fontSize: 40, color: 'primary.main' }} />,
      label: 'Courses Completed',
      value: stats.coursesCompleted.toString(),
      total: stats.coursesInProgress > 0 ? `${stats.coursesInProgress} in progress` : '',
      progress: stats.overallProgress,
    },
    {
      icon: <RecordVoiceOver sx={{ fontSize: 40, color: 'success.main' }} />,
      label: 'Interviews Practiced',
      value: stats.interviewsCompleted.toString(),
      total: stats.averageInterviewScore > 0 ? `${stats.averageInterviewScore}% avg` : '',
      progress: stats.averageInterviewScore,
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: 'warning.main' }} />,
      label: 'Assessments Taken',
      value: stats.assessmentsCompleted.toString(),
      total: stats.averageAssessmentScore > 0 ? `${stats.averageAssessmentScore}% avg` : '',
      progress: stats.averageAssessmentScore,
    },
    {
      icon: <EmojiEvents sx={{ fontSize: 40, color: 'secondary.main' }} />,
      label: 'Learning Time',
      value: stats.totalLearningTime,
      progress: Math.min(stats.overallProgress, 100),
    },
  ];

  const quickActions = [
    {
      title: 'Continue Learning',
      description: 'Resume your last course',
      icon: <MenuBook />,
      color: 'primary',
      action: () => navigate('/learning'),
    },
    {
      title: 'Practice Interview',
      description: 'Start a mock interview',
      icon: <RecordVoiceOver />,
      color: 'success',
      action: () => navigate('/interview'),
    },
    {
      title: 'Take Assessment',
      description: 'Test your knowledge',
      icon: <TrendingUp />,
      color: 'warning',
      action: () => navigate('/assessment'),
    },
    {
      title: 'View Roadmap',
      description: 'Check your learning path',
      icon: <EmojiEvents />,
      color: 'secondary',
      action: () => navigate('/learning'),
    },
  ];

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <School sx={{ fontSize: 32, color: 'primary.main', mr: 1.5 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
              EduVistara
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <IconButton onClick={() => navigate('/profile')}>
              <Settings />
            </IconButton>
            <IconButton onClick={handleLogout}>
              <Logout />
            </IconButton>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              {userProfile?.displayName?.charAt(0) || 'U'}
            </Avatar>
          </Stack>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight={700}>
            Welcome back, {userProfile?.displayName || 'Student'}! 👋
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Continue your learning journey and achieve your goals
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {statsCards.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {stat.label}
                      </Typography>
                      <Typography variant="h4" fontWeight={700}>
                        {stat.value}
                      </Typography>
                      {stat.total && (
                        <Typography variant="caption" color="text.secondary">
                          {stat.total}
                        </Typography>
                      )}
                    </Box>
                    {stat.icon}
                  </Box>
                  {stat.progress !== undefined && (
                    <LinearProgress variant="determinate" value={stat.progress} sx={{ height: 6, borderRadius: 3 }} />
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Quick Actions */}
        <Typography variant="h5" gutterBottom fontWeight={700} sx={{ mb: 3 }}>
          Quick Actions
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {quickActions.map((action, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
                onClick={action.action}
              >
                <CardContent>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      bgcolor: `${action.color}.main`,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                    }}
                  >
                    {action.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {action.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {action.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Recent Activity */}
        <Typography variant="h5" gutterBottom fontWeight={700} sx={{ mb: 3 }}>
          Recent Activity
        </Typography>
        <Card>
          <CardContent>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body1" color="text.secondary">
                No recent activity yet. Start learning to see your progress here!
              </Typography>
              <Button
                variant="contained"
                startIcon={<PlayArrow />}
                sx={{ mt: 2 }}
                onClick={() => navigate('/learning')}
              >
                Start Learning
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Dashboard;
