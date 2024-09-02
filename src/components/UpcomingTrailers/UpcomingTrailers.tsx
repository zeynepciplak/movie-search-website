import React, { useEffect, useState, useRef } from 'react';
import UpcomingTrailerCard from './UpcomingTrailerCard';
import { Box, Typography } from '@mui/material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { fetchUpcomingTrailers, Trailer } from '../../api/tmdbApi';
import { useTranslation } from 'react-i18next';

const UpcomingTrailers: React.FC = () => {
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const { t, i18n } = useTranslation();

  const movieSliderRef = useRef<typeof Slider | null>(null);
  const tvSliderRef = useRef<typeof Slider | null>(null);

  useEffect(() => {
    const getTrailers = async () => {
      const upcomingTrailers = await fetchUpcomingTrailers(i18n.language);
      setTrailers(upcomingTrailers);
    };
    getTrailers();
  }, [i18n.language]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    adaptiveHeight: true,
  };

  // Çalışmayan videoları listeden çıkarmak için kullanılan fonksiyon
  const handleVideoError = (index: number) => {
    setTrailers(prevTrailers => prevTrailers.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        {t('UpComing.Upcoming Movies & TV Shows')}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Filmler için slider */}
        <Box
          sx={{ width: '48%', minHeight: '400px' }}
          tabIndex={0}
        >
          <Slider ref={movieSliderRef} {...settings}>
            {trailers
              .filter(trailer => trailer.mediaType === 'movie')
              .slice(0, 7) // Film fragmanlarını 7 ile sınırlandırıyoruz
              .map((trailer, index) => (
                <UpcomingTrailerCard
                  key={index}
                  title={trailer.title}
                  trailerUrl={trailer.trailerUrl}
                  releaseDate={trailer.releaseDate}
                  mediaType={trailer.mediaType}
                  onError={() => handleVideoError(index)}  // Hata olursa videoyu kaldır
                />
              ))}
          </Slider>
        </Box>

        {/* Diziler için slider */}
        <Box
          sx={{ width: '48%', minHeight: '400px' }}
          tabIndex={0}
        >
          <Slider ref={tvSliderRef} {...settings}>
            {trailers
              .filter(trailer => trailer.mediaType === 'tv')
              .map((trailer, index) => (
                <UpcomingTrailerCard
                  key={index}
                  title={trailer.title}
                  trailerUrl={trailer.trailerUrl}
                  releaseDate={trailer.releaseDate}
                  mediaType={trailer.mediaType}
                  onError={() => handleVideoError(index)}  // Hata olursa videoyu kaldır
                />
              ))}
          </Slider>
        </Box>
      </Box>
    </Box>
  );
};

export default UpcomingTrailers;
