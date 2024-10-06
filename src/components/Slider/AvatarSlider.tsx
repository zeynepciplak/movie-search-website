import React, { useRef } from 'react';
import { Box, Typography, CardContent, CardMedia } from '@mui/material';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './AvatarSlider.css';
import { useTranslation } from 'react-i18next';

// Dinamik slider bileşeni
const AvatarSlider = ({ data, title }: { data: any[], title: string }) => {
  const sliderRef = useRef<any>(null);

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

  // Slider ayarları
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Büyük ekranlarda 5 avatar gösterilecek
    slidesToScroll: 1,
    nextArrow: <FaChevronRight />,
    prevArrow: <FaChevronLeft />,
    responsive: [
      {
        breakpoint: 1280, // Geniş ekranlarda
        settings: {
          slidesToShow: 4, // Geniş ekranlarda 4 avatar göster
        },
      },
      {
        breakpoint: 1024, // Orta ekranlarda
        settings: {
          slidesToShow: 3, // Orta ekranlarda 3 avatar göster
        },
      },
      {
        breakpoint: 768, // Küçük ekranlarda
        settings: {
          slidesToShow: 2, // Küçük ekranlarda 2 avatar göster
        },
      },
      {
        breakpoint: 480, // Mobilde
        settings: {
          slidesToShow: 1, // Mobilde 1 avatar göster
        },
      },
    ],
  };

  return (
    <Box className="slider-container">
      <Typography variant="h5" gutterBottom className="slider-title">
        {title}
      </Typography>

      <Slider {...settings} ref={sliderRef}>
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

      {/* Sol ve Sağ Oklar */}
      <button onClick={handlePrev} className="slider-button left">
        <FaChevronLeft />
      </button>
      <button onClick={handleNext} className="slider-button right">
        <FaChevronRight />
      </button>
    </Box>
  );
};

export default AvatarSlider;
