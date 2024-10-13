import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';

const LoadingIcon: React.FC = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <CircularProgress 
        disableShrink 
        sx={{ color: '#FFD700' }} // Burada kendi sarı rengini kullanıyoruz
      />
    </Box>
  );
};

export default LoadingIcon;
