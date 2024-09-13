import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';

export interface MovieCardProps {
  title: string;           // Film veya dizinin başlığı
  trailerUrl: string;      // YouTube trailer URL'si
  releaseDate: string;     // Yayınlanma tarihi
  mediaType: 'movie' | 'tv'; // Filmin mi dizinin mi olduğunu belirtir
  onError?: () => void;     // Hata durumunda ne yapılacağını belirtir
  onClick: () => void;
}

// MovieCard bileşeni, Trailer bilgilerini kart şeklinde gösterir
const MovieCard: React.FC<MovieCardProps> = ({ title, trailerUrl, releaseDate, mediaType, onError }) => {
  return (
    <Card sx={{ maxWidth: 200, cursor: 'pointer' }} onClick={onError}>
      <CardMedia
        component="img"
        height="300"
        image={`https://image.tmdb.org/t/p/w500${mediaType === 'movie' ? 'movie_poster_path' : 'tv_poster_path'}`} // Filmin ya da dizinin posterini ekleriz
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Release Date: {releaseDate}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Type: {mediaType === 'movie' ? 'Film' : 'Dizi'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
