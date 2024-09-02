import React from 'react';
import Slider from '../../components/Slider/Slider';
import { fetchPopularTVShows ,fetchPopularMovies} from '../../api/tmdbApi';
import { useTranslation } from 'react-i18next';

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div>
      <header>
      </header>
      <main>
        {/* Haftanın popüler filmlerini gösteren slider */}
        <Slider title={t("slider.Popular Movies This Week")} fetchData={fetchPopularMovies} />

        {/* Haftanın popüler TV dizilerini gösteren slider */}
        <Slider title={t("slider.Popular TV Shows This Week")} fetchData={fetchPopularTVShows} />
      </main>
    </div>
  );
};

export default HomePage;

