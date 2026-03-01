import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  School,
  PlayCircle,
  CheckCircle,
  ExpandMore,
  Timer,
  MenuBook,
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { coursesData } from '@/data/coursesData';

const CourseDetail = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { userProfile } = useAuth();
  const [expandedModule, setExpandedModule] = useState<string | false>('module-0');

  // Get course from coursesData object
  const course = courseId ? coursesData[courseId] : undefined;

  if (!course) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5">Course not found</Typography>
      </Box>
    );
  }

  const handleModuleChange = (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedModule(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate('/learning')} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <School sx={{ fontSize: 32, color: 'primary.main', mr: 1.5 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
              EduVistara
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {userProfile?.displayName?.charAt(0) || 'U'}
          </Avatar>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(65, 105, 225, 0.95) 0%, rgba(91, 141, 239, 0.9) 100%)',
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Chip label={course.category} sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white', mb: 2 }} />
          <Typography variant="h3" gutterBottom fontWeight={700} sx={{ color: 'white' }}>
            {course.title}
          </Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 3 }}>
            {course.description}
          </Typography>
          <Stack direction="row" spacing={3} sx={{ color: 'white' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Timer />
              <Typography>{course.duration}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <MenuBook />
              <Typography>{course.modules.length} Modules</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography>Level: {course.level}</Typography>
            </Box>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Course Progress
              </Typography>
              <Typography variant="h6" fontWeight={700} color="primary.main">
                {course.progress}%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={course.progress} sx={{ height: 8, borderRadius: 4 }} />
          </CardContent>
        </Card>

        <Typography variant="h5" gutterBottom fontWeight={700} sx={{ mb: 3 }}>
          Course Content
        </Typography>

        {course.modules.map((module, index) => {
          const completedLessons = module.lessons.filter(l => l.completed).length;
          const isModuleCompleted = completedLessons === module.lessons.length;
          const totalDuration = module.lessons.reduce((sum, lesson) => {
            const minutes = parseInt(lesson.duration);
            return sum + (isNaN(minutes) ? 0 : minutes);
          }, 0);
          const moduleDuration = `${totalDuration} min`;

          return (
            <Accordion
              key={index}
              expanded={expandedModule === `module-${index}`}
              onChange={handleModuleChange(`module-${index}`)}
              sx={{ mb: 2, '&:before': { display: 'none' } }}
            >
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                  {isModuleCompleted ? (
                    <CheckCircle sx={{ color: 'success.main' }} />
                  ) : (
                    <PlayCircle sx={{ color: 'primary.main' }} />
                  )}
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      Module {index + 1}: {module.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {module.lessons.length} lessons • {moduleDuration}
                    </Typography>
                  </Box>
                  {isModuleCompleted && (
                    <Chip label="Completed" color="success" size="small" />
                  )}
                </Box>
              </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ pl: 5 }}>
                {module.lessons.map((lesson, lessonIndex) => (
                  <Box key={lessonIndex}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        py: 2,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'action.hover' },
                        px: 2,
                        borderRadius: 1,
                      }}
                    >
                      {lesson.completed ? (
                        <CheckCircle sx={{ color: 'success.main', fontSize: 20 }} />
                      ) : (
                        <PlayCircle sx={{ color: 'text.secondary', fontSize: 20 }} />
                      )}
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" fontWeight={500}>
                          {lesson.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {lesson.duration} • {lesson.type}
                        </Typography>
                      </Box>
                    </Box>
                    {lessonIndex < module.lessons.length - 1 && <Divider />}
                  </Box>
                ))}
              </Box>
            </AccordionDetails>
          </Accordion>
          );
        })}

        <Card sx={{ mt: 4, bgcolor: 'primary.main', color: 'white' }}>
          <CardContent sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5" gutterBottom fontWeight={700}>
              Ready to Start Learning?
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              Begin your journey with this comprehensive course
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<PlayCircle />}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' },
              }}
            >
              Start Course
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default CourseDetail;
