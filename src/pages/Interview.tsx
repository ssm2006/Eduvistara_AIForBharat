import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Grid, Card, CardContent, Button, AppBar, Toolbar, IconButton, Avatar, Stack, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { School, ArrowBack, Settings, Logout, Mic, Psychology, Code, Business } from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { useAppState } from '@/contexts/AppStateContext';

const Interview = () => {
  const navigate = useNavigate();
  const { userProfile, signOut } = useAuth();
  const { getStats } = useAppState();
  const stats = getStats();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<any>(null);
  const [difficulty, setDifficulty] = useState('medium');

  const interviewTypes = [
    { id: 'technical', title: 'Technical Interview', description: 'Practice coding and problem-solving questions', icon: <Code sx={{ fontSize: 40 }} />, color: '#4169E1', duration: '30-45 min' },
    { id: 'behavioral', title: 'Behavioral Interview', description: 'Work on communication and soft skills', icon: <Psychology sx={{ fontSize: 40 }} />, color: '#10b981', duration: '20-30 min' },
    { id: 'hr', title: 'HR Interview', description: 'Prepare for HR rounds and general questions', icon: <Business sx={{ fontSize: 40 }} />, color: '#f59e0b', duration: '15-20 min' },
  ];

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
          <Typography variant="h4" gutterBottom fontWeight={700}>AI Interview Practice</Typography>
          <Typography variant="body1" color="text.secondary">Practice with AI-powered mock interviews and get instant feedback</Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}><Card><CardContent><Typography variant="h3" fontWeight={700} color="primary.main">{stats.interviewsCompleted}</Typography><Typography variant="body2" color="text.secondary">Interviews Completed</Typography></CardContent></Card></Grid>
          <Grid item xs={12} sm={4}><Card><CardContent><Typography variant="h3" fontWeight={700} color="success.main">{stats.averageInterviewScore}%</Typography><Typography variant="body2" color="text.secondary">Average Score</Typography></CardContent></Card></Grid>
          <Grid item xs={12} sm={4}><Card><CardContent><Typography variant="h3" fontWeight={700} color="warning.main">{stats.totalLearningTime}</Typography><Typography variant="body2" color="text.secondary">Time Practiced</Typography></CardContent></Card></Grid>
        </Grid>

        <Typography variant="h5" gutterBottom fontWeight={700} sx={{ mb: 3 }}>Choose Interview Type</Typography>
        <Grid container spacing={3}>
          {interviewTypes.map((interview) => (
            <Grid item xs={12} md={4} key={interview.id}>
              <Card sx={{ cursor: 'pointer', transition: 'all 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 4 } }}>
                <CardContent>
                  <Box sx={{ width: 64, height: 64, borderRadius: 2, bgcolor: interview.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>{interview.icon}</Box>
                  <Typography variant="h6" gutterBottom fontWeight={600}>{interview.title}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{interview.description}</Typography>
                  <Chip label={interview.duration} size="small" sx={{ mb: 2 }} />
                  <Button variant="contained" fullWidth startIcon={<Mic />} onClick={() => { setSelectedInterview(interview); setOpenDialog(true); }}>Start Practice</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Start {selectedInterview?.title}</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Configure your interview session settings</Typography>
          <TextField select fullWidth label="Difficulty Level" value={difficulty} onChange={(e) => setDifficulty(e.target.value)} sx={{ mb: 2 }}>
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </TextField>
          <Typography variant="caption" color="text.secondary">Duration: {selectedInterview?.duration}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button 
            variant="contained" 
            onClick={() => { 
              setOpenDialog(false); 
              navigate('/interview/session', { state: { interviewType: selectedInterview?.id, difficulty } });
            }} 
            startIcon={<Mic />}
          >
            Start Interview
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Interview;