import React, { useRef, useEffect, useState } from 'react';
import { Box, Typography, CardContent, CardMedia } from '@mui/material';
import Slider from 'react-slick'; 
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './AvatarSlider.css';
import { useTranslation } from 'react-i18next';
import LoadingIcon from '../Loading/LoadingIcon';
import { useNavigate } from 'react-router-dom';

interface AvatarSliderProps {
  artists: {
    id: number;
    name: string;
    imageSrc: string;
  }[];
}

type FetchDataFunction = (language: string) => Promise<any[]>;

const AvatarSlider = ({ title, fetchData }: { title: string, fetchData: FetchDataFunction }) => {
  const sliderRef = useRef<any>(null);
  const { i18n } = useTranslation();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();
  
  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await fetchData(i18n.language); 
      setData(fetchedData);
      setLoading(false); // Veriler yüklendiğinde loading state'i false yap
    };
    loadData();
  }, [fetchData, i18n.language]);

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY > 0) {
      handleNext();
    } else if (e.deltaY < 0) {
      handlePrev();
    }
  };

  const handleAvatarClick = (artistId: number) => {
    navigate(`/detail-page/${artistId}/artist`); 
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <FaChevronRight />,
    prevArrow: <FaChevronLeft />,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="slider-container" onWheel={handleWheel} tabIndex={0}>
      <h2 className="slider-title">{title}</h2>
      <div>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
            }}
          >
            <LoadingIcon />
          </Box>
        ) : (
          <Slider {...settings} ref={sliderRef}>
            {data.map((item) => (
              <div
                key={item.id}
                className="avatar-card"
                onClick={() => handleAvatarClick(item.id)}
                style={{ cursor: "pointer" }}
              >
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
        )}
      </div>

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
