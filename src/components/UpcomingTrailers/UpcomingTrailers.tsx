
import React, { useEffect, useState } from 'react';
import UpcomingTrailerCard, { TrailerCardProps } from './UpcomingTrailerCard';
import { Box, Grid, Typography } from '@mui/material';
import { fetchUpcomingTrailers, Trailer } from '../../api/tmdbApi';


const UpcomingTrailers: React.FC = () => {
  const [trailers, setTrailers] = useState<Trailer[]>([]);

  useEffect(() => {
    const getTrailers = async () => {
      const upcomingTrailers = await fetchUpcomingTrailers();
      setTrailers(upcomingTrailers);
    };
    getTrailers();
  }, []);

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Movies & TV Shows
      </Typography>
      <Grid container spacing={2}>
        {trailers.map((trailer, index) => (
          <Grid item key={index} xs={12} sm={6} md={6}>
            <UpcomingTrailerCard
              title={trailer.title}
              trailerUrl={trailer.trailerUrl}
              releaseDate={trailer.releaseDate}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UpcomingTrailers;
