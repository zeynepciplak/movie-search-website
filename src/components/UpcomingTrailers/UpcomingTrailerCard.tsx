
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import ReactPlayer from 'react-player';

export interface TrailerCardProps {
  title: string;
  trailerUrl: string;
  releaseDate: string;
}

const UpcomingTrailerCard: React.FC<TrailerCardProps> = ({ title, trailerUrl, releaseDate }) => {
  return (
    <Card sx={{ maxWidth: 700, maxHeight: 800, margin: '10px' }}>
      <CardActionArea>
        <ReactPlayer
        url={trailerUrl}
        width="100%"
          height="400px"
          controls={true}
          playing={false}
          />
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
