

import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { fetchPopularArtists } from '../../api/tmdbApi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Artist {
  id: number;
  name: string;
  imageSrc: string;
}

const MostPopularArtists: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const navigate = useNavigate();
  const { i18n, t } = useTranslation(); 
  const currentLanguage = i18n.language;
  
  useEffect(() => {
    const loadArtists = async () => {
      const fetchedArtists = await fetchPopularArtists(currentLanguage);
      setArtists(fetchedArtists);
    };
    loadArtists();
  }, [currentLanguage]);

  const handleArtistClick = (artistId: number) => {
    navigate(`/artist/${artistId}`);
  };

  return (
    <Grid container spacing={4} justifyContent="center">
      {artists.map((artist) => (
        <Grid item key={artist.id} xs={12} sm={6} md={4}>
          <Card onClick={() => handleArtistClick(artist.id)} style={{ cursor: 'pointer' }}>
            <CardMedia
              component="img"
              alt={artist.name}
              image={artist.imageSrc}
              title={artist.name}
              style={{ height: '300px', objectFit: 'cover' }}
            />
            <CardContent>
              <Typography variant="h6" component="div">
                {artist.name}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default MostPopularArtists;
