import React, { useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // İkonları import ediyoruz
import './MovieSlider.css';

interface Movie {
  id: number;
  title: string;
  trailerUrl: string;
  videoId: string;
  release_date: string;
  mediaType: 'movie' | 'tv';
}

interface MovieSliderProps {
  movies: Movie[];
}

const MovieSlider: React.FC<MovieSliderProps> = ({ movies }) => {
  const sliderRef = useRef<HTMLDivElement>(null); // Slider referansı

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.scrollLeft + 300, // Her tıklamada 300px sağa kaydır
        behavior: 'smooth', // Yumuşak kaydırma
      });
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.scrollLeft - 300, // Her tıklamada 300px sola kaydır
        behavior: 'smooth', // Yumuşak kaydırma
      });
    }
  };

  return (
    <div className="slider-container">
      {/* Sol buton */}
      <button onClick={handlePrev} className="slider-button left">
        <FaChevronLeft size={24} color="white" />
      </button>
      
      {/* Kaydırılacak alan */}
      <div className="slider-track" ref={sliderRef}>
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            {/* MovieCard bileşeni burada kullanılmalı */}
            <div>{movie.title}</div> {/* MovieCard içerik yerine koydum */}
          </div>
        ))}
      </div>

      {/* Sağ buton */}
      <button onClick={handleNext} className="slider-button right">
        <FaChevronRight size={24} color="white" />
      </button>
    </div>
  );
};

export default MovieSlider;
