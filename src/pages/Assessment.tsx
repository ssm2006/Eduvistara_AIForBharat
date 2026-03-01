import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  LinearProgress,
  Tabs,
  Tab,
} from '@mui/material';
import {
  ArrowBack,
  School,
  Quiz,
  Timer,
  CheckCircle,
  TrendingUp,
  EmojiEvents,
  Logout,
  Settings,
  Code,
  Language,
  Psychology,
  Calculate,
} from '@mui/icons-material';
import { useAppState } from '@/contexts/AppStateContext';

interface Assessment {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  questions: number;
  completed: boolean;
  score?: number;
  icon: React.ReactNode;
}

const AssessmentPage = () => {
  const navigate = useNavigate();
  const { getStats, assessmentResults } = useAppState();
  const stats = getStats();
  const [selectedTab, setSelectedTab] = useState(0);

  const assessments: Assessment[] = [
    {
      id: '1',
      title: 'Web Development Fundamentals',
      description: 'Test your HTML, CSS, and JavaScript knowledge',
      category: 'Programming',
      difficulty: 'Easy',
      duration: '30 min',
      questions: 10,
      completed: false,
      icon: <Code sx={{ fontSize: 40 }} />,
    },
    {
      id: '2',
      title: 'Python Programming',
      description: 'Assess your Python fundamentals',
      category: 'Programming',
      difficulty: 'Medium',
      duration: '45 min',
      questions: 15,
      completed: false,
      icon: <Code sx={{ fontSize: 40 }} />,
    },
    {
      id: '3',
      title: 'English Communication',
      description: 'Test your English proficiency',
      category: 'Language',
      difficulty: 'Medium',
      duration: '40 min',
      questions: 30,
      completed: false,
      icon: <Language sx={{ fontSize: 40 }} />,
    },
    {
      id: '4',
      title: 'Logical Reasoning',
      description: 'Evaluate your problem-solving skills',
      category: 'Aptitude',
      difficulty: 'Medium',
      duration: '35 min',
      questions: 25,
      completed: false,
      icon: <Psychology sx={{ fontSize: 40 }} />,
    },
    {
      id: '5',
      title: 'Data Structures',
      description: 'Test your DSA knowledge',
      category: 'Programming',
      difficulty: 'Hard',
      duration: '60 min',
      questions: 30,
      completed: false,
      icon: <Code sx={{ fontSize: 40 }} />,
    },
    {
      id: '6',
      title: 'Quantitative Aptitude',
      description: 'Math and numerical ability test',
      category: 'Aptitude',
      difficulty: 'Medium',
      duration: '45 min',
      questions: 35,
      completed: false,
      icon: <Calculate sx={{ fontSize: 40 }} />,
    },
  ];

  // Mark assessments as completed based on actual results
  const completedAssessmentTitles = assessmentResults.map(r => r.title);
  const updatedAssessments = assessments.map(a => ({
    ...a,
    completed: completedAssessmentTitles.includes(a.title),
    score: assessmentResults.find(r => r.title === a.title)?.percentage,
  }));

  const completedAssessments = updatedAssessments.filter((a) => a.completed);
  const availableAssessments = updatedAssessments.filter((a) => !a.completed);

  const averageScore = stats.averageAssessmentScore;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'Hard':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate('/dashboard')} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <School sx={{ fontSize: 28, color: 'primary.main', mr: 1.5 }} />
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700, color: 'text.primary' }}>
            EduVistara - Assessments
          </Typography>
          <IconButton onClick={() => navigate('/profile')}>
            <Settings />
          </IconButton>
          <IconButton onClick={() => navigate('/login')} sx={{ ml: 1 }}>
            <Logout />
          </IconButton>
          <Avatar sx={{ ml: 2, bgcolor: 'primary.main' }}>U</Avatar>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Page Title */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom fontWeight={700}>
            Skill Assessments
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Test your knowledge and track your progress
          </Typography>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Completed
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight={700}>
                  {stats.assessmentsCompleted}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingUp sx={{ color: 'primary.main', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Avg Score
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight={700}>
                  {averageScore}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Quiz sx={{ color: 'warning.main', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Available
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight={700}>
                  {availableAssessments.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <EmojiEvents sx={{ color: 'secondary.main', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Total Tests
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight={700}>
                  {assessments.length}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
          <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
            <Tab label="Available" />
            <Tab label="Completed" />
          </Tabs>
        </Box>

        {/* Available Assessments Tab */}
        {selectedTab === 0 && (
          <Grid container spacing={3}>
            {availableAssessments.length > 0 ? (
              availableAssessments.map((assessment) => (
                <Grid item xs={12} md={6} key={assessment.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 2,
                            bgcolor: 'primary.light',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                            color: 'primary.main',
                          }}
                        >
                          {assessment.icon}
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" fontWeight={600}>
                            {assessment.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {assessment.category}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {assessment.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                        <Chip
                          label={assessment.difficulty}
                          size="small"
                          color={getDifficultyColor(assessment.difficulty) as any}
                        />
                        <Chip label={`${assessment.questions} questions`} size="small" variant="outlined" icon={<Quiz />} />
                        <Chip label={assessment.duration} size="small" variant="outlined" icon={<Timer />} />
                      </Box>
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={() => navigate('/test-session', { state: { assessmentTitle: assessment.title } })}
                      >
                        Start Assessment
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Card sx={{ p: 4, textAlign: 'center' }}>
                  <CheckCircle sx={{ fontSize: 64, color: 'success.main', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    All assessments completed!
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Great job! Check back later for new assessments.
                  </Typography>
                </Card>
              </Grid>
            )}
          </Grid>
        )}

        {/* Completed Assessments Tab */}
        {selectedTab === 1 && (
          <Grid container spacing={3}>
            {completedAssessments.length > 0 ? (
              completedAssessments.map((assessment) => (
                <Grid item xs={12} md={6} key={assessment.id}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Box
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 2,
                            bgcolor: 'success.light',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mr: 2,
                            color: 'success.main',
                          }}
                        >
                          <CheckCircle sx={{ fontSize: 32 }} />
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="h6" fontWeight={600}>
                            {assessment.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {assessment.category}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {assessment.description}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                        <Chip
                          label={assessment.difficulty}
                          size="small"
                          color={getDifficultyColor(assessment.difficulty) as any}
                        />
                        <Chip label={`${assessment.questions} questions`} size="small" variant="outlined" />
                      </Box>
                      {assessment.score !== undefined && (
                        <Box sx={{ mt: 2 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="body2" color="text.secondary">
                              Your Score
                            </Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {assessment.score}%
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant="determinate"
                            value={assessment.score}
                            sx={{ height: 8, borderRadius: 1 }}
                            color={assessment.score >= 80 ? 'success' : assessment.score >= 60 ? 'warning' : 'error'}
                          />
                        </Box>
                      )}
                    </CardContent>
                    <Box sx={{ p: 2, pt: 0 }}>
                      <Button variant="outlined" fullWidth onClick={() => navigate(`/assessment/${assessment.id}/results`)}>
                        View Results
                      </Button>
                    </Box>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Card sx={{ p: 4, textAlign: 'center' }}>
                  <Quiz sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    No completed assessments yet
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Start an assessment to test your skills
                  </Typography>
                  <Button variant="contained" onClick={() => setSelectedTab(0)}>
                    Browse Assessments
                  </Button>
                </Card>
              </Grid>
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default AssessmentPage;
