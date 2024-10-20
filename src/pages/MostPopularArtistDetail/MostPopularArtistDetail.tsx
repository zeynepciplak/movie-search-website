import { Avatar, Box, Grid, Typography, Divider } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import StarIcon from "@mui/icons-material/Star";

interface Artist {
  name: string;
  profile_path: string;
  birthday: string;
  popularity: number;
  place_of_birth: string;
  also_known_as: string[];
  biography: string;
}

interface MostPopularArtistDetailProps {
  artist: Artist;
}

function calculateAge(birthday: string): number {
  const birthDate = new Date(birthday);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

export default function MostPopularArtistDetail({
  artist,
}: MostPopularArtistDetailProps) {
  const age = calculateAge(artist.birthday);
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        padding: "20px",
        backgroundColor: "#2e3134",
        borderRadius: "10px",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <Grid container spacing={4}>
        {/* Profil Resmi */}
        <Grid
          item
          xs={12}
          sm={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Avatar
            alt={artist.name}
            src={`https://image.tmdb.org/t/p/w500${artist.profile_path}`}
            sx={{
              width: 280,
              height: 280,
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
              border: "4px solid #fff",
              borderRadius: "50%",
            }}
          />
        </Grid>

        {/* Sanatçı Bilgileri */}
        <Grid item xs={12} sm={8}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "10px",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#fff" }}>
              {artist.name}
            </Typography>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#FFD700",
                fontSize: "1.2rem",
              }}
            >
              <StarIcon
                sx={{ color: "#FFD700", fontSize: "24px", marginRight: "5px" }}
              />
              {artist.popularity.toFixed(1)}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{ color: "#bdbdbd", marginBottom: "8px" }}
          >
            {t("detailArtist.Age")}: {age}
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "#bdbdbd", marginBottom: "8px" }}
          >
            {t("detailArtist.Brithday")}: {artist.birthday}
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: "#bdbdbd", marginBottom: "8px" }}
          >
            {t("detailArtist.PlaceBirth")}: {artist.place_of_birth}
          </Typography>

          <Divider sx={{ marginY: "15px", backgroundColor: "#4f4f4f" }} />

          <Typography
            variant="h6"
            sx={{ color: "#fff", fontWeight: "bold", marginBottom: "10px" }}
          >
            {t("detailArtist.Biography")}
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "#bdbdbd", lineHeight: "1.6" }}
          >
            {artist.biography}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
