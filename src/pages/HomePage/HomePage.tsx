import React from 'react';
import Slider from '../../components/Slider/Slider';
import { fetchPopularTVShows ,fetchPopularMovies} from '../../api/tmdbApi';
import { useTranslation } from 'react-i18next';
import UpcomingTrailers from '../../components/UpcomingTrailers/UpcomingTrailers';


const HomePage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    
      <div>

        
       <UpcomingTrailers />

        {/* Haftanın popüler filmlerini gösteren slider */}
        <Slider title={t("slider.Popular Movies This Week")} fetchData={fetchPopularMovies} />

        {/* Haftanın popüler TV dizilerini gösteren slider */}
        <Slider title={t("slider.Popular TV Shows This Week")} fetchData={fetchPopularTVShows} />
     
      </div>
  );
};

export default HomePage;

