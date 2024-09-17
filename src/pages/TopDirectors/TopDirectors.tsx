import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { fetchPopularDirectors, Director } from '../../api/tmdbApi';
import DirectorGridItem from './DirectorGridItem'; // DirectorGridItem bileşeni

const TopDirectors: React.FC = () => {
  const [directors, setDirectors] = useState<Director[]>([]);

  useEffect(() => {
    const loadDirectors = async () => {
      const fetchedDirectors = await fetchPopularDirectors();
      setDirectors(fetchedDirectors);
    };

    loadDirectors();
  }, []);

  return (
    <Grid container spacing={2}>
      {directors.map((director, index) => (
        <Grid item xs={12} sm={6} md={4} key={director.id}>
          <DirectorGridItem director={director} index={index + 1} fetchDirectorDetails={() => console.log(director.name)} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TopDirectors;
