import React from 'react';
import Slider from 'react-slick';
import MovieCard from '../UpcomingTrailers/MovieCard'; // Card bileşenini sliderda kullanacağız.
import './MovieSlider.css'; // CSS stillerini içe aktar


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
  const settings = {
    dots: false,    // İsteğe bağlı olarak dots kullanabilirsin
    infinite: false,  // Sonsuz kaydırma özelliği devre dışı
    speed: 500,
    slidesToShow: 4,  // Görüntülenen kart sayısı
    slidesToScroll: 1, // Kaç kart kaydırılacağı
    arrows: true,  // Okları etkinleştir
  };

  return (
    <div className="slider-container"> {/* Kapsayıcı kaydırmayı aktif eder */}
      <div className="slick-list">  {/* Scrollbar ile kaydırma sağlanır */}
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.id} style={{ padding: '0 10px' }}>
              <MovieCard
                key={movie.id}
                title={movie.title}
                trailerUrl={movie.trailerUrl}
                videoId={movie.videoId}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default MovieSlider;
