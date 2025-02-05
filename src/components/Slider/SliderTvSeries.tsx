import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import SlideItemTvSeries from './SlideItemTvSeries';
import './Slider.css';
import LoadingIcon from '../Loading/LoadingIcon';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

interface SliderProps {
  title: string;
  fetchData: (language: string) => Promise<Movie[]>;
}

const Slider: React.FC<SliderProps> = ({ title, fetchData }) => {
  const { i18n } = useTranslation();
  const [items, setItems] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardWidth = 160; 

  useEffect(() => {
    const getItems = async () => {
      const data = await fetchData(i18n.language);
      setItems(data);
      setLoading(false);
    };
    getItems();
  }, [fetchData, i18n.language]);

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

  const handleWheel = (e: React.WheelEvent) => {
    const scrollSpeed = 1.5;
    if (sliderRef.current) {
      if (e.deltaY > 0) {
        sliderRef.current.scrollLeft += cardWidth * scrollSpeed;
      } else if (e.deltaY < 0) {
        sliderRef.current.scrollLeft -= cardWidth * scrollSpeed;
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      handleNext();
    } else if (e.key === 'ArrowLeft') {
      handlePrev();
    }
  };

  return (
    <div className="slider-container" onKeyDown={handleKeyDown} tabIndex={0}>
      <h2 className="slider-title">{title}</h2>
      <button onClick={handlePrev} className="slider-button left">
        <FaChevronLeft />
      </button>
      <div className="slider-wrapper" onWheel={handleWheel}>
        <div className="slider" ref={sliderRef} style={{ display: 'flex', overflowX: 'hidden' }}>
          {loading ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '250px',
                width: '100%',
              }}
            >
              <LoadingIcon />
            </div>
          ) : (
            items.map((item) => (
              <SlideItemTvSeries key={item.id} movie={item} />
            ))
          )}
        </div>
      </div>
      <button onClick={handleNext} className="slider-button right">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default Slider;
