import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

interface MediaCardProps {
  title: string;
  posterPath: string;
  releaseDate: string;
  onClick?: () => void;
  xs?: number; 
  sm?: number; 
  md?: number; 
  lg?: number; 
  xl?: number; 
}

const StyledCard = styled(Card)({
  width: '100%',
  maxWidth: '180px',
  height: '320px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});

const StyledCardMedia = styled(CardMedia)({
  height: '240px',
  objectFit: 'cover',
});

const StyledCardContent = styled(CardContent)({
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  height: '80px',
});

const TitleTypography = styled(Typography)({
  fontSize: '1rem',
  fontWeight: 'bold',
  wordWrap: 'break-word',
  overflowWrap: 'break-word',
  whiteSpace: 'normal',
  textAlign: 'center',
});

const DateTypography = styled(Typography)({
  fontSize: '0.8rem',
  color: 'gray',
  marginTop: 'auto',
  textAlign: 'center',
});

const MediaCard: React.FC<MediaCardProps> = ({
  title,
  posterPath,
  releaseDate,
  onClick,
  xs = 12,
  sm = 6,
  md = 4,
  lg = 3,
  xl = 2,
}) => {
  return (
    <Grid item xs={xs} sm={sm} md={md} lg={lg} xl={xl}>
      <StyledCard onClick={onClick}>
        <StyledCardMedia
          //component="div" 
          image={posterPath}
          //alt={title}
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
