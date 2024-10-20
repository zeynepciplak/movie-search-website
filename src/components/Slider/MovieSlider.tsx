import React, { useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './MovieSlider.css'; // Bu stil dosyasını kullanacağız

interface Movie {
  id: number;
  title: string;
  posterPath: string;
}

interface MovieSliderProps {
  movies: Movie[]; // Film verisi array olarak gelecek
}

const MovieSlider: React.FC<MovieSliderProps> = ({ movies }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Simüle edilen yükleme süresi
    }, 1000); // 1 saniye yükleme süresi

    return () => clearTimeout(timer); // Bileşen unmount olduğunda timeout'u temizle
  }, []);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.scrollLeft + 300,
        behavior: 'smooth',
      });
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollTo({
        left: sliderRef.current.scrollLeft - 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="slider-container">
      <button onClick={handlePrev} className="slider-button left">
        <FaChevronLeft size={24} color="white" />
      </button>

      <div className="slider-track" ref={sliderRef}>
        {loading ? (
          <div className="loading-container">
            <span>Loading...</span>
          </div>
        ) : (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img src={movie.posterPath} alt={movie.title} />
              <div>{movie.title}</div>
            </div>
          ))
        )}
      </div>

      <button onClick={handleNext} className="slider-button right">
        <FaChevronRight size={24} color="white" />
      </button>
    </div>
  );
};

export default MovieSlider;
