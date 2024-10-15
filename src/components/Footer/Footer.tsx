import React from 'react';
import { Grid, Box, Typography, TextField, Button, Link, IconButton } from '@mui/material';
import { Email, Phone, Facebook, Google, Twitter, Instagram } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import './Footer.css'; // CSS dosyasını import ediyoruz
import FooterLogo from '../../assets/FooterLogo.png';

const Footer: React.FC = () => {
    const { t } = useTranslation();
  return (
    <Box className="footer-container">
      <Grid container spacing={4} justifyContent="space-between">
       
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" className="footer-title"><img
              src={FooterLogo} 
              alt="Your Logo"
              style={{ width: '150px', height: '150px' }} // Logonun genişliği ve yüksekliği
            /></Typography>
         
          <Typography className="footer-contact">{t("footer.Contact Us")}</Typography>
          <Box className="footer-contact-info">
            <Phone /> +91 9999 999 999 <br />
            <Email /> youremailid.com
          </Box>
        </Grid>

        {/* Information Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" className="footer-title">{t("footer.Information")}</Typography>
          <Box>
            <Link href="#" className="footer-link">{t("footer.About Us")}</Link><br />
            <Link href="#" className="footer-link">{t("footer.More Search")}</Link><br />
            <Link href="#" className="footer-link">{t("footer.Blog")}</Link><br />
            <Link href="#" className="footer-link">{t("footer.Testimonials")}</Link><br />
            <Link href="#" className="footer-link">{t("footer.Events")}</Link>
          </Box>
        </Grid>

        {/* Helpful Links */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" className="footer-title">{t("footer.Helpful Links")}</Typography>
          <Box>
            <Link href="#" className="footer-link">{t("footer.Services")}</Link><br />
            <Link href="#" className="footer-link">{t("footer.Supports")}</Link><br />
            <Link href="#" className="footer-link">{t("footer.Terms & Condition")}</Link><br />
            <Link href="#" className="footer-link">{t("footer.Privacy Policy")}</Link>
          </Box>
        </Grid>

        {/* Subscription Box */}
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="h6" className="footer-title">{t("footer.Subscribe For More")}</Typography>
          <TextField label={t("footer.Enter your Email")} variant="outlined" className="footer-input" />
          <Button variant="contained" className="footer-button">{t("footer.Subscribe")}</Button>
        </Grid>
      </Grid>

      {/* Social Media Icons */}
      <Box className="footer-social">
        <IconButton className="footer-social-icon"><Facebook /></IconButton>
        <IconButton className="footer-social-icon"><Google /></IconButton>
        <IconButton className="footer-social-icon"><Twitter /></IconButton>
        <IconButton className="footer-social-icon"><Instagram /></IconButton>
      </Box>

      {/* Footer Bottom Line */}
      <Typography className="footer-bottom-text">{t("footer.© 2024 Your Company, Ltd. All rights reserved.")}</Typography>
    </Box>
  );
};

export default Footer;
