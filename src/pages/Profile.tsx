import { useState } from 'react';
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
  TextField,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  Divider,
  Chip,
  LinearProgress,
} from '@mui/material';
import {
  ArrowBack,
  School,
  Edit,
  Logout,
  Person,
  Notifications,
  Language,
  Security,
  DataUsage,
  EmojiEvents,
  TrendingUp,
  CheckCircle,
} from '@mui/icons-material';

interface CourseProgress {
  courseId: string;
  progress: number;
  completedModules: number;
  totalModules: number;
  lastAccessed: Date;
}

interface AssessmentResult {
  id: string;
  title: string;
  score: number;
  percentage: number;
  date: Date;
  questionsTotal: number;
  questionsCorrect: number;
}

const Profile = () => {
  const navigate = useNavigate();
  const { currentUser, signOut } = useAuth();
  const state = useAppState();
  const [selectedTab, setSelectedTab] = useState(0);
  const [editMode, setEditMode] = useState(false);

  // Profile data
  const [displayName, setDisplayName] = useState(currentUser?.displayName || 'User');
  const [email] = useState(currentUser?.email || 'user@example.com');
  const [phone, setPhone] = useState('');
  const [language, setLanguage] = useState('English');
  const [educationLevel, setEducationLevel] = useState('Bachelor\'s Degree');

  // Settings
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [dataUsageMode, setDataUsageMode] = useState('normal');

  // Calculate real stats from AppStateContext
  const completedCourses = state.coursesProgress.filter((c: CourseProgress) => c.progress === 100).length;
  const completedInterviews = state.interviewResults.length;
  const completedAssessments = state.assessmentResults.length;
  
  // Calculate average score from completed assessments
  const assessmentScores = state.assessmentResults.map((a: AssessmentResult) => a.score);
  const averageScore = assessmentScores.length > 0
    ? Math.round(assessmentScores.reduce((sum: number, score: number) => sum + score, 0) / assessmentScores.length)
    : 0;

  // Stats
  const stats = {
    coursesCompleted: completedCourses,
    interviewsPracticed: completedInterviews,
    assessmentsTaken: completedAssessments,
    averageScore: averageScore,
    totalLearningTime: '0 hours', // This would need to be tracked separately
    streak: 0, // This would need to be tracked separately
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleSaveProfile = () => {
    // Save profile logic here
    setEditMode(false);
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
            EduVistara - Profile
          </Typography>
          <IconButton onClick={handleLogout}>
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Profile Header */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  bgcolor: 'primary.main',
                  fontSize: '2.5rem',
                }}
              >
                {displayName.charAt(0).toUpperCase()}
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" fontWeight={700} gutterBottom>
                  {displayName}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {email}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                  <Chip label={educationLevel} size="small" color="primary" />
                  <Chip label={language} size="small" variant="outlined" />
                  {stats.streak > 0 && (
                    <Chip label={`${stats.streak} day streak`} size="small" icon={<EmojiEvents />} color="warning" />
                  )}
                </Box>
              </Box>
              <Button
                variant={editMode ? 'contained' : 'outlined'}
                startIcon={<Edit />}
                onClick={() => (editMode ? handleSaveProfile() : setEditMode(true))}
              >
                {editMode ? 'Save Profile' : 'Edit Profile'}
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CheckCircle sx={{ color: 'success.main', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Courses
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight={700}>
                  {stats.coursesCompleted}
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
                  {stats.averageScore}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Person sx={{ color: 'warning.main', mr: 1 }} />
                  <Typography variant="body2" color="text.secondary">
                    Interviews
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight={700}>
                  {stats.interviewsPracticed}
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
                    Learning Time
                  </Typography>
                </Box>
                <Typography variant="h4" fontWeight={700} sx={{ fontSize: '1.5rem' }}>
                  {stats.totalLearningTime}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
            <Tab label="Personal Info" />
            <Tab label="Settings" />
            <Tab label="Progress" />
          </Tabs>
        </Box>

        {/* Personal Info Tab */}
        {selectedTab === 0 && (
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Personal Information
              </Typography>
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField fullWidth label="Email" value={email} disabled />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Education Level"
                    value={educationLevel}
                    onChange={(e) => setEducationLevel(e.target.value)}
                    disabled={!editMode}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Preferred Language"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    disabled={!editMode}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {/* Settings Tab */}
        {selectedTab === 1 && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Notifications sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6" fontWeight={600}>
                      Notifications
                    </Typography>
                  </Box>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Notifications />
                      </ListItemIcon>
                      <ListItemText primary="Push Notifications" secondary="Receive notifications on your device" />
                      <Switch checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemIcon>
                        <Notifications />
                      </ListItemIcon>
                      <ListItemText primary="Email Notifications" secondary="Receive updates via email" />
                      <Switch checked={emailNotifications} onChange={(e) => setEmailNotifications(e.target.checked)} />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Language sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6" fontWeight={600}>
                      Language & Region
                    </Typography>
                  </Box>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Language />
                      </ListItemIcon>
                      <ListItemText primary="App Language" secondary={language} />
                      <Button size="small" onClick={() => navigate('/language')}>
                        Change
                      </Button>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <DataUsage sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6" fontWeight={600}>
                      Data Usage
                    </Typography>
                  </Box>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <DataUsage />
                      </ListItemIcon>
                      <ListItemText
                        primary="Data Saver Mode"
                        secondary={dataUsageMode === 'low' ? 'Enabled' : 'Disabled'}
                      />
                      <Switch
                        checked={dataUsageMode === 'low'}
                        onChange={(e) => setDataUsageMode(e.target.checked ? 'low' : 'normal')}
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Security sx={{ color: 'primary.main', mr: 1 }} />
                    <Typography variant="h6" fontWeight={600}>
                      Security
                    </Typography>
                  </Box>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Security />
                      </ListItemIcon>
                      <ListItemText primary="Change Password" secondary="Update your password" />
                      <Button size="small">Change</Button>
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Progress Tab */}
        {selectedTab === 2 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Learning Progress
                  </Typography>
                  {state.coursesProgress.length > 0 ? (
                    <Box sx={{ mt: 3 }}>
                      {state.coursesProgress.map((course: CourseProgress) => (
                        <Box key={course.courseId} sx={{ mb: 3 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography variant="body2">Course {course.courseId}</Typography>
                            <Typography variant="body2" fontWeight={600}>
                              {course.progress}%
                            </Typography>
                          </Box>
                          <LinearProgress 
                            variant="determinate" 
                            value={course.progress} 
                            sx={{ height: 8, borderRadius: 1 }}
                            color={course.progress === 100 ? 'success' : 'primary'}
                          />
                          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                            {course.completedModules} of {course.totalModules} modules completed
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  ) : (
                    <Box sx={{ mt: 3, textAlign: 'center', py: 4 }}>
                      <Typography variant="body2" color="text.secondary">
                        No courses started yet. Visit the Learning page to start your first course!
                      </Typography>
                      <Button 
                        variant="contained" 
                        sx={{ mt: 2 }}
                        onClick={() => navigate('/learning')}
                      >
                        Browse Courses
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    Recent Achievements
                  </Typography>
                  {(completedCourses > 0 || completedInterviews > 0 || completedAssessments > 0) ? (
                    <List>
                      {completedCourses > 0 && (
                        <ListItem>
                          <ListItemIcon>
                            <CheckCircle sx={{ color: 'success.main' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={`${completedCourses} Course${completedCourses > 1 ? 's' : ''} Completed`} 
                            secondary="Keep up the great work!" 
                          />
                        </ListItem>
                      )}
                      {completedInterviews > 0 && (
                        <ListItem>
                          <ListItemIcon>
                            <Person sx={{ color: 'primary.main' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={`${completedInterviews} Interview${completedInterviews > 1 ? 's' : ''} Practiced`} 
                            secondary="Building confidence for real interviews" 
                          />
                        </ListItem>
                      )}
                      {completedAssessments > 0 && averageScore > 0 && (
                        <ListItem>
                          <ListItemIcon>
                            <TrendingUp sx={{ color: averageScore >= 70 ? 'success.main' : 'warning.main' }} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={`Average Score: ${averageScore}%`} 
                            secondary={`Completed ${completedAssessments} assessment${completedAssessments > 1 ? 's' : ''}`}
                          />
                        </ListItem>
                      )}
                    </List>
                  ) : (
                    <Box sx={{ mt: 2, textAlign: 'center', py: 3 }}>
                      <Typography variant="body2" color="text.secondary">
                        Complete courses, interviews, and assessments to earn achievements!
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Profile;
