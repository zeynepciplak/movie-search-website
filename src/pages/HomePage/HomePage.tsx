import React from 'react';
import Slider from '../../components/Slider/Slider';
import SliderTvSeries from '../../components/Slider/SliderTvSeries';

import { fetchPopularTVShows, fetchPopularMovies,fetchUpcomingTrailers, fetchAwardWinningMovies, fetchPopularArtists } from '../../api/tmdbApi';
import { useTranslation } from 'react-i18next';
import AvatarSlider from '../../components/Slider/AvatarSlider';
import MoviesWithModal from '../../components/UpcomingTrailers/MoviesWithModal'; 

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
  
    <MoviesWithModal />
   
      <Slider title={t("slider.Popular Movies This Week")} fetchData={fetchPopularMovies} />
      <SliderTvSeries title={t("slider.Popular TV Shows This Week")} fetchData={fetchPopularTVShows} />
      <AvatarSlider title={t('imdbtop100movies.Most Popular Artists')} fetchData={fetchPopularArtists} />
      <Slider title={t("slider.Award Winning Movies")} fetchData={fetchAwardWinningMovies} />

     
     
    </div>
  );
};

export default HomePage;
