import { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Movie, MovieDetails } from '../api/tmdbApi';
import { useTranslation } from 'react-i18next';
// Poster görseli için stil
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  height: '250px',
  width: '200px',
});

// Kartın dış yapısı
const StyledPaper = styled(Paper)({
  padding: '16px',
  margin: '16px auto',
  width: '85%',
  maxWidth: '700px',
  backgroundColor: '#2e3134',
  color: '#fff',
  display: 'flex',
  flexDirection: 'row',
  position: 'relative',
  border: 'none',
  borderRadius: '0',
  boxShadow: 'none',
  marginLeft: '50px',
});

// Movie arayüzü
export interface MovieGridItemProps {
  movie: Movie; // Movie tipinde bir prop bekleniyor
  index: number; // Index numarası da props olarak bekleniyor
  fetchMovieDetails: () => void; // Film detaylarını fetch etme fonksiyonu
  movieDetails: MovieDetails | null; // Film detayları
}

// Bileşen
const MovieGridItem: React.FC<MovieGridItemProps> = ({ movie, index, fetchMovieDetails, movieDetails }) => {
  const { t } = useTranslation();
  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);


const formatRuntime=(runtime:number)=>{
  const hours=Math.floor(runtime/60);
  const minutes=runtime%60;
  const hoursText = t('imdbtop100movies.hours');
  const minutesText = t('imdbtop100movies.minutes');
  return hours>0?`${hours} ${hoursText} ${minutes} ${minutesText}`:`${minutes} ${minutesText}`;
};
  return (
    <StyledPaper key={movie.id}>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
        {/* Film posteri */}
        <Grid item xs={3} style={{ zIndex: 2, position: 'relative' }}>
          <ButtonBase sx={{ width: '100%', height: 'auto' }}>
            <Img alt={movie.title} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
          </ButtonBase>
        </Grid>

        {/* Film bilgileri */}
        <Grid item xs={8} sm container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="h6">
              {index + 1}. {movie.title}
            </Typography>
            <Typography variant="body2" gutterBottom>
             {t('imdbtop100movies.Release Date')}: {new Date(movie.release_date).getFullYear()}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t('imdbtop100movies.Score')}: {movie.vote_average}
            </Typography>
            {movieDetails && (
              <>
                <Typography variant="body2" gutterBottom>
                  {t('imdbtop100movies.Genre')}: {movieDetails.genres?.map((genre) => genre.name).join(', ') || 'Bilinmiyor'}
                </Typography>
                <Typography variant="body2" gutterBottom>
                {t('imdbtop100movies.Artists')}: {movieDetails.cast?.map((actor) => actor.name).join(', ') || 'Bilinmiyor'}
                </Typography>
                <Typography variant="body2" gutterBottom>
                {t('imdbtop100movies.Subject')}: {movieDetails.overview || 'Bilinmiyor'}
                </Typography>
                <Typography variant="body2" gutterBottom>
                {t('imdbtop100movies.Duration')}: {movieDetails.runtime ? formatRuntime(movieDetails.runtime): 'Bilinmiyor'}
                </Typography>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default MovieGridItem;
