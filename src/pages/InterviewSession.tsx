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
  TextField,
  LinearProgress,
  Chip,
  Paper,
  Divider,
} from '@mui/material';
import {
  ArrowBack,
  School,
  Send,
  CheckCircle,
} from '@mui/icons-material';
import { useAuth } from '@/contexts/AuthContext';
import { useAppState } from '@/contexts/AppStateContext';

interface Question {
  id: number;
  question: string;
  expectedPoints: string[];
}

const technicalQuestions: Question[] = [
  {
    id: 1,
    question: 'What is the difference between let, const, and var in JavaScript?',
    expectedPoints: ['Block scope vs function scope', 'Hoisting behavior', 'Reassignment rules', 'Temporal dead zone'],
  },
  {
    id: 2,
    question: 'Explain the concept of closures in JavaScript with an example.',
    expectedPoints: ['Function inside function', 'Access to outer scope', 'Practical use cases', 'Memory implications'],
  },
  {
    id: 3,
    question: 'What are React Hooks and why were they introduced?',
    expectedPoints: ['State in functional components', 'Lifecycle methods alternative', 'Code reusability', 'Simpler component logic'],
  },
  {
    id: 4,
    question: 'Explain the difference between SQL and NoSQL databases.',
    expectedPoints: ['Schema structure', 'Scalability', 'Use cases', 'ACID vs BASE'],
  },
  {
    id: 5,
    question: 'What is the time complexity of common array operations?',
    expectedPoints: ['Access: O(1)', 'Search: O(n)', 'Insert/Delete: O(n)', 'Sort: O(n log n)'],
  },
];

const behavioralQuestions: Question[] = [
  {
    id: 1,
    question: 'Tell me about a time when you faced a challenging problem at work. How did you solve it?',
    expectedPoints: ['Specific situation', 'Actions taken', 'Problem-solving approach', 'Positive outcome'],
  },
  {
    id: 2,
    question: 'Describe a situation where you had to work with a difficult team member.',
    expectedPoints: ['Communication approach', 'Conflict resolution', 'Team collaboration', 'Professional behavior'],
  },
  {
    id: 3,
    question: 'Give an example of when you had to learn a new technology quickly.',
    expectedPoints: ['Learning strategy', 'Resources used', 'Time management', 'Successful application'],
  },
  {
    id: 4,
    question: 'Tell me about a project you are most proud of.',
    expectedPoints: ['Project scope', 'Your role', 'Challenges overcome', 'Impact and results'],
  },
  {
    id: 5,
    question: 'How do you handle tight deadlines and pressure?',
    expectedPoints: ['Prioritization', 'Time management', 'Stress management', 'Quality maintenance'],
  },
];

const hrQuestions: Question[] = [
  {
    id: 1,
    question: 'Tell me about yourself.',
    expectedPoints: ['Professional background', 'Key skills', 'Career goals', 'Relevant experience'],
  },
  {
    id: 2,
    question: 'Why do you want to work for our company?',
    expectedPoints: ['Company research', 'Alignment with values', 'Growth opportunities', 'Genuine interest'],
  },
  {
    id: 3,
    question: 'What are your strengths and weaknesses?',
    expectedPoints: ['Relevant strengths', 'Honest weakness', 'Improvement efforts', 'Self-awareness'],
  },
  {
    id: 4,
    question: 'Where do you see yourself in 5 years?',
    expectedPoints: ['Career aspirations', 'Realistic goals', 'Company alignment', 'Growth mindset'],
  },
  {
    id: 5,
    question: 'Why should we hire you?',
    expectedPoints: ['Unique value proposition', 'Relevant skills', 'Cultural fit', 'Enthusiasm'],
  },
];

const InterviewSession = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userProfile } = useAuth();
  const { addInterviewResult } = useAppState();
  const { interviewType, difficulty } = location.state || { interviewType: 'technical', difficulty: 'medium' };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [answers, setAnswers] = useState<{ question: string; answer: string; score: number; feedback: string }[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState({ score: 0, feedback: '', strengths: [] as string[], improvements: [] as string[] });
  const [isComplete, setIsComplete] = useState(false);

  const questions = interviewType === 'technical' ? technicalQuestions : interviewType === 'behavioral' ? behavioralQuestions : hrQuestions;
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const evaluateAnswer = (question: Question, userAnswer: string) => {
    const answerLower = userAnswer.toLowerCase();
    let score = 0;
    const strengths: string[] = [];
    const improvements: string[] = [];

    // Check for expected points
    question.expectedPoints.forEach((point) => {
      const pointWords = point.toLowerCase().split(' ');
      const mentioned = pointWords.some(word => answerLower.includes(word));
      if (mentioned) {
        score += 20;
        strengths.push(`Mentioned ${point}`);
      } else {
        improvements.push(`Could elaborate on ${point}`);
      }
    });

    // Length check
    if (userAnswer.length < 50) {
      score = Math.max(0, score - 20);
      improvements.push('Answer could be more detailed');
    } else if (userAnswer.length > 100) {
      score += 10;
      strengths.push('Comprehensive answer');
    }

    // Cap score at 100
    score = Math.min(100, score);

    let feedback = '';
    if (score >= 80) {
      feedback = 'Excellent answer! You covered the key points well.';
    } else if (score >= 60) {
      feedback = 'Good answer, but there\'s room for improvement.';
    } else if (score >= 40) {
      feedback = 'Fair answer. Try to cover more key points.';
    } else {
      feedback = 'Your answer needs more detail and coverage of key concepts.';
    }

    return { score, feedback, strengths, improvements };
  };

  const handleSubmitAnswer = () => {
    if (!answer.trim()) {
      alert('Please provide an answer');
      return;
    }

    const evaluation = evaluateAnswer(currentQuestion, answer);
    setCurrentFeedback(evaluation);
    setAnswers([...answers, {
      question: currentQuestion.question,
      answer,
      score: evaluation.score,
      feedback: evaluation.feedback,
    }]);
    setShowFeedback(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswer('');
      setShowFeedback(false);
    } else {
      // Save interview result
      const avgScore = calculateAverageScore();
      addInterviewResult({
        type: interviewType,
        difficulty,
        score: avgScore,
        questionsAnswered: answers.length,
      });
      setIsComplete(true);
    }
  };

  const calculateAverageScore = () => {
    if (answers.length === 0) return 0;
    const total = answers.reduce((sum, a) => sum + a.score, 0);
    return Math.round(total / answers.length);
  };

  if (isComplete) {
    const avgScore = calculateAverageScore();
    return (
      <Box sx={{ bgcolor: 'background.default', minHeight: '100vh' }}>
        <AppBar position="static" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Toolbar>
            <IconButton edge="start" onClick={() => navigate('/interview')} sx={{ mr: 2 }}>
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
            <CheckCircle sx={{ fontSize: 80, color: 'success.main', mb: 2 }} />
            <Typography variant="h4" gutterBottom fontWeight={700}>
              Interview Complete!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Great job completing the interview. Here's your performance summary.
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h2" fontWeight={700} color="primary.main">
                {avgScore}/100
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Score
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom fontWeight={600} sx={{ textAlign: 'left', mb: 2 }}>
              Question-by-Question Breakdown
            </Typography>

            {answers.map((ans, index) => (
              <Paper key={index} sx={{ p: 2, mb: 2, textAlign: 'left' }}>
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                  Q{index + 1}: {ans.question}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Your Answer: {ans.answer}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Chip
                    label={`${ans.score}/100`}
                    color={ans.score >= 80 ? 'success' : ans.score >= 60 ? 'warning' : 'error'}
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary">
                    {ans.feedback}
                  </Typography>
                </Box>
              </Paper>
            ))}

            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={() => navigate('/interview')}
              sx={{ mt: 3 }}
            >
              Back to Interviews
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
          <IconButton edge="start" onClick={() => navigate('/interview')} sx={{ mr: 2 }}>
            <ArrowBack />
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <School sx={{ fontSize: 32, color: 'primary.main', mr: 1.5 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
              EduVistara - Interview
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
              <Chip label={difficulty} color="primary" size="small" />
            </Box>
            <LinearProgress variant="determinate" value={progress} sx={{ height: 8, borderRadius: 4, mb: 2 }} />
            <Typography variant="caption" color="text.secondary">
              {Math.round(progress)}% Complete
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom fontWeight={600}>
              {currentQuestion.question}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Take your time to provide a comprehensive answer. Consider the key points you want to cover.
            </Typography>

            {!showFeedback ? (
              <>
                <TextField
                  fullWidth
                  multiline
                  rows={8}
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  variant="outlined"
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  endIcon={<Send />}
                  onClick={handleSubmitAnswer}
                  disabled={!answer.trim()}
                >
                  Submit Answer
                </Button>
              </>
            ) : (
              <Box>
                <Paper sx={{ p: 3, bgcolor: 'grey.50', mb: 3 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    Your Answer:
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {answer}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                    <Typography variant="h4" fontWeight={700} color="primary.main">
                      {currentFeedback.score}/100
                    </Typography>
                    <Box>
                      <Typography variant="subtitle2" fontWeight={600}>
                        Score
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {currentFeedback.feedback}
                      </Typography>
                    </Box>
                  </Box>
                </Paper>

                {currentFeedback.strengths.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" fontWeight={600} color="success.main" gutterBottom>
                      Strengths:
                    </Typography>
                    {currentFeedback.strengths.map((strength, idx) => (
                      <Typography key={idx} variant="body2" sx={{ ml: 2, mb: 0.5 }}>
                        • {strength}
                      </Typography>
                    ))}
                  </Box>
                )}

                {currentFeedback.improvements.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" fontWeight={600} color="warning.main" gutterBottom>
                      Areas for Improvement:
                    </Typography>
                    {currentFeedback.improvements.map((improvement, idx) => (
                      <Typography key={idx} variant="body2" sx={{ ml: 2, mb: 0.5 }}>
                        • {improvement}
                      </Typography>
                    ))}
                  </Box>
                )}

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleNextQuestion}
                >
                  {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Interview'}
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default InterviewSession;
