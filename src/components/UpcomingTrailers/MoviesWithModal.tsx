import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard'; // MovieCard bileşeni
import { Trailer, fetchUpcomingTrailers } from '../../api/tmdbApi';
import Slider from 'react-slick'; // Slider kütüphanesi

// Slider ayarları
const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
};

const MoviesWithModal: React.FC = () => {
  const [trailers, setTrailers] = useState<Trailer[]>([]); // Fragmanları tutan state

  useEffect(() => {
    const fetchData = async () => {
      const trailerData = await fetchUpcomingTrailers('en-US'); // API çağrısı
      setTrailers(trailerData); // Verileri kaydet
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
            posterUrl={`https://image.tmdb.org/t/p/w500${trailer.poster_path}`}
          />
        ))}
      </Slider>
    </div>
  );
};

export default MoviesWithModal;
