import React, { useRef, useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './MovieSlider.css';
import LoadingIcon from '../Loading/LoadingIcon';

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
  const sliderRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Simüle edilen yükleme süresi
    }, 1000); // 1 saniye yükleme süresi

    return () => clearTimeout(timer);
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px', // Sabit alan
              width: '100%',
            }}
          >
            <LoadingIcon />
          </div>
        ) : (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div>{movie.title}</div> {/* Film başlığı */}
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
