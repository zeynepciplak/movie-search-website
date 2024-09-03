import React, { useEffect, useState, useRef } from 'react';
import UpcomingTrailerCard from './UpcomingTrailerCard';
import { Box, Typography } from '@mui/material';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { fetchUpcomingTrailers, Trailer } from '../../api/tmdbApi';
import { useTranslation } from 'react-i18next';
import CircularProgressWithLabel from '../Loading/CircularProgressWithLabel'; // Doğru yolu kontrol edin

const UpcomingTrailers: React.FC = () => {
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const { i18n } = useTranslation();

  const movieSliderRef = useRef<typeof Slider | null>(null);
  const tvSliderRef = useRef<typeof Slider | null>(null);

  useEffect(() => {
    const getTrailers = async () => {
      try {
        setLoading(true);
        const upcomingTrailers = await fetchUpcomingTrailers(i18n.language);
        
        // Simulated progress
        let simulatedProgress = 0;
        const interval = setInterval(() => {
          simulatedProgress += 10;
          setProgress(simulatedProgress);
          if (simulatedProgress >= 100) {
            clearInterval(interval);
          }
        }, 100);

        setTrailers(upcomingTrailers);
      } finally {
        setLoading(false);
        setProgress(100);
      }
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

  const handleVideoError = (index: number) => {
    setTrailers(prevTrailers => prevTrailers.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ padding: '20px', position: 'relative', minHeight: '400px' }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Movies & TV Shows
      </Typography>

      {loading ? (
        <Box 
          sx={{ 
            position: 'absolute', 
            top: '50%', 
            left: '50%', 
            transform: 'translate(-50%, -50%)',
            zIndex: 10 
          }}
        >
          <CircularProgressWithLabel value={progress} size={80} /> {/* CircularProgressWithLabel prop'larını doğru geçin */}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ width: '48%' }}>
            <Slider ref={movieSliderRef} {...settings}>
              {trailers
                .filter(trailer => trailer.mediaType === 'movie')
                .slice(0, 7)
                .map((trailer, index) => (
                  <UpcomingTrailerCard
                    key={index}
                    title={trailer.title}
                    trailerUrl={trailer.trailerUrl}
                    releaseDate={trailer.releaseDate}
                    mediaType={trailer.mediaType}
                    onError={() => handleVideoError(index)}
                  />
                ))}
            </Slider>
          </Box>
          <Box sx={{ width: '48%' }}>
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
                    onError={() => handleVideoError(index)}
                  />
                ))}
            </Slider>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default UpcomingTrailers;
