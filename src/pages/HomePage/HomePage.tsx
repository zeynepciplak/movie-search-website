
import Slider from '../../components/Slider/Slider';
import { fetchPopularTVShows ,fetchPopularMovies, fetchUpcomingTrailers} from '../../api/tmdbApi';
import { useTranslation } from 'react-i18next';

import { ScopedCssBaseline } from '@mui/material';
import MoviesWithModal from '../../components/UpcomingTrailers/MoviesWithModal';


const HomePage: React.FC = () => {
  const { t } = useTranslation();




  return (
    
      <div>

       <ScopedCssBaseline>
      
       </ScopedCssBaseline>
    
      
        {/* Haftanın popüler filmlerini gösteren slider */}
        <Slider title={t("slider.Popular Movies This Week")} fetchData={fetchPopularMovies} />

        {/* Haftanın popüler TV dizilerini gösteren slider */}
        <Slider title={t("slider.Popular TV Shows This Week")} fetchData={fetchPopularTVShows} />
       
        <div>
        <MoviesWithModal />
        </div>

      </div>
      
  );
};

export default HomePage;

