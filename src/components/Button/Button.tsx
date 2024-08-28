import React from 'react';
import Button from '@mui/material/Button';

const CustomButton: React.FC<React.ComponentProps<typeof Button>> = ({ children, variant, color, className, ...props }) => {
  return (
    <div><Button variant={variant} color={color} className={className} {...props}>
      {children}
    
    </Button></div>
  );
};

export default CustomButton;
