import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  height: '300px', // Poster dikey olacak şekilde ayarlandı
  width: '200px',  // Poster genişliği ayarlandı
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
  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 600,
        flexGrow: 1,
        backgroundColor: '#2e3134',
        color: '#fff',
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Sıralama numarası */}
        <Grid item xs={1}>
          <Typography variant="h4" sx={{ color: 'rgba(255, 255, 255, 0.2)' }}>
            {index + 1} {/* Soluk renkli sıralama numarası */}
          </Typography>
        </Grid>
        
        {/* Film posteri */}
        <Grid item xs={3}>
          <ButtonBase sx={{ width: '100%', height: 'auto' }}>
            <Img alt={movie.title} src={movie.poster_path} />
          </ButtonBase>
        </Grid>

        {/* Film bilgileri */}
        <Grid item xs={8} sm container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="h6">
              {movie.title} {/* Filmin adı */}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Yıl: {new Date(movie.release_date).getFullYear()} {/* Filmin yılı */}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Süre: {movie.runtime} dakika {/* Filmin süresi */}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Oyuncular: {movie.actors} {/* Filmin oyuncuları */}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Tür: {movie.genre} {/* Filmin türü */}
            </Typography>
            <Typography variant="body2" gutterBottom>
              Konu: {movie.plot} {/* Filmin kısa konusu */}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MovieGridItem;
