import React, { useState } from 'react';
import Slider from '../../components/Slider/Slider';
import { fetchPopularTVShows ,fetchPopularMovies} from '../../api/tmdbApi';
import { useTranslation } from 'react-i18next';
import UpcomingTrailers from '../../components/UpcomingTrailers/UpcomingTrailers';
import { ScopedCssBaseline } from '@mui/material';
import Modal from 'react-responsive-modal';
import "react-responsive-modal/styles.css";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)

  return (
    
      <div>

       <ScopedCssBaseline>
       <UpcomingTrailers />
       </ScopedCssBaseline>
    
      
        {/* Haftanın popüler filmlerini gösteren slider */}
        <Slider title={t("slider.Popular Movies This Week")} fetchData={fetchPopularMovies} />

        {/* Haftanın popüler TV dizilerini gösteren slider */}
        <Slider title={t("slider.Popular TV Shows This Week")} fetchData={fetchPopularTVShows} />
        <div>
          <button onClick={onOpenModal}>button.Open Modal</button>
          <Modal open={open} onClose={onCloseModal}>
          <UpcomingTrailers />

          </Modal>
        </div>

      </div>
      
  );
};

export default HomePage;

