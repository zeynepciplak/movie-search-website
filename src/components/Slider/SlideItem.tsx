import React from 'react';
import { useTranslation } from 'react-i18next';
//bu bileşen her bir film veya dizi için görüntülenen ıkartı temsil eder
interface SlideItemProps {
  movie: {
    title: string;
    poster_path: string;
    release_date: string;
  };
}

const SlideItem: React.FC<SlideItemProps> = ({ movie }) => {
  const { i18n } = useTranslation();

  return (
    <div className="slide-item">
      <div className="slide-image-container">
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          className="slide-image"
        />
      </div>
      <div className="slide-info">
        <h3>{movie.title}</h3>
        <p>
          {new Date(movie.release_date).toLocaleDateString(i18n.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
    </div>
  );
};

export default SlideItem;
