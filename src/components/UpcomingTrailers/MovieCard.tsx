import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CardMedia from '@mui/material/CardMedia';

// Props tanımlamaları
interface MovieCardProps {
  title: string;
  trailerUrl: string;
  posterUrl: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, trailerUrl, posterUrl }) => {
  const [open, setOpen] = useState(false); // Modal için state

  // Modal'ı açma ve kapatma işlemleri
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card sx={{ minWidth: 275, cursor: 'pointer', '&:hover': { transform: 'scale(1.05)', transition: '0.3s' } }} onClick={handleClickOpen}>
        {/* Poster */}
        <CardMedia
          component="img"
          height="200"
          image={posterUrl}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
            Movie of the Day
          </Typography>
          <Typography variant="h5" component="div">
            {title}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClickOpen}>
            Watch Trailer
          </Button>
        </CardActions>
      </Card>

      {/* Trailer Modal */}
      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>{title} - Trailer</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enjoy the trailer of {title}!
          </DialogContentText>
          {/* Trailer Embed */}
          <iframe
            width="100%"
            height="400"
            src={trailerUrl}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MovieCard;
