
import React from 'react';
import Slider from 'react-slick';
import MovieCard from '../UpcomingTrailers/MovieCard'; // Card bileşenini sliderda kullanacağız.
import './MovieSlider.css'; // Stil dosyası

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    mediaType: 'movie' | 'tv';
  }
  
  interface MovieSliderProps {
    movies: Movie[];
  }

const MovieSlider = ({ movies }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="slider-container">
      <h2>Top Picks</h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            trailerUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            releaseDate={movie.release_date}
            mediaType={movie.mediaType}
            onClick={() => console.log(`${movie.title} tıklandı!`)}
          />
        ))}
      </Slider>
    </div>
  );
};

export default MovieSlider;
