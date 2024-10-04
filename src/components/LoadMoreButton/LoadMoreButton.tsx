// LoadMoreButton.tsx
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

interface LoadMoreButtonProps {
  onClick: () => Promise<void>; // Asenkron fonksiyon, veri yüklenirken bekleyecek
  label: string; // Buton üzerindeki yazı
}

// Butonun stilini burada tanımlıyoruz
const StyledButton = styled(Button)({
  backgroundColor: '#3a3a3a',
  color: '#fbc02d',
  borderRadius: '15px',
  fontSize: '0.7rem',
  padding: '6px 12px',
  '&:hover': {
    backgroundColor: '#fbc02d',
    color: '#fff',
  },
});

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({ onClick, label }) => {
  const [isLoading, setIsLoading] = useState(false); // Yükleme durumu yönetimi

  // Butona tıklanınca async fonksiyon tetiklenir ve yükleme durumu kontrol edilir
  const handleClick = async () => {
    setIsLoading(true);
    await onClick(); // Butona verilen asenkron fonksiyon
    setIsLoading(false);
  };

  return (
    <StyledButton
      variant="contained"
      color="secondary"
      onClick={handleClick}
      disabled={isLoading} // Yükleme durumunda buton devre dışı olur
    >
      {isLoading ? 'Loading...' : label} {/* Yüklenme durumu */}
    </StyledButton>
  );
};

export default LoadMoreButton;
