import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import MovieCard from './MovieCard';
import { Trailer, fetchUpcomingTrailers } from '../../api/tmdbApi';
import backGroundImage from "../../assets/duvarkagıdı.jpg";
import { useTranslation } from 'react-i18next';
import LoadingIcon from '../Loading/LoadingIcon';
import { Box } from '@mui/material';

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  arrows: true,
  customPaging: (i: number) => <div className="custom-dot"></div>, // Özel çubuk yapısı
};

const MoviesWithModal: React.FC = () => {
  const [trailers, setTrailers] = useState<Trailer[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state ekleniyor
  const { i18n, t } = useTranslation(); 
  const currentLanguage = i18n.language;  
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Veri yüklenmeye başlarken loading true yap
      const trailerData = await fetchUpcomingTrailers(currentLanguage);
      setTrailers(trailerData);
      setLoading(false); // Veri geldikten sonra loading'i false yap
    };

    fetchData();
  }, [currentLanguage]);

  return (
    <div style={{ padding: '35px' }}>
      <h2>{t('UpComing.Latest Trailers')}</h2>
      <div
        style={{
          backgroundImage: `url(${backGroundImage})`, // Arkaplan resmi burada ekleniyor
          backgroundSize: 'cover', // Resmin kapsaması için
          backgroundPosition: 'center', // Resmin ortalanması için
          padding: '20px',
          borderRadius: "25px"
        }}
      >
        <Box sx={{ position: 'relative', height: '260px' }}> {/* Slider alanını sabit tutuyoruz */}
          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%', // Alanı slider'ın yüksekliği kadar ayarla
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <LoadingIcon />
            </Box>
          ) : (
            <Slider {...sliderSettings}>
              {trailers.map((trailer) => (
                <MovieCard
                  key={trailer.title}
                  title={trailer.title}
                  trailerUrl={trailer.trailerUrl}
                  videoId={trailer.trailerUrl.split('v=')[1]} // YouTube video ID'si
                />
              ))}
            </Slider>
          )}
        </Box>
      </div>
    </div>
  );
};

export default MoviesWithModal;
