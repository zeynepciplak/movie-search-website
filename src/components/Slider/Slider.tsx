import React, { useState, useEffect, useRef } from 'react';
import { fetchPopularMovies } from '../../api/tmdbApi';
import { useTranslation } from 'react-i18next';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SlideItem from './SlideItem';
import './Slider.css';


interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

const Slider: React.FC = () => {
  const { t,i18n } = useTranslation();
  const [movies, setMovies] = useState<Movie[]>([]);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardWidth = 240; // Kartın genişliği (padding, margin ve border dahil)

  useEffect(() => {
    const getMovies = async () => {
      const popularMovies = await fetchPopularMovies(i18n.language);
      setMovies(popularMovies);
    };
    getMovies();
  }, [i18n.language]);

  const handleNext = () => {
    if (sliderRef.current) {
      const maxScrollLeft = sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
      const newScrollLeft = Math.min(sliderRef.current.scrollLeft + cardWidth, maxScrollLeft);
      sliderRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const newScrollLeft = Math.max(sliderRef.current.scrollLeft - cardWidth, 0);
      sliderRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  const handleWheel = (e: React.WheelEvent) => { //mousepad olaylarını burda yakalıyoruz
    const scrollSpeed=1.5;//kaydırma hızı
    if (sliderRef.current) {
      if (e.deltaX > 0) {
        sliderRef.current.scrollLeft += cardWidth * scrollSpeed; // Eğer kullanıcı sağa kaydırıyorsa bir kart sağa kaydır
      } else if (e.deltaX < 0) {
        sliderRef.current.scrollLeft -= cardWidth * scrollSpeed; // Eğer kullanıcı sola kaydırıyorsa bir kart sola kaydır
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {//klavye tuşları hareketlerini yakalıyoruz
    if (e.key === 'ArrowRight') {
      handleNext(); // Sağ ok tuşuna basıldığında bir kart sağa kaydır
    } else if (e.key === 'ArrowLeft') {
      handlePrev(); // Sol ok tuşuna basıldığında bir kart sola kaydır
    }
  };

  return (
    <div className="slider-container" onKeyDown={handleKeyDown} tabIndex={0}>
      <h2 className="slider-title">{t('slider.Popular This Week')}</h2>
      <button onClick={handlePrev} className="slider-button left">
        <FaChevronLeft />
      </button>
      <div className="slider-wrapper" onWheel={handleWheel}>
        <div className="slider" ref={sliderRef} style={{ display: 'flex', overflowX: 'hidden' }}>
          {movies.map((movie) => (
            <SlideItem key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
      <button onClick={handleNext} className="slider-button right">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Slider
