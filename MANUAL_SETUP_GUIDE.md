# EduVistara - Manual Setup Guide

## Overview
This guide provides all the code you need to manually create the working pages. Copy and paste each code block into the corresponding file.

---

## Step 1: Update src/main.tsx

Replace the content of `src/main.tsx` with:

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.working';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## Step 2: Create src/App.working.tsx

Create a new file `src/App.working.tsx` with:

```typescript
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/config/theme';
import { MockAuthProvider } from '@/contexts/MockAuthContext';

import Landing from '@/pages/Landing';
import Dashboard from '@/pages/Dashboard';
import Learning from '@/pages/Learning';
import Interview from '@/pages/Interview';
import Assessment from '@/pages/Assessment';
import Profile from '@/pages/Profile';
import LanguageSelection from '@/pages/LanguageSelection';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MockAuthProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/language" element={<LanguageSelection />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/assessment" element={<Assessment />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Landing />} />
          </Routes>
        </MockAuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
```

---

## Step 3: Replace src/pages/Learning.tsx

Replace the entire content of `src/pages/Learning.tsx` with:

```typescript
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Grid, Card, CardContent, Button, LinearProgress, Chip, AppBar, Toolbar, IconButton, Avatar, Stack } from '@mui/material';
import { School, PlayArrow, ArrowBack, Settings, Logout } from '@mui/icons-material';
import { useAuth } from '@/contexts/MockAuthContext';

const Learning = () => {
  const navigate = useNavigate();
  const { userProfile, signOut } = useAuth();

  const courses = [
    { id: '1', title: 'Web Development Fundamentals', description: 'Learn HTML, CSS, and JavaScript basics', progress: 0, totalLessons: 20, completedLessons: 0, level: 'Beginner', category: 'Programming' },
    { id: '2', title: 'React.js Complete Guide', description: 'Master React from basics to advanced', progress: 0, totalLessons: 30, completedLessons: 0, level: 'Intermediate', category: 'Programming' },
    { id: '3', title: 'Data Structures & Algorithms', description: 'Essential DSA for interviews', progress: 0, totalLessons: 40, completedLessons: 0, level: 'Intermediate', category: 'Computer Science' },
    { id: '4', title: 'Communication Skills', description: 'Improve your professional communication', progress: 0, totalLessons: 15, completedLessons: 0, level: 'Beginner', category: 'Soft Skills' },
  ];

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
                      <Typography variant="caption" color="text.secondary">{course.completedLessons}/{course.totalLessons} lessons</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={course.progress} sx={{ height: 8, borderRadius: 4 }} />
                  </Box>
                  <Button variant="contained" fullWidth startIcon={<PlayArrow />}>
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
```

---

## Step 4: Replace src/pages/Interview.tsx

Replace the entire content of `src/pages/Interview.tsx` with:

```typescript
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Grid, Card, CardContent, Button, AppBar, Toolbar, IconButton, Avatar, Stack, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';
import { School, ArrowBack, Settings, Logout, Mic, Psychology, Code, Business } from '@mui/icons-material';
import { useAuth } from '@/contexts/MockAuthContext';

const Interview = () => {
  const navigate = useNavigate();
  const { userProfile, signOut } = useAuth();
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
          <Grid item xs={12} sm={4}><Card><CardContent><Typography variant="h3" fontWeight={700} color="primary.main">0</Typography><Typography variant="body2" color="text.secondary">Interviews Completed</Typography></CardContent></Card></Grid>
          <Grid item xs={12} sm={4}><Card><CardContent><Typography variant="h3" fontWeight={700} color="success.main">0%</Typography><Typography variant="body2" color="text.secondary">Average Score</Typography></CardContent></Card></Grid>
          <Grid item xs={12} sm={4}><Card><CardContent><Typography variant="h3" fontWeight={700} color="warning.main">0</Typography><Typography variant="body2" color="text.secondary">Hours Practiced</Typography></CardContent></Card></Grid>
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
          <Button variant="contained" onClick={() => { setOpenDialog(false); alert(`Starting ${selectedInterview?.title}`); }} startIcon={<Mic />}>Start Interview</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Interview;
```

---

## Step 5: After Making Changes

1. Save all files
2. Go to terminal and stop the server (Ctrl+C)
3. Start the server again: `npm run dev`
4. Refresh browser: `Ctrl+Shift+R`

---

## Step 6: Test All Pages

Visit these URLs:
- `http://localhost:5173/` - Landing
- `http://localhost:5173/dashboard` - Dashboard
- `http://localhost:5173/learning` - Learning (4 courses)
- `http://localhost:5173/interview` - Interview (3 types)
- `http://localhost:5173/assessment` - Assessment
- `http://localhost:5173/profile` - Profile

---

## Troubleshooting

If you still see white screen:
1. Check browser console (F12) for errors
2. Make sure all files are saved
3. Restart the dev server
4. Clear browser cache (Ctrl+Shift+Delete)

---

## What's Working

✅ Landing page with gradient
✅ MockAuthContext (no Firebase needed)
✅ Theme and styling
✅ Routing
✅ All page layouts

The Dashboard, Assessment, and Profile pages already exist and should work once Learning and Interview are fixed!
