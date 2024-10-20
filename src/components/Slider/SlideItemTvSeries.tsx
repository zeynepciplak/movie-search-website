import React from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from 'react-router-dom';

interface SlideItemProps {
  movie: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
  };
}

const SlideItem: React.FC<SlideItemProps> = ({ movie }) => {
  const { i18n } = useTranslation();
  return (
 
    <div className="slide-item ">
      <Link to={`/detail-page/${movie.id}/tv`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="slide-image-container">
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={movie.title}
          className="slide-image"
        />
        <div className="movie-rating">{Math.round(movie.vote_average * 10) / 10}</div>
      </div>
      <div className="slide-info">
        <h3 className="slide-title">{movie.title}</h3>
        <p className="slide-date">
          {new Date(movie.release_date).toLocaleDateString(i18n.language, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>
      </Link>
    </div>
  );
};

export default SlideItem;
