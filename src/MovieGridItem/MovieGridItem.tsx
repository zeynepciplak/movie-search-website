// MovieGridItem.tsx
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { Movie } from '../api/tmdbApi';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

interface MovieGridItemProps {
  movie: Movie;
  index: number;
}

const MovieGridItem: React.FC<MovieGridItemProps> = ({ movie, index }) => {
  return (
    <Paper
      sx={{
        p: 2,
        margin: 'auto',
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: '#fff',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 192 }}>
            <Img alt={movie.title} src={movie.poster_path} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h6" component="div">
                {index + 1}. {movie.title} ({movie.release_date})
              </Typography>
              <Typography variant="body2" gutterBottom>
                IMDb Rating: {movie.vote_average}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MovieGridItem;
