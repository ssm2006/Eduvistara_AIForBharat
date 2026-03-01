import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  LinearProgress,
  Chip,
  Paper,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  School,
  CheckCircle,
  Timer,
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { useAppState } from '@/contexts/AppStateContext';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const webDevQuestions: Question[] = [
  {
    id: 1,
    question: 'What does HTML stand for?',
    options: [
      'Hyper Text Markup Language',
      'High Tech Modern Language',
      'Home Tool Markup Language',
      'Hyperlinks and Text Markup Language',
    ],
    correctAnswer: 0,
    explanation: 'HTML stands for Hyper Text Markup Language, which is the standard markup language for creating web pages.',
  },
  {
    id: 2,
    question: 'Which CSS property is used to change the text color?',
    options: ['text-color', 'font-color', 'color', 'text-style'],
    correctAnswer: 2,
    explanation: 'The "color" property is used to change the text color in CSS.',
  },
  {
    id: 3,
    question: 'What is the correct syntax for referring to an external JavaScript file?',
    options: [
      '<script href="app.js">',
      '<script name="app.js">',
      '<script src="app.js">',
      '<script file="app.js">',
    ],
    correctAnswer: 2,
    explanation: 'The correct syntax is <script src="app.js"> to reference an external JavaScript file.',
  },
  {
    id: 4,
    question: 'Which method is used to add an element at the end of an array in JavaScript?',
    options: ['push()', 'pop()', 'shift()', 'unshift()'],
    correctAnswer: 0,
    explanation: 'The push() method adds one or more elements to the end of an array.',
  },
  {
    id: 5,
    question: 'What does CSS stand for?',
    options: [
      'Creative Style Sheets',
      'Cascading Style Sheets',
      'Computer Style Sheets',
      'Colorful Style Sheets',
    ],
    correctAnswer: 1,
    explanation: 'CSS stands for Cascading Style Sheets, used for styling web pages.',
  },
  {
    id: 6,
    question: 'Which HTML tag is used to define an internal style sheet?',
    options: ['<css>', '<script>', '<style>', '<link>'],
    correctAnswer: 2,
    explanation: 'The <style> tag is used to define internal CSS within an HTML document.',
  },
  {
    id: 7,
    question: 'What is the correct way to declare a JavaScript variable?',
    options: ['var myVar;', 'variable myVar;', 'v myVar;', 'declare myVar;'],
    correctAnswer: 0,
    explanation: 'Variables in JavaScript are declared using var, let, or const keywords.',
  },
  {
    id: 8,
    question: 'Which property is used to change the background color in CSS?',
    options: ['bgcolor', 'background-color', 'color-background', 'bg-color'],
    correctAnswer: 1,
    explanation: 'The background-color property is used to set the background color of an element.',
  },
  {
    id: 9,
    question: 'What is the purpose of the <head> tag in HTML?',
    options: [
      'To display the main content',
      'To contain metadata and links to scripts/styles',
      'To create a header section',
      'To define navigation',
    ],
    correctAnswer: 1,
    explanation: 'The <head> tag contains metadata, title, links to stylesheets, and scripts.',
  },
  {
    id: 10,
    question: 'Which JavaScript method is used to select an element by its ID?',
    options: [
      'getElementByClass()',
      'querySelector()',
      'getElementById()',
      'selectElement()',
    ],
    correctAnswer: 2,
    explanation: 'getElementById() is used to select an element by its ID attribute.',
  },
];

const TestSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile } = useAuth();
  const { addAssessmentResult } = useAppState();
  const { assessmentTitle } = location.state || { assessmentTitle: 'Web Development Assessment' };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft] = useState(600); // 10 minutes

  const questions = webDevQuestions;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers({ ...answers, [questionId]: answerIndex });
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    const score = calculateScore();
    // Save assessment result
    addAssessmentResult({
      title: assessmentTitle,
      score: score.correct,
      percentage: score.percentage,
      questionsTotal: score.total,
      questionsCorrect: score.correct,
    });
    setShowResults(true);
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: questions.length,
      percentage: Math.round((correct / questions.length) * 100),
    };
  };

  if (showResults) {
    const score = calculateScore();
    return (
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Toolbar>
            <IconButton edge="start" onClick={() => navigate('/assessment')} sx={{ mr: 2 }}>
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

        <Container maxWidth="md" sx={{ py: 4 }}>
          <Card sx={{ textAlign: 'center', p: 4 }}>
            <CheckCircle sx={{ fontSize: 80, color: score.percentage >= 70 ? 'success.main' : 'warning.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom fontWeight={700}>
              Assessment Complete!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Here's how you performed
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h2" fontWeight={700} color="primary.main">
                {score.percentage}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {score.correct} out of {score.total} correct
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom fontWeight={600} sx={{ textAlign: 'left', mb: 2 }}>
              Detailed Results
            </Typography>

            {questions.map((q, index) => {
              const userAnswer = answers[q.id];
              const isCorrect = userAnswer === q.correctAnswer;
              return (
                <Paper key={q.id} sx={{ p: 2, mb: 2, textAlign: 'left' }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 1 }}>
                    <Chip
                      label={isCorrect ? 'Correct' : 'Wrong'}
                      color={isCorrect ? 'success' : 'error'}
                      size="small"
                    />
                    <Typography variant="subtitle2" fontWeight={600} sx={{ flex: 1 }}>
                      Q{index + 1}: {q.question}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 7, mb: 1 }}>
                    Your answer: {userAnswer !== undefined ? q.options[userAnswer] : 'Not answered'}
                  </Typography>
                  {!isCorrect && (
                    <Typography variant="body2" color="success.main" sx={{ ml: 7, mb: 1 }}>
                      Correct answer: {q.options[q.correctAnswer]}
                    </Typography>
                  )}
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 7 }}>
                    {q.explanation}
                  </Typography>
                </Paper>
              );
            })}

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => navigate('/assessment')}
              sx={{ mt: 3 }}
            >
              Back to Assessments
            </Button>
          </Card>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
      <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => navigate('/assessment')} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <School sx={{ fontSize: 32, color: 'primary.main', mr: 1.5 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
              EduVistara - {assessmentTitle}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
            <Timer sx={{ color: 'text.secondary' }} />
            <Typography variant="body2" fontWeight={600}>
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {userProfile?.displayName?.charAt(0) || 'U'}
          </Avatar>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 4 }}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>
                Question {currentQuestionIndex + 1} of {questions.length}
              </Typography>
              <Chip label={`${Math.round(progress)}% Complete`} color="primary" size="small" />
            </Box>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4 }} />
          </CardContent>
        </Card>

        <Card>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mb: 3 }}>
              {currentQuestion.question}
            </Typography>

            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={answers[currentQuestion.id] ?? ''}
                onChange={(e) => handleAnswerChange(currentQuestion.id, parseInt(e.target.value))}
              >
                {currentQuestion.options.map((option, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 2,
                      mb: 2,
                      border: '2px solid',
                      borderColor: answers[currentQuestion.id] === index ? 'primary.main' : 'divider',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        borderColor: 'primary.main',
                        bgcolor: 'action.hover',
                      },
                    }}
                    onClick={() => handleAnswerChange(currentQuestion.id, index)}
                  >
                    <FormControlLabel
                      value={index}
                      control={<Radio />}
                      label={option}
                      sx={{ width: '100%', m: 0 }}
                    />
                  </Paper>
                ))}
              </RadioGroup>
            </FormControl>

            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <Button
                variant="outlined"
                size="large"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                sx={{ flex: 1 }}
              >
                Previous
              </Button>
              {currentQuestionIndex < questions.length - 1 ? (
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleNext}
                  sx={{ flex: 1 }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubmit}
                  sx={{ flex: 1 }}
                >
                  Submit Assessment
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default TestSession;
