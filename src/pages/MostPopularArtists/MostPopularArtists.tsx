import React, { useEffect, useState } from 'react';
import { Grid, Box ,Typography} from '@mui/material';
import { fetchPopularArtists } from '../../api/tmdbApi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MediaCard from '../../components/MediaCard/MediaCard'; // MediaCard bileşenini ekliyoruz
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton'; // LoadMoreButton bileşeni
import LoadingIcon from '../../components/Loading/LoadingIcon';


interface Artist {
  id: number;
  name: string;
  imageSrc: string;
}

const MostPopularArtists: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [page, setPage] = useState(1); // Sayfa numarasını takip eden state
  const [loading, setLoading] = useState(false); // Yükleme durumu yönetimi
  const [initialLoading, setInitialLoading] = useState(true); // İlk yükleme durumu
  const navigate = useNavigate();
  const { i18n, t } = useTranslation(); 
  const currentLanguage = i18n.language;

  useEffect(() => {
    const loadArtists = async () => {
      setLoading(true);
      const fetchedArtists = await fetchPopularArtists(currentLanguage, page);
      setArtists((prevArtists) => [...prevArtists, ...fetchedArtists]);
      setLoading(false);
      setInitialLoading(false);
    };
    loadArtists();
  }, [page, currentLanguage]);

  const loadMoreArtists = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleArtistClick = (artistId: number) => {
    navigate(`/detail-page/${artistId}/artist`); // Detay sayfasına yönlendirme
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        {t("hamburgerMenu.Most Popular Artists")}
      </Typography>
      {initialLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
          <LoadingIcon />
        </Box>
      ) : (
        <>
          <Grid container spacing={4} justifyContent="center">
            {artists.map((artist) => (
              <MediaCard
                key={artist.id}
                title={artist.name}
                posterPath={artist.imageSrc}
                releaseDate={''} 
                onClick={() => handleArtistClick(artist.id)} // Sanatçıya tıklandığında detay sayfasına yönlendirme
                xs={12} sm={6} md={4} lg={2} 
              />
            ))}
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            {loading ? (
              <LoadingIcon />
            ) : (
              <LoadMoreButton
                onClick={loadMoreArtists}
                label={t('imdbtop100movies.Load More')} 
              />
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default MostPopularArtists;
