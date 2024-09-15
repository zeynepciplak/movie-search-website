import React from 'react';
import { Modal } from 'react-responsive-modal';
import { MovieDetails } from '../api/tmdbApi'; // Film detayları tipi
import 'react-responsive-modal/styles.css'; // Varsayılan modal stilleri
import './MovieDetailModal.css'; // Özel modal stillerini burada tanımlayacağız

interface MovieDetailModalProps {
  open: boolean; // Modal'ın açık olup olmadığını kontrol eder
  onClose: () => void; // Modal'ı kapatmak için fonksiyon
  movie: MovieDetails; // Film detayları
}

const MovieDetailModal: React.FC<MovieDetailModalProps> = ({ open, onClose, movie }) => {
  return (
    <Modal open={open} onClose={onClose} center classNames={{ modal: 'custom-modal' }}>
      <div style={{ display: 'flex' }}>
        {/* Sol üstte poster */}
        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} 
         className="modal-poster" />

        {/* Sağ tarafta film bilgileri */}
        <div style={{marginLeft:'20px'}}>
          <h2>{movie.title}</h2>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Score:</strong> {movie.vote_average}</p>
          <p><strong>Genre:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
          <p><strong>Actors:</strong> {movie.cast.map(actor => actor.name).join(', ')}</p>
          <p><strong>Subject:</strong> {movie.overview}</p>
          <p><strong>Duration:</strong> {Math.floor(movie.runtime / 60)} saat {movie.runtime % 60} dakika</p>
        </div>
      </div>
    </Modal>
  );
};

export default MovieDetailModal;
