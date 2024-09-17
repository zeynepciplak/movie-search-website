import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

// MovieCardProps Arayüzünü Tanımlama
interface MovieCardProps {
  title: string;
  trailerUrl: string;
  videoId: string;
}

// Styled Card
const StyledCard = styled(Card) ({
  minWidth: 275,
  cursor: 'pointer',
  borderRadius: '15px',
  overflow: 'hidden',
  transition: '0.3s',
  border: '2px solid transparent',
  '&:hover': {
    borderColor: '#b3e5fc',
  },
  margin: '8px',
  display:'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

// Styled CardMedia
const StyledCardMedia = styled('img')({
  width: '100%',  // Fotoğrafın genişliğini karta göre ayarla
  height: 150,    // Fotoğraf yüksekliğini ayarla
  objectFit: 'cover',  // Fotoğrafın kapsama modunu ayarla
  
});

// Styled Button
const StyledButton = styled(Button) ({
  backgroundColor: '#3a3a3a',
  color: '#fbc02d', 
  borderRadius: '15px', // Yuvarlak köşeler
  fontSize: '0.7rem',
  padding: '6px 12px', 
  
  '&:hover': {
    backgroundColor: '#fbc02d', 
    color: '#fff', 
  },
});

const MovieCard: React.FC<MovieCardProps> = ({ title, trailerUrl, videoId }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 const {t}=useTranslation();
  return (
    <>
      <StyledCard onClick={handleClickOpen}>
        <StyledCardMedia
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
        />
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontSize: '0.9rem' }}>
            {title}
          </Typography>
        </CardContent>
        <StyledButton onClick={handleClickOpen}>
          {t('UpComing.Watch Trailer')}
        </StyledButton>
      </StyledCard>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>{title} - {t('UpComing.Trailer')}</DialogTitle>
        <DialogContent>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleClose}>{t('UpComing.Close')}</StyledButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MovieCard;
