import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import MovieCard from './MovieCard';
import { Trailer, fetchUpcomingTrailers } from '../../api/tmdbApi';
import { Box, Typography } from '@mui/material';
import LoadingIcon from '../Loading/LoadingIcon';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import backGroundImage from "../../assets/duvarkagıdı.jpg"; 

// Özelleştirilmiş Sol Buton
const PrevArrow = ({ onClick }: any) => (
  <div
    style={{
      position: 'absolute',
      left: '-25px', 
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 2,
      cursor: 'pointer',
    }}
    onClick={onClick}
  >
    <FaChevronLeft style={{ fontSize: '30px', color: 'white' }} />
  </div>
);

// Özelleştirilmiş Sağ Buton
const NextArrow = ({ onClick }: any) => (
  <div
    style={{
      position: 'absolute',
      right: '-25px',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 2,
      cursor: 'pointer',
    }}
    onClick={onClick}
  >
    <FaChevronRight style={{ fontSize: '30px', color: 'white' }} />
  </div>
);

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  nextArrow: <NextArrow />, // Sağ ok
  prevArrow: <PrevArrow />, // Sol ok
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
      <Typography sx={{ fontWeight: "bold" }} variant="h4" gutterBottom>
        {t('UpComing.Latest Trailers')}
      </Typography>

      <Box
        sx={{
          padding: '20px',
          backgroundImage: `url(${backGroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: '25px',
          position: 'relative',
          height: 'auto',
          '@media (max-width: 768px)': {
            padding: '10px',
          },
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
