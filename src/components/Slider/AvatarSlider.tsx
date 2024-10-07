import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, CardContent, CardMedia } from '@mui/material';
import Slider from 'react-slick'; 
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './AvatarSlider.css';
import { useTranslation } from 'react-i18next';

// Slider veri kaynağı tipi
type FetchDataFunction = (language: string) => Promise<any[]>;

// Dinamik slider bileşeni
const AvatarSlider = ({ title, fetchData }: { title: string, fetchData: FetchDataFunction }) => {
  const sliderRef = useRef<any>(null);
  const { i18n } = useTranslation();
  const [data, setData] = useState<any[]>([]);

  // Veriyi bileşen içinde çekiyoruz
  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData(i18n.language); // Dinamik veri çekme fonksiyonu
      setData(fetchedData);
    };
    loadData();
  }, [fetchData, i18n.language]);

  // Sonraki slayda geçme fonksiyonu
  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  // Önceki slayda gitme fonksiyonu
  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  // Wheel hareketi ile kaydırma
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      handleNext();
    } else if (e.deltaY < 0) {
      handlePrev();
    }
  };

  // Slider ayarları
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <FaChevronRight />,
    prevArrow: <FaChevronLeft />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container" onWheel={handleWheel} tabIndex={0}>
      <Typography variant="h5" gutterBottom className="slider-title">
        {title}
      </Typography>

      <div>
        {data.length > 0 ? (
          <Slider {...settings} ref={sliderRef}> {/* react-slick Slider kullanılıyor */}
            {data.map((item) => (
              <div key={item.id} className="avatar-card">
                <CardMedia
                  component="img"
                  src={item.imageSrc}
                  alt={item.name}
                  className="avatar-image"
                />
                <CardContent className="avatar-content">
                  <Typography className="avatar-name">{item.name}</Typography>
                </CardContent>
              </div>
            ))}
          </Slider>
        ) : (
          <Typography>Loading...</Typography> // Veriler yüklenirken
        )}
      </div>

      {/* Sol ve Sağ Oklar */}
      <button onClick={handlePrev} className="slider-button left">
        <FaChevronLeft />
      </button>
      <button onClick={handleNext} className="slider-button right">
        <FaChevronRight />
      </button>
    </div>
  );
};

export default AvatarSlider;
