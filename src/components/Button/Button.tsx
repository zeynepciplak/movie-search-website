import React from 'react';
import Button from '@mui/material/Button';

const CustomButton: React.FC<React.ComponentProps<typeof Button>> = ({ children, variant, color, className, ...props }) => {
  return (
    <Button variant={variant} color={color} className={className} {...props}>
      {children}
    </Button>
  );
};

export default CustomButton;
