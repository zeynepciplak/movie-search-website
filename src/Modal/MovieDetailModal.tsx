import React, { useState, useEffect } from 'react';
import { Modal } from 'react-responsive-modal';
import { MovieDetails } from '../api/tmdbApi';
import 'react-responsive-modal/styles.css';
import './MovieDetailModal.css';
import StarIcon from '@mui/icons-material/Star';
import { useTranslation } from 'react-i18next';

interface MovieDetailModalProps {
  open: boolean;
  onClose: () => void;
  movie: MovieDetails;
}

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({ open, onClose, movie }) => {
  const { i18n, t } = useTranslation();
  
  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    const hoursText = t('imdbtop100movies.hours');
    const minutesText = t('imdbtop100movies.minutes');
    return hours > 0 ? `${hours} ${hoursText} ${minutes} ${minutesText}` : `${minutes} ${minutesText}`;
  };

  return (
    <Modal open={open} onClose={onClose} center classNames={{ modal: 'custom-modal' }}>
      <div style={{ display: 'flex' }}>
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="modal-poster" />
        <div style={{ marginLeft: '20px' }}>
          <h2>{movie.title}</h2>
          <p><strong>{t('imdbtop100movies.Release Date')}:</strong> {movie.release_date}</p>
          <p><strong><StarIcon sx={{ color: '#FFD700', marginBottom: '3px', verticalAlign: 'bottom', fontSize: '20px' }} /></strong> {movie.vote_average}</p>
          <p><strong>{t('imdbtop100movies.Genre')}:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
          <p><strong>{t('imdbtop100movies.Actors')}:</strong> {movie.cast.map(actor => actor.name).join(', ')}</p>
          <p><strong>{t('imdbtop100movies.Subject')}:</strong> {movie.overview}</p>
          <p><strong>{t('imdbtop100movies.Duration')}:</strong> {formatRuntime(movie.runtime)}</p>
        </div>
      </div>
    </Modal>
  );
};

export default MovieDetailModal;
