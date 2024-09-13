import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import MovieGridItem from '../../MovieGridItem/MovieGridItem'; // Film bileşeni
import CustomButton from '../../components/Button/Button'; // Özel buton bileşeni
import GroupAvatars from '../../components/Icon/GroupAvatars'; // Avatar bileşeni
import { useTranslation } from 'react-i18next'; // Dil desteği için
import { fetchIMDbTop100Movies, fetchPopularArtists, fetchMovieDetails, Movie, MovieDetails } from '../../api/tmdbApi'; // API fonksiyonları
import { useNavigate } from 'react-router-dom';

const ImdbTop100Movies: React.FC = () => {
  const { i18n, t } = useTranslation(); // Mevcut dili ve çeviriyi al
  const [movies, setMovies] = useState<Movie[]>([]); // Filmler için state
  const [movieDetailsList, setMovieDetailsList] = useState<{ [key: number]: MovieDetails | null }>({}); // Film detayları için state
  const [page, setPage] = useState<number>(1); // Sayfa numarası
  const [hasMore, setHasMore] = useState<boolean>(true); // Daha fazla veri olup olmadığını kontrol etmek için
  const [artists, setArtists] = useState<any[]>([]); // Sanatçılar için state
  const navigate = useNavigate();

  const currentLanguage = i18n.language; // Mevcut dil (tr-TR veya en-US gibi)

  // Filmleri API'den çekiyoruz
  const getMovies = async () => {
    try {
      if (movies.length >= 100) {
        setHasMore(false); // 100'den fazla film yüklenmesin
        return;
      }

      const fetchedMovies = await fetchIMDbTop100Movies(currentLanguage); // Dili API'ye gönder
      if (fetchedMovies.length > 0) {
        const totalMovies = [...movies, ...fetchedMovies];
        setMovies(totalMovies.slice(0, 100)); // 100 filme kadar yükle
        if (totalMovies.length >= 100) {
          setHasMore(false); // 100'den fazla film yüklenmeyecek
        }
      } else {
        setHasMore(false); // Gelen sonuç yoksa daha fazla yok
      }
    } catch (error) {
      console.error('Filmleri çekerken bir hata oluştu:', error);
      setHasMore(false);
    }
  };

  const getMovieDetails = async (movieId: number) => {
    if (!movieDetailsList[movieId]) {
      const details = await fetchMovieDetails(movieId, currentLanguage); // Dil parametresi eklenir
      setMovieDetailsList((prevDetails) => ({
        ...prevDetails,
        [movieId]: details,
      }));
    }
  };

  // Sanatçıları çekiyoruz
  const fetchArtists = async () => {
    try {
      const allArtists = await fetchPopularArtists();
      setArtists(allArtists.slice(0, 5)); // İlk 5 sanatçıyı alıyoruz
    } catch (error) {
      console.error('Sanatçıları çekerken bir hata oluştu:', error);
    }
  };

  useEffect(() => {
    getMovies();
  }, [page, currentLanguage]); // Dil değiştiğinde filmleri yeniden yükler

  useEffect(() => {
    fetchArtists();
  }, []);

  // Sanatçı sayfasına yönlendirme
  const handleMostPopularArtistsClick = () => {
    navigate('/most-popular-artists');
  };

  return (
    <Box display="flex" justifyContent="space-between">
      <Box flex="1">
        <h1>{t('imdbtop100movies.Top 100 Movies')}</h1>
        <Grid container spacing={2}>
          {movies.map((movie, index) => (
            <MovieGridItem
              key={movie.id}
              movie={movie}
              index={index}
              fetchMovieDetails={() => getMovieDetails(movie.id)}
              movieDetails={movieDetailsList[movie.id]}
            />
          ))}
        </Grid>

        {hasMore && (
          <CustomButton
            variant="contained"
            color="secondary"
            onClick={() => setPage((prevPage) => prevPage + 1)} // Sayfa numarasını artır
          >
            {t('imdbtop100movies.Load More')}
          </CustomButton>
        )}
      </Box>

      <Box flex="0.5" padding="28px" display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h5" onClick={handleMostPopularArtistsClick} style={{ cursor: 'pointer' }}>
          {t('imdbtop100movies.Most Popular Artists')}
        </Typography>
        <GroupAvatars artists={artists} />
      </Box>
    </Box>
  );
};

export default ImdbTop100Movies;
