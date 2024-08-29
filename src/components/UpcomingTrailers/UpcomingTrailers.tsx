import React, { useEffect, useState } from 'react';
import UpcomingTrailerCard from './UpcomingTrailerCard';
import { Box, Typography } from '@mui/material';
import { fetchUpcomingTrailers, Trailer } from '../../api/tmdbApi';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';

const UpcomingTrailers: React.FC = () => {
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    const getTrailers = async () => {
      const upcomingTrailers = await fetchUpcomingTrailers(i18n.language);
      setTrailers(upcomingTrailers);
    };
    getTrailers();
  }, [i18n.language]);

  const handleError = (index: number) => {
    setTrailers(prevTrailers => prevTrailers.filter((_, i) => i !== index)); // Hatalı videoyu listeden çıkar
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2, 
    slidesToScroll: 2, 
    arrows: true,
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        {t('UpComing.Upcoming Movies & TV Shows')}
      </Typography>
      <Slider {...settings}>
        {trailers.map((trailer, index) => (
          <UpcomingTrailerCard
            key={index}
            title={trailer.title}
            trailerUrl={trailer.trailerUrl}
            releaseDate={trailer.releaseDate}
            isPlaying={false}
            onPlay={() => console.log('Play')}
            onStop={() => console.log('Stop')}
            onError={() => handleError(index)} // Hata olunca çağrılacak
          />
        ))}
      </Slider>
    </Box>
  );
};

export default UpcomingTrailers;
