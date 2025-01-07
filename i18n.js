import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "Please enter your email to proceed":
        "Please enter your email to proceed",
      "Select Language": "Select Language",
      "Please enter your email": "Please enter your email",
      "Email should not contain spaces!": "Email should not contain spaces!",
      "Please enter a valid email address!":
        "Please enter a valid email address!",
      Continue: "Continue",
      "Unexpected error during login.": "Unexpected error during login.",
      "Network error or server error. Please try again.":
        "Network error or server error. Please try again.",
      "Welcome to Edji": "Welcome to Edji",
      "We are happy to see you here!": "We are happy to see you here!",
      Email: "Email",
      "Please enter your email": "Please enter your email",
    },
  },
  fr: {
    translation: {
      "Please enter your email to proceed":
        "Veuillez entrer votre email pour continuer",
      "Select Language": "Choisir la langue",
      "Please enter your email": "Veuillez entrer votre email",
      "Email should not contain spaces!":
        "L'email ne doit pas contenir d'espaces !",
      "Please enter a valid email address!":
        "Veuillez entrer une adresse email valide !",
      Continue: "Continuer",
      "Unexpected error during login.":
        "Erreur inattendue lors de la connexion.",
      "Network error or server error. Please try again.":
        "Erreur réseau ou serveur. Veuillez réessayer.",
      "Welcome to Edji": "Bienvenue sur Edji",
      "We are happy to see you here!": "Nous sommes heureux de vous voir ici !",
      Email: "Courriel",
      "Please enter your email": "Veuillez entrer votre courriel",
    },
  },
  ru: {
    translation: {
      "Please enter your email to proceed":
        "Пожалуйста, введите свой email, чтобы продолжить",
      "Select Language": "Выберите язык",
      "Please enter your email": "Пожалуйста, введите свой email",
      "Email should not contain spaces!":
        "Электронная почта не должна содержать пробелов!",
      "Please enter a valid email address!":
        "Пожалуйста, введите действительный адрес электронной почты!",
      Continue: "Продолжить",
      "Unexpected error during login.": "Непредвиденная ошибка при входе.",
      "Network error or server error. Please try again.":
        "Ошибка сети или сервера. Попробуйте еще раз.",
      "Welcome to Edji": "Добро пожаловать в Edji",
      "We are happy to see you here!": "Мы рады вас здесь видеть!",
      Email: "Эл. почта",
      "Please enter your email": "Пожалуйста, введите вашу электронную почту",
    },
  },
  ar: {
    translation: {
      "Please enter your email to proceed":
        "يرجى إدخال بريدك الإلكتروني للمتابعة",
      "Select Language": "اختر اللغة",
      "Please enter your email": "يرجى إدخال بريدك الإلكتروني",
      "Email should not contain spaces!":
        "يجب ألا يحتوي البريد الإلكتروني على مسافات!",
      "Please enter a valid email address!":
        "يرجى إدخال عنوان بريد إلكتروني صالح!",
      Continue: "استمرار",
      "Unexpected error during login.": "خطأ غير متوقع أثناء تسجيل الدخول.",
      "Network error or server error. Please try again.":
        "خطأ في الشبكة أو خطأ في الخادم. يرجى المحاولة مرة أخرى.",
      "Welcome to Edji": "مرحبًا بك في Edji",
      "We are happy to see you here!": "نحن سعداء لرؤيتك هنا!",
      Email: "البريد الإلكتروني",
      "Please enter your email": "يرجى إدخال بريدك الإلكتروني",
    },
  },
  he: {
    translation: {
      "Please enter your email to proceed":
        "אנא הכנס את כתובת המייל שלך כדי להמשיך",
      "Select Language": "בחר שפה",
      "Please enter your email": "אנא הכנס את כתובת המייל שלך",
      "Email should not contain spaces!": "כתובת המייל לא יכולה לכלול רווחים!",
      "Please enter a valid email address!": "אנא הכנס כתובת מייל תקינה!",
      Continue: "המשך",
      "Unexpected error during login.": "שגיאה בלתי צפויה במהלך הכניסה.",
      "Network error or server error. Please try again.":
        "שגיאת רשת או שרת. אנא נסה שוב.",
      "Welcome to Edji": "ברוך הבא ל-Edji",
      "We are happy to see you here!": "אנחנו שמחים לראותך כאן!",
      Email: "אימייל",
      "Please enter your email": "אנא הכנס את כתובת האימייל שלך",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
