import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import MovieCard from './MovieCard';
import { Trailer, fetchUpcomingTrailers } from '../../api/tmdbApi';

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

  useEffect(() => {
    const fetchData = async () => {
      const trailerData = await fetchUpcomingTrailers('en-US');
      setTrailers(trailerData);
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Upcoming Trailers</h2>
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
  );
};

export default MoviesWithModal;
