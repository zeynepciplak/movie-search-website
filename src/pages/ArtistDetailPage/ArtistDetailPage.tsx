import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchDirectorDetails, Director } from '../../api/tmdbApi';  // Sanatçı detaylarını çeken API fonksiyonu
import { Typography, Box, CardMedia } from '@mui/material';

const ArtistDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Parametre olarak gelen sanatçı id'si
  const [artist, setArtist] = useState<Director | null>(null);

  useEffect(() => {
    const getArtistDetails = async () => {
      if (id) {
        const artistData = await fetchDirectorDetails(Number(id), 'en-US');
        setArtist(artistData);
      }
    };
    getArtistDetails();
  }, [id]);

  if (!artist) return <Typography>Loading...</Typography>;

  return (
    <Box display="flex" padding={3}>
      <CardMedia
        component="img"
        image={artist.profile_path}
        alt={artist.name}
        sx={{ width: '30%', borderRadius: '10px', marginRight: 3 }}
      />
      <Box>
        <Typography variant="h4" gutterBottom>{artist.name}</Typography>
        <Typography variant="body1" gutterBottom>{artist.biography}</Typography>
      </Box>
    </Box>
  );
};

export default ArtistDetailPage;
