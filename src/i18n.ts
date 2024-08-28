import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

// LocalStorage'dan dil ayarını kontrol et
const storedLang = localStorage.getItem('i18n');
const defaultLang = 'en-US'; // Varsayılan dil

// Eğer localStorage'da dil ayarı yoksa varsayılan dili ayarla
if (!storedLang) {
  localStorage.setItem('i18n', defaultLang);
}

// i18n yapılandırması
i18n
  .use(HttpApi) // çevirileri yüklemek için http backend kullanımı
  .use(LanguageDetector) // kullanıcının dilini otomatik algılamak için
  .use(initReactI18next) // react-i18next entegrasyonu
  .init({
    lng: storedLang || defaultLang, // Dil ayarını al
    supportedLngs: ['en', 'tr'], // Desteklenen diller
    fallbackLng: 'en', // Bir dil bulunamazsa kullanılacak dil
    debug: true, // Geliştirme sırasında hata ayıklama için
    interpolation: {
      escapeValue: false, // React zaten XSS koruması sağlar
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json', // Çeviri dosyalarının yolu
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
