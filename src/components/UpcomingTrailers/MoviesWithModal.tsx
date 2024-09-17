import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import MovieCard from './MovieCard';
import { Trailer, fetchUpcomingTrailers } from '../../api/tmdbApi';
import backGroundImage from "../../assets/duvarkagıdı.jpg";
import { useTranslation } from 'react-i18next';

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
  const {t}=useTranslation();
  useEffect(() => {
    const fetchData = async () => {
      const trailerData = await fetchUpcomingTrailers('en-US');
      setTrailers(trailerData);
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '35px' }}>
      <h2>{t('UpComing.Latest Trailers')}</h2>
      <div
        style={{
          backgroundImage: `url(${backGroundImage})`, // Arkaplan resmi burada ekleniyor
          backgroundSize: 'cover', // Resmin kapsaması için
          backgroundPosition: 'center', // Resmin ortalanması için
          padding: '20px',
          borderRadius:"25px"
        }}
      >
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
      </div>
    </div>
  );
};

export default MoviesWithModal;
