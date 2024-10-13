import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import MovieCard from './MovieCard';
import { Trailer, fetchUpcomingTrailers } from '../../api/tmdbApi';
import backGroundImage from "../../assets/duvarkagıdı.jpg";
import { useTranslation } from 'react-i18next';
import LoadingIcon from '../Loading/LoadingIcon';
import { Box, Typography } from '@mui/material';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  customPaging: (i: number) => <div className="custom-dot"></div>,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const MoviesWithModal: React.FC = () => {
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const trailerData = await fetchUpcomingTrailers(currentLanguage);
      setTrailers(trailerData);
      setLoading(false);
    };

    fetchData();
  }, [currentLanguage]);

  return (
    <Box sx={{ padding: '35px' }}>
      <Typography variant="h4" gutterBottom>
        {t('UpComing.Latest Trailers')}
      </Typography>
      <Box
        sx={{
          backgroundImage: `url(${backGroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '20px',
          borderRadius: '25px',
          position: 'relative',
          height: '300px',
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <LoadingIcon />
          </Box>
        ) : (
          <Slider {...sliderSettings}>
            {trailers.map((trailer) => (
              <MovieCard
                key={trailer.title}
                title={trailer.title}
                trailerUrl={trailer.trailerUrl}
                videoId={trailer.trailerUrl.split('v=')[1]}
              />
            ))}
          </Slider>
        )}
      </Box>
    </Box>
  );
};

export default MoviesWithModal;
