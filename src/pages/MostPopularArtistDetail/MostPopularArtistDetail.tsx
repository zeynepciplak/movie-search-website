import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Grid, Avatar } from '@mui/material';
import { fetchArtistDetails } from '../../api/tmdbApi';
import LoadingIcon from '../../components/Loading/LoadingIcon';
import { useTranslation } from 'react-i18next';


interface ArtistDetail {
  id: number;
  name: string;
  age: number;
  profilePath: string;
  knownFor: string[]; // Ünlü olduğu filmler veya diziler
}

const MostPopularArtistDetail: React.FC = () => {
    const { artistId } = useParams<{ artistId: string }>(); 
  const [artist, setArtist] = useState<ArtistDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const numericArtistId = artistId ? parseInt(artistId, 10) : 0;

  useEffect(() => {
    const loadArtistDetails = async () => {
      try {
        // fetchArtistDetails fonksiyonuna number olarak aktarıyoruz
        const artistDetails = await fetchArtistDetails(numericArtistId, i18n.language); 
        setArtist(artistDetails);
      } catch (error) {
        console.error('Error loading artist details:', error);
      }
    };
    if (numericArtistId) {
      loadArtistDetails();
    } else {
      console.error('Invalid artist ID');
    }
  }, [numericArtistId, i18n.language]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
        <LoadingIcon />
      </Box>
    );
  }

  if (!artist) {
    return <Typography>{`Artist not found!`}</Typography>;
  }

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={4}>
          <Avatar
            alt={artist.name}
            src={`https://image.tmdb.org/t/p/w500${artist.profilePath}`}
            sx={{ width: 300, height: 300 }}
          />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="h4">{artist.name}</Typography>
          <Typography variant="body1">{`Age: ${artist.age}`}</Typography>
          <Typography variant="h6" sx={{ marginTop: '20px' }}>Known For</Typography>
          <ul>
            {artist.knownFor.map((movie, index) => (
              <li key={index}>{movie}</li>
            ))}
          </ul>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MostPopularArtistDetail;
