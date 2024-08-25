import React, { useEffect } from 'react';

import './App.css';
import { useTranslation } from 'react-i18next';




const App:React.FC=()=> {
  const {t} = useTranslation();//Bu kısımda i18n yi kullanmak için değişkenimizi tanımladım
  return (

    <div className="App">
    {t("Web sitemize hoş geldiniz!")}
   
  </div>
  );
} 

export default App;
