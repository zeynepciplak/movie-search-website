import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import { fetchPopularDirectors, Director } from '../../api/tmdbApi';
import DirectorGridItem from './DirectorGridItem'; // DirectorGridItem bileşeni
import { useTranslation } from 'react-i18next';

const TopDirectors: React.FC = () => {
  const [directors, setDirectors] = useState<Director[]>([]);
  const { i18n, t } = useTranslation(); 
  const currentLanguage = i18n.language;
 useEffect(() => {
    const loadDirectors = async () => {
      const fetchedDirectors = await fetchPopularDirectors(currentLanguage); // Dil parametresi eklendi
      setDirectors(fetchedDirectors);
    };

    loadDirectors();
  }, [currentLanguage]); // currentLanguage'yi dependency olarak ekledik

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