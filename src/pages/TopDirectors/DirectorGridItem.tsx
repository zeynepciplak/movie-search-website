import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import InfoIcon from '@mui/icons-material/Info';
import { Director } from '../../api/tmdbApi'; 
import { useTranslation } from 'react-i18next';
import StarIcon from '@mui/icons-material/Star';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
  height: '150px',
  width: '100px',
  objectFit: 'cover',
  borderRadius: '8px',
});

const StyledPaper = styled(Paper)({
  padding: '10px',
  margin: '8px auto',
  width: '85%',
  maxWidth: '95%',
  backgroundColor: '#2e3134',
  color: '#fff',
  display: 'flex',
  flexDirection: 'row',
  position: 'relative',
  border: 'none',
  borderRadius: '10px',
  boxShadow: 'none',
  marginLeft: '10px',
});

const TextWrapper = styled('div')({
  textAlign: 'left',
});

export interface DirectorGridItemProps {
  director: Director;
  index: number;
  fetchDirectorDetails: () => void;
}

const DirectorGridItem: React.FC<DirectorGridItemProps> = ({ director, index, fetchDirectorDetails }) => {
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    fetchDirectorDetails(); 
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <StyledPaper key={director.id}>
        <Grid container spacing={2} alignItems="center" justifyContent="flex-start">
          <Grid item xs={3} style={{ zIndex: 2, position: 'relative' }}>
            <ButtonBase sx={{ width: '100%', height: 'auto' }}>
              <Img
                alt={director.name}
                src={director.profile_path || 'https://via.placeholder.com/100x150?text=No+Image'}
              />
            </ButtonBase>
          </Grid>

          <Grid item xs={7} sm container direction="column" spacing={1}>
            <TextWrapper>
              <Typography gutterBottom variant="h6" style={{ fontSize: '16px' }}>
                {index + 1}. {director.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {t('Famous Movies')}:
              </Typography>
              {director.known_for.map((movie, idx) => (
                <Typography key={movie.id} variant="body2" gutterBottom>
                  <StarIcon
                    sx={{ color: '#FFD700', marginBottom: '3px', verticalAlign: 'bottom', fontSize: '16px' }}
                  />{' '}
                  {movie.title}
                </Typography>
              ))}
            </TextWrapper>
          </Grid>

          <div style={{ position: 'absolute', right: '10px', bottom: '10px' }}>
            <InfoIcon onClick={handleOpenModal} style={{ cursor: 'pointer' }} />
          </div>
        </Grid>
      </StyledPaper>

    </>
  );
};

export default DirectorGridItem;
