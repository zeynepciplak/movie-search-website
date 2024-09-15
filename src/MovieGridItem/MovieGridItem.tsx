import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Movie, MovieDetails } from '../api/tmdbApi';
import { useTranslation } from 'react-i18next';
import InfoIcon from '@mui/icons-material/Info';
import MovieDetailModal from '../Modal/MovieDetailModal'; // Modal bileşeni

// Poster görseli için stil
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  height: '150px',
  width: '100px',
  objectFit:'cover',
  borderRadius:'8px',
});

// Kartın dış yapısı
const StyledPaper = styled(Paper)({
  padding: '10px',
  margin: '8px auto',
  width: '85%',
  Width: '600px',
  maxWidth:'95%',
  backgroundColor: '#2e3134',
  color: '#fff',
  display: 'flex',
  flexDirection: 'row',
  position: 'relative',
  border: 'none',
  borderRadius: '10px',
  boxShadow: 'none',
  marginLeft: '10px',
});

const TextWrapper=styled('div')({
  textAlign:'left',
})

// Movie arayüzü
export interface MovieGridItemProps {
  movie: Movie;
  index: number;
  fetchMovieDetails: () => void; // Film detaylarını fetch etme fonksiyonu
  movieDetails: MovieDetails | null;
}

// Bileşen
const MovieGridItem: React.FC<MovieGridItemProps> = ({ movie, index, fetchMovieDetails, movieDetails }) => {
  const { t } = useTranslation();

  // Modal state
  const [openModal, setOpenModal] = useState(false);

  // Modal'ı açma ve film detaylarını fetch etme
  const handleOpenModal = () => {
    fetchMovieDetails(); // Film detaylarını getir
    setOpenModal(true); // Modalı aç
  };

  // Modal'ı kapatma
  const handleCloseModal = () => {
    setOpenModal(false); // Modalı kapat
  };

  const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    const hoursText = t('imdbtop100movies.hours');
    const minutesText = t('imdbtop100movies.minutes');
    return hours > 0 ? `${hours} ${hoursText} ${minutes} ${minutesText}` : `${minutes} ${minutesText}`;
  };

  return (
    <>
      <StyledPaper key={movie.id}>
        <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
          {/* Film posteri */}
          <Grid item xs={3} style={{ zIndex: 2, position: 'relative' }}>
            <ButtonBase sx={{ width: '100%', height: 'auto' }}>
              <Img alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
            </ButtonBase>
          </Grid>

          {/* Film bilgileri */}
          <Grid item xs={7} sm container direction="column" spacing={1}>
            <TextWrapper>
              <Typography gutterBottom variant="h6" style={{fontSize:'16px'}}>
                {index + 1}. {movie.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {t('imdbtop100movies.Release Date')}: {new Date(movie.release_date).getFullYear()}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {t('imdbtop100movies.Score')}: {movie.vote_average}
              </Typography>
              
            </TextWrapper>
          </Grid>

          {/* Sağ alt köşeye AdsClickIcon ekliyoruz */}
          <div style={{ position: 'absolute', right: '10px', bottom: '10px' }}>
            <InfoIcon onClick={handleOpenModal} style={{ cursor: 'pointer' }} />
          </div>
        </Grid>
      </StyledPaper>

      {/* Modal */}
      {movieDetails && (
        <MovieDetailModal open={openModal} onClose={handleCloseModal} movie={movieDetails} />
      )}
    </>
  );
};

export default MovieGridItem;
