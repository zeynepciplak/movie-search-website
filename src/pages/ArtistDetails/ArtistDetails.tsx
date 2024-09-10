import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

interface Artist {
  id: number;
  name: string;
  birthday: string;
  biography: string;
  imageSrc: string;
}

const ArtistDetails: React.FC = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/person/${artistId}?api_key=99cd5d08a91b7c3308edfd32c078eb7a`
      );
      setArtist({
        id: response.data.id,
        name: response.data.name,
        birthday: response.data.birthday,
        biography: response.data.biography,
        imageSrc: `https://image.tmdb.org/t/p/w500${response.data.profile_path}`,
      });
    };

    fetchArtistDetails();
  }, [artistId]);

  return artist ? (
    <Card>
      <CardMedia
        component="img"
        alt={artist.name}
        image={artist.imageSrc}
        title={artist.name}
        style={{ width: '300px', height: 'auto' }}
      />
      <CardContent>
        <Typography variant="h5">{artist.name}</Typography>
        <Typography variant="body2">Doğum Günü: {artist.birthday}</Typography>
        <Typography variant="body2">{artist.biography}</Typography>
      </CardContent>
    </Card>
  ) : (
    <p>Sanatçı bilgileri yükleniyor...</p>
  );
};

export default ArtistDetails;
