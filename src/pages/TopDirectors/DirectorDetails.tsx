import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDirectorDetails } from '../../api/tmdbApi';
import { Box, Typography, CircularProgress, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
}

interface Director {
  id: number;
  name: string;
  biography: string;
  profile_path: string | null;
  known_for: Movie[];
}

const DirectorDetails: React.FC = () => {
  const { directorId } = useParams<{ directorId: string }>();
  const [director, setDirector] = useState<Director | null>(null);
  const [loading, setLoading] = useState(true);
  const { i18n, t } = useTranslation(); 
  const currentLanguage = i18n.language;

  useEffect(() => {
    const loadDirectorDetails = async () => {
      try {
        if (directorId) {
          console.log("Director ID:", directorId);
          const fetchedDirector = await fetchDirectorDetails(parseInt(directorId), currentLanguage);
          console.log("Fetched Director:", fetchedDirector);  // Burada veriyi kontrol ediyoruz
          setDirector(fetchedDirector);
        }
      } catch (error) {
        console.error("Director API call failed:", error);  // Hata olursa burada gösterecek
      } finally {
        setLoading(false);
      }
    };

    loadDirectorDetails();
  }, [directorId, currentLanguage]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!director) {
    return <Typography>{t('Director not found')}</Typography>;  // Hata durumunda boş veri gelirse bu mesajı verir
  }

  return (
    <Box padding="16px">
      <Typography variant="h4">{director.name}</Typography>
      <Box display="flex" marginTop="16px">
        {director.profile_path ? (
          <img
            src={director.profile_path}
            alt={director.name}
            style={{ width: '200px', height: '300px', marginRight: '16px' }}
          />
        ) : (
          <img
            src="https://via.placeholder.com/200x300?text=No+Image"
            alt="No image available"
            style={{ width: '200px', height: '300px', marginRight: '16px' }}
          />
        )}
        <Box>
          <Typography variant="body1">{director.biography}</Typography>
        </Box>
      </Box>

      <Typography variant="h5" marginTop="32px">
        {t('Known For')}
      </Typography>
      <Grid container spacing={2} marginTop="16px">
        {director.known_for.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={3}>
            {movie.poster_path ? (
              <img
                src={movie.poster_path}
                alt={movie.title}
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            ) : (
              <img
                src="https://via.placeholder.com/200x300?text=No+Poster"
                alt="No poster available"
                style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
              />
            )}
            <Typography variant="body2" textAlign="center">
              {movie.title}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DirectorDetails;
