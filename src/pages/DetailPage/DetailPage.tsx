import { useEffect, useState } from "react";
import MostPopularArtistDetail from "../MostPopularArtistDetail/MostPopularArtistDetail";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  fetchArtistDetails,
  fetchMovieDetailsById,
  fetchTVDetails,
} from "../../api/tmdbApi";
import StarIcon from "@mui/icons-material/Star";
import "./DetailPage.css";

export default function DetailPage() {
  const { id, type } = useParams();
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>(
    localStorage.getItem("i18n") || i18n.language || "en-US"
  );
  const [details, setDetails] = useState<any>(null);

  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(i18n.language);
    };
    i18n.on("languageChanged", handleLanguageChange);

    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n]);

  useEffect(() => {
    async function fetchDetails() {
      if (id && type) {
        if (type === "movie") {
          const movie = await fetchMovieDetailsById(id, language);
          setDetails(movie);
        } else if (type === "tv") {
          const tv = await fetchTVDetails(id, language);
          setDetails(tv);
        } else if (type === "artist") {
          const artist = await fetchArtistDetails(id, language);
          setDetails(artist);
        }
      }
    }
    fetchDetails();
  }, [id, type, language]);

  if (!details) return <div>Loading...</div>;

  // Ortak Bilgiler
  const title = type === "movie" ? details.title : details.name;
  const posterUrl = `https://image.tmdb.org/t/p/w500${details.poster_path}`;
  const genres = details?.genres?.map((genre: any) => genre.name).join(", ");
  const overview = details.overview;
  const voteAverage = details.vote_average;

 
  let director;
  if (type === "movie") {
    director = details.credits.crew.find(
      (crew: any) => crew.job === "Director"
    );
  } else if (type === "tv") {
    director = details.credits.crew.find(
      (crew: any) => crew.job === "Director"
    );
  }

  const cast = details?.credits?.cast
    .slice(0, 5)
    .map((actor: any) => actor.name)
    .join(", ");

  return (
    <>
      {type === "movie" || type === "tv" ? (
        <div className="detail-page-container">
          <div className="detail-content">
            <div className="poster-section">
              <img src={posterUrl} alt={title} className="poster-image" />
            </div>
            <div className="info-section">
              <h1 className="title">{title}</h1>
              <p>
                <strong>{t("detail.Genres")}:</strong> {genres}
              </p>
              <p>
                <strong></strong>
                <StarIcon
                  sx={{
                    color: "#FFD700",
                    marginBottom: "6px",
                    verticalAlign: "bottom",
                    fontSize: "16px",
                  }}
                />{" "}
                {voteAverage}
              </p>
              {director && (
                <p>
                  <strong>{t("detail.Director")}:</strong> {director.name}
                </p>
              )}
              <p>
                <strong>{t("detail.Stars")}:</strong> {cast}
              </p>
            </div>
          </div>
          <div className="overview-section">
            <h2>{t("detail.Overview")}</h2>
            <p>{overview}</p>
          </div>
        </div>
      ) : (
        <MostPopularArtistDetail artist={details} />
      )}
    </>
  );
}
