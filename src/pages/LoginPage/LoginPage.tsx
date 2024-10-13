import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import './LoginPage.css';  
import { useTranslation } from 'react-i18next';
const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
   
    if (username === 'admin' && password === 'password') {
      alert('Login successful!');
      navigate('/'); // Başarılı girişten sonra anasayfaya yönlendir
    } else {
      alert('Invalid credentials!');
    }
  };

  return (
    <Grid container className="login-container">
      <Grid item xs={12} sm={8} md={4}>
        <Box className="login-box">
          <FontAwesomeIcon icon={faCircleUser} size="6x" className="login-icon" />
          <Typography variant="h4" gutterBottom>{t("login.Login")}</Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label={t("login.Username")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <TextField
              label={t("login.Password")}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth className="login-button">
             {t("login.Login")}
            </Button>
          </form>
        </Box>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
