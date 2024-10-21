import React, { useEffect, useState } from 'react';
import { fetchNewestSeries } from '../../api/tmdbApi'; 
import Grid from '@mui/material/Grid';
import { Box, Typography } from '@mui/material'; 
import MediaCard from '../../components/MediaCard/MediaCard';
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton';
import { useTranslation } from 'react-i18next';
import LoadingIcon from '../../components/Loading/LoadingIcon';

interface Series {
  id: number;
  name: string;
  poster_path: string;
  first_air_date: string;
}

const NewestSeries: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [series, setSeries] = useState<Series[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    const getSeries = async () => {
      setLoading(true);  // Yüklenme başladığında
      const data = await fetchNewestSeries(i18n.language, page);
      setSeries((prevSeries) => [...prevSeries, ...data]);
      setLoading(false);  // Yüklenme tamamlandığında
    };
    getSeries();
  }, [i18n.language, page]);

  const handleLoadMore = async () => {
    setPage((prevPage) => prevPage + 1); // Sayfa numarasını artır
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        {t('newest.Newest Series')}
      </Typography>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <LoadingIcon/> 
        </Box>
      ) : (
        <Grid container spacing={2}>
          {series.map((serie) => (
            <MediaCard
              key={serie.id}
              title={serie.name}
              posterPath={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
              releaseDate={serie.first_air_date}
              onClick={() => console.log(`Series clicked: ${serie.name}`)}
            />
          ))}
        </Grid>
      )}

      {!loading && (
        <Box style={{ textAlign: 'center', marginTop: '20px' }}>
          <LoadMoreButton
            onClick={handleLoadMore}
            label={t('imdbtop100movies.Load More')}
          />
        </Box>
      )}
    </div>
  );
};

export default NewestSeries;
