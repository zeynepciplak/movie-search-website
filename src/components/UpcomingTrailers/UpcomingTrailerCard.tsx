// UpcomingTrailerCard.tsx
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

export interface TrailerCardProps {
  title: string;
  trailerUrl: string;
  releaseDate: string;
}

const UpcomingTrailerCard: React.FC<TrailerCardProps> = ({ title, trailerUrl, releaseDate }) => {
  return (
    <Card sx={{ maxWidth: 400, maxHeight: 500, margin: '10px' }}>
      <CardActionArea>
        <iframe
          width="100%"
          height="250"
          src={trailerUrl}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Release Date: {releaseDate}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UpcomingTrailerCard;
