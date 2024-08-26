import React from 'react';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import{useNavigate} from 'react-router-dom';

const HomeButton:React.FC=()=>{
    const navigate=useNavigate();

    const handleHomeClick=()=>{
        navigate('/');//ana sayfaya yönlendir
    };
    return (
        <IconButton color="inherit" onClick={handleHomeClick}>
            <HomeIcon/>
        </IconButton>
    );
};
export default HomeButton;