import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Minimal inline translations - no external loading
const resources = {
  en: {
    translation: {
      app: { name: 'EduVistara', tagline: 'Learn. Practice. Excel.' },
      nav: { home: 'Home', dashboard: 'Dashboard', learning: 'Learning', interview: 'Interview', assessment: 'Assessment', profile: 'Profile', logout: 'Logout' },
      auth: { login: 'Login', signup: 'Sign Up', email: 'Email', password: 'Password', confirmPassword: 'Confirm Password', displayName: 'Full Name', forgotPassword: 'Forgot Password?', signInWithGoogle: 'Sign in with Google', dontHaveAccount: "Don't have an account?", alreadyHaveAccount: 'Already have an account?', signUpHere: 'Sign up here', loginHere: 'Login here' },
      language: { selectLanguage: 'Select Your Language', english: 'English', hindi: 'Hindi', marathi: 'Marathi', continue: 'Continue' },
      common: { loading: 'Loading...', error: 'Error', success: 'Success', save: 'Save', cancel: 'Cancel', getStarted: 'Get Started' },
    },
  },
  hi: {
    translation: {
      app: { name: 'एडुविस्तारा', tagline: 'सीखें। अभ्यास करें। उत्कृष्टता प्राप्त करें।' },
      auth: { login: 'लॉगिन', signup: 'साइन अप', email: 'ईमेल', password: 'पासवर्ड', signInWithGoogle: 'Google से साइन इन करें' },
      language: { selectLanguage: 'अपनी भाषा चुनें', continue: 'जारी रखें' },
      common: { loading: 'लोड हो रहा है...', getStarted: 'शुरू करें' },
    },
  },
  mr: {
    translation: {
      app: { name: 'एडुविस्तारा', tagline: 'शिका। सराव करा। उत्कृष्टता मिळवा।' },
      auth: { login: 'लॉगिन', signup: 'साइन अप', email: 'ईमेल', password: 'पासवर्ड', signInWithGoogle: 'Google सह साइन इन करा' },
      language: { selectLanguage: 'तुमची भाषा निवडा', continue: 'सुरू ठेवा' },
      common: { loading: 'लोड होत आहे...', getStarted: 'सुरुवात करा' },
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('i18nextLng') || 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

export default i18n;
