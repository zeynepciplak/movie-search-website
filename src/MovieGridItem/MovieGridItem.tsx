import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { useTranslation } from 'react-i18next';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  height: '200px', 
  width: '150px',  
});

const StyledPaper = styled(Paper)({
  padding: '16px',
  margin: '16px auto',
  width: '85%', 
  maxWidth: '700px', 
  height: 'auto', // Kartın yüksekliği içerik kadar olsun
  backgroundColor: '#2e3134',
  color: '#fff',
  display: 'flex',
  flexDirection: 'row', 
  position: 'relative',
  border: 'none', 
  borderRadius: '0', 
  boxShadow: 'none',
  marginLeft: '50px'
});

const IndexTypography = styled(Typography)({
  color: 'rgba(255, 255, 255, 0.2)',
  position: 'absolute',
  left: 'calc(150px - 120px)', // Poster genişliği - offset ile ayarlıyoruz
  top: '0',
  height: '100%', // Kartın tamamını kapsayacak şekilde
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 'clamp(60px, 20vw, 150px)', // Dinamik font boyutu
  fontWeight: 'bold',
  overflow: 'hidden',
});

// Props olarak movie ve index (sıra numarası) alıyoruz
export interface MovieGridItemProps {
  movie: {
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: number;
    runtime: number;
    actors: string;
    genre: string;
    plot: string;
  };
  index: number; // Sıra numarası
}

const MovieGridItem: React.FC<MovieGridItemProps> = ({ movie, index }) => {
  const { t } = useTranslation();
  // Poster URL'sini oluşturuyoruz
  const posterURL = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/path/to/placeholder/image.jpg'; // Eğer poster yoksa placeholder görseli

  return (
    <StyledPaper>
      <Grid container spacing={2} alignItems="center" justifyContent="flex-start"> {/* Sol tarafa hizalıyoruz */}
        {/* Sıralama numarası */}
        <Grid item xs={1} >
          <IndexTypography variant="h1">
            {index + 1}
          </IndexTypography>
        </Grid>

        {/* Film posteri */}
        <Grid item xs={3}>
          <ButtonBase sx={{ width: '100%', height: 'auto' }}>
            <Img alt={movie.title} src={posterURL} />
          </ButtonBase>
        </Grid>

        {/* Film bilgileri */}
        <Grid item xs={8} sm container direction="column" spacing={2} >
          <Grid item xs>
            <Typography gutterBottom variant="h6">
              {movie.title} {/* Filmin adı */}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t('imdbtop100movies.Year')}: {new Date(movie.release_date).getFullYear()} {/* Filmin yılı */}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t('imdbtop100movies.Duration')}: {movie.runtime} dakika {/* Filmin süresi */}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t('imdbtop100movies.Actors')}: {movie.actors} {/* Filmin oyuncuları */}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t('imdbtop100movies.Genre')}:{movie.genre} {/* Filmin türü */}
            </Typography>
            <Typography variant="body2" gutterBottom>
              {t('imdbtop100movies.Subject')}: {movie.plot} {/* Filmin kısa konusu */}
            </Typography>
          </Grid>
        </Grid>
      </Grid >
    </StyledPaper>
  );
};

export default MovieGridItem;
