import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

interface MediaCardProps {
  title: string;
  posterPath: string;
  releaseDate: string;
  onClick?: () => void;
  xs?: number; // Mobil ekranlar için
  sm?: number; // Tablet ekranlar için
  md?: number; // Orta boyutlu ekranlar için
  lg?: number; // Büyük ekranlar için
  xl?: number; // Çok büyük ekranlar için
}

// Styled Card component
const StyledCard = styled(Card)({
  width: '100%', // Responsive genişlik
  maxWidth: '160px', // Kart genişliği daha dar olacak
  height: '320px', // Kart yüksekliği sabit
  display: 'flex',
  flexDirection: 'column',
});

const StyledCardMedia = styled(CardMedia)({
  height: '70%', // Kartın %70'i poster için ayrılacak
  objectFit: 'cover',
});

const StyledCardContent = styled(CardContent)({
  height: '30%', // Kartın %30'u içerik için ayrılacak
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  overflow: 'hidden', // Karttan taşmayı engeller
});

const TitleTypography = styled(Typography)({
  fontSize: '1rem',
  fontWeight: 'bold',
  wordWrap: 'break-word', // Başlık alt satıra geçebilir
  display: '-webkit-box',
  WebkitLineClamp: 2, // İki satırda kes
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden', // Taşmayı önle
});

const DateTypography = styled(Typography)({
  fontSize: '0.8rem',
  color: 'gray',
  marginTop: 'auto', // Tarihi başlığın altına yerleştirir
});

const MediaCard: React.FC<MediaCardProps> = ({
  title,
  posterPath,
  releaseDate,
  onClick,
  xs = 12, // Mobilde tam genişlik (1 kart)
  sm = 6,  // Tabletlerde 2 kart
  md = 3,  // Orta ekranlarda 4 kart
  lg = 2,  // Büyük ekranlarda 6 kart
  xl = 2,  // Çok büyük ekranlarda 6 kart
}) => {
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <StyledCard onClick={onClick}>
        <StyledCardMedia
          component="img"
          image={posterPath} // Poster yolu
          alt={title} // Alt metin
          sx={{
            height: '70%', // Poster alanı kartın %70'ini kaplayacak
            objectFit: 'cover', // Posteri düzgün kes
          }}
        />
        <StyledCardContent>
          <TitleTypography variant="h6">
            {title}
          </TitleTypography>
          <DateTypography variant="body2">
            {new Date(releaseDate).toLocaleDateString(undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </DateTypography>
        </StyledCardContent>
      </StyledCard>
    </Grid>
  );
};

export default MediaCard;
