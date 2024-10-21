import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingIcon from "../Loading/LoadingIcon";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { Box } from "@mui/material";

// MovieCardProps Arayüzünü Tanımlama
interface MovieCardProps {
  title: string;
  trailerUrl: string;
  videoId: string;
}

// Styled Card
const StyledCard = styled(Card)({
  minWidth: 275,
  cursor: "pointer",
  borderRadius: "15px", 
  overflow: "hidden",
  transition: "0.3s",
  border: "2px solid transparent",
  margin: "8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  backgroundColor: "#2e3134", 

  "&:hover": {
    borderColor: "#fbc02d",
  },

  "@media (max-width: 600px)": {
    minWidth: "100%",
  },

  "@media (min-width: 600px)": {
    minWidth: "275px",
  },
});

// Styled CardMedia
const StyledCardMedia = styled("img")({
  width: "100%",
  height: 150,
  objectFit: "cover",
});

// Styled Button
const StyledButton = styled(Button)({
  backgroundColor: "#3a3a3a",
  color: "#fbc02d",
  borderRadius: "15px",
  fontSize: "0.8rem",
  padding: "8px 16px",
  "&:hover": {
    backgroundColor: "#fbc02d",
    color: "#fff",
  },
});

const MovieCard: React.FC<MovieCardProps> = ({
  title,
  trailerUrl,
  videoId,
}) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 saniyelik simüle edilmiş yükleme süresi

    return () => clearTimeout(timer); // Component unmount olduğunda timeout'u temizle
  }, []);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <StyledCard onClick={handleClickOpen}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "150px",
              width: "100%",
            }}
          >
            <LoadingIcon />
          </Box>
        ) : (
          <StyledCardMedia
            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
            alt={title}
          />
        )}
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ fontSize: "0.9rem" }}>
            {title}
          </Typography>
        </CardContent>
        <StyledButton onClick={handleClickOpen}>
          {t("UpComing.Watch Trailer")}
        </StyledButton>
      </StyledCard>

      <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
        <DialogTitle>
          {title} - {t("UpComing.Trailer")}
        </DialogTitle>
        <DialogContent>
          <iframe
            width="100%"
            height="400"
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </DialogContent>
        <DialogActions>
          <StyledButton onClick={handleClose}>
            {t("UpComing.Close")}
          </StyledButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MovieCard;
