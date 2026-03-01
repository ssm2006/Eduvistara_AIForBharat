import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Box,
  Container,
  Typography,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Chip,
} from '@mui/material';
import { Language, CheckCircle } from '@mui/icons-material';
import { Language as LanguageType } from '@/types';

const LanguageSelection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { languages, changeLanguage, language: currentLanguage } = useLanguage();

  const handleLanguageSelect = (lang: LanguageType) => {
    changeLanguage(lang);
    navigate('/login');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)',
          opacity: 0.05,
        },
      }}
    >
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #2563eb 0%, #8b5cf6 100%)',
              mb: 3,
            }}
          >
            <Language sx={{ fontSize: 40, color: 'white' }} />
          </Box>
          <Typography variant="h2" gutterBottom fontWeight={800}>
            {t('language.selectLanguage')}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Choose your preferred language to continue
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {languages.map((lang) => (
            <Grid item xs={12} sm={4} key={lang.code}>
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  border: '2px solid',
                  borderColor:
                    currentLanguage === lang.code ? 'primary.main' : 'transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(37, 99, 235, 0.15)',
                    borderColor: 'primary.main',
                  },
                }}
              >
                {currentLanguage === lang.code && (
                  <Chip
                    icon={<CheckCircle />}
                    label="Selected"
                    size="small"
                    color="primary"
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      zIndex: 1,
                    }}
                  />
                )}
                <CardActionArea
                  onClick={() => handleLanguageSelect(lang.code)}
                  sx={{ height: '100%', p: 4 }}
                >
                  <CardContent sx={{ textAlign: 'center', p: 0 }}>
                    <Typography
                      variant="h2"
                      gutterBottom
                      sx={{ fontSize: { xs: '3rem', sm: '4rem' } }}
                    >
                      {lang.code === 'en' ? '🇬🇧' : '🇮🇳'}
                    </Typography>
                    <Typography variant="h4" gutterBottom fontWeight={700}>
                      {lang.nativeName}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {lang.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            You can change the language anytime from settings
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default LanguageSelection;
