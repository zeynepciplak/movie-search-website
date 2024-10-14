import React, { useState, useEffect } from 'react';
import { Grid, Box,Typography} from '@mui/material';
import MediaCard from '../../components/MediaCard/MediaCard'; 
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton'; 
import { fetchAllSeries } from '../../api/tmdbApi'; 
import { Series } from '../../api/tmdbApi'; 
import { useTranslation } from 'react-i18next';
import LoadingIcon from '../../components/Loading/LoadingIcon'; 

const SeriesPage: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [series, setSeries] = useState<Series[]>([]);
  const [page, setPage] = useState<number>(1); 
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadSeries = async () => {
      setLoading(true);
      try {
        const fetchedSeries = await fetchAllSeries(i18n.language, page); 
        setSeries((prevSeries) => [...prevSeries, ...fetchedSeries]); 
      } catch (error) {
        console.error('Error fetching series:', error);
      }
      setLoading(false);
    };

    loadSeries();
  }, [i18n.language, page]);

  const handleLoadMore = async () => {  // async ekliyoruz
    setPage((prevPage) => prevPage + 1); 
  };

  return (
    <Box sx={{ padding: '20px' }}>
        <Typography variant="h4" gutterBottom>
        {t("hamburgerMenu.Series")}
      </Typography>
      {loading && page === 1 ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
          <LoadingIcon />
        </Box>
      ) : (
        <>
          <Grid container spacing={4} justifyContent="center">
            {series.map((serie) => (
              <MediaCard
                key={serie.id}
                title={serie.name}
                posterPath={`https://image.tmdb.org/t/p/w500${serie.poster_path}`}
                releaseDate={serie.first_air_date}
                xs={12} sm={6} md={4} lg={2}
              />
            ))}
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            {loading ? (
              <LoadingIcon /> 
            ) : (
              <LoadMoreButton onClick={handleLoadMore} label={t('imdbtop100movies.Load More')} />  
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default SeriesPage;
