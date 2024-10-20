import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';
import MovieGridItem from '../../MovieGridItem/MovieGridItem'; 
import GroupAvatars from '../../components/Icon/GroupAvatars'; 
import { useTranslation } from 'react-i18next';
import { fetchIMDbTop100Movies, fetchPopularArtists, fetchMovieDetails, Movie, MovieDetails } from '../../api/tmdbApi'; 
import { useNavigate } from 'react-router-dom';
import MovieDetailModal from '../../Modal/MovieDetailModal'; 
import LaunchIcon from '@mui/icons-material/Launch';
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton'; 
import LoadingIcon from '../../components/Loading/LoadingIcon';

const ImdbTop100Movies: React.FC = () => {
  const { i18n, t } = useTranslation(); 
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieDetailsList, setMovieDetailsList] = useState<{ [key: number]: MovieDetails | null }>({}); 
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true); 
  const [artists, setArtists] = useState<any[]>([]); 
  const [openModal, setOpenModal] = useState<boolean>(false); 
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null); 
  const [loading,setLoading]=useState<boolean>(true);
  const navigate = useNavigate();

  const [hoverArtists, setHoverArtists] = useState(false);
  const [hoverAwards, setHoverAwards] = useState(false);
  const [newestSeries,setNewestSeries]=useState(false);
  const [newestMovies,setNewestMovies]=useState(false);
  const currentLanguage = i18n.language;

  const handleLoadMore = async () => {
    setPage((prevPage) => prevPage + 1); // Sayfa numarasını artırıyoruz
  };

  const getMovies = useCallback(async (language: string, reset: boolean = false) => {
    setLoading(true);
    try {
      if (movies.length >= 100 && !reset) {
        setHasMore(false);
        return;
      }

      const fetchedMovies = await fetchIMDbTop100Movies(language , page); 
      if (fetchedMovies.length > 0) {
        const totalMovies = reset ? fetchedMovies : [...movies, ...fetchedMovies];
        setMovies(totalMovies.slice(0, 100));
        if (totalMovies.length >= 100) {
          setHasMore(false); 
        }
      } else {
        setHasMore(false); 
      }
    } catch (error) {
      console.error('Filmleri çekerken bir hata oluştu:', error);
      setHasMore(false);
    }finally{
      setLoading(false);
    }
  }, [page]);

  const getMovieDetails = useCallback(async (movieId: number) => {
    const details = await fetchMovieDetails(movieId, currentLanguage);
    setMovieDetailsList((prevDetails) => ({
      ...prevDetails,
      [movieId]: details,
    }));
    return details; 
  }, [currentLanguage]);

  const handleOpenModal = async (movieId: number) => {
    const movieDetails = await getMovieDetails(movieId);
    setSelectedMovie(movieDetails);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedMovie(null);
  };

  const fetchArtists = useCallback(async () => {
    try {
      const allArtists = await fetchPopularArtists(currentLanguage);
      setArtists(allArtists.slice(0, 5)); 
    } catch (error) {
      console.error('Sanatçıları çekerken bir hata oluştu:', error);
    }
  }, [currentLanguage]);

  useEffect(() => {
    getMovies(currentLanguage, true);
  }, [getMovies, currentLanguage]);

  useEffect(() => {
    fetchArtists();
  }, [fetchArtists, currentLanguage]);
  
  useEffect(() => {
    if (page > 1) {
      getMovies(currentLanguage, false); 
    }
  }, [page, getMovies, currentLanguage]);

  const handleMostPopularArtistsClick = () => {
    navigate('/most-popular-artists');
  };

  return (
    <>
      {loading ? ( // Loading durumunu kontrol ediyoruz
        <LoadingIcon /> // Yüklenirken LoadingIcon gösteriliyor
      ) : (
        <Box display="flex" justifyContent="space-between">
          <Box flex="1">
            <h1 className="h1">{t('imdbtop100movies.Top 100 Movies')}</h1>
            <Grid container spacing={2}>
              {movies.map((movie, index) => (
                <MovieGridItem
                  key={movie.id}
                  movie={movie}
                  index={index}
                  fetchMovieDetails={() => handleOpenModal(movie.id)} 
                  movieDetails={movieDetailsList[movie.id]}
                />
              ))}
            </Grid>

            {/* Load More Butonu */}
            <Box
              style={{
                display: 'flex',
                justifyContent: 'flex-end', // Sağ tarafa hizalar
                marginRight:'4rem',
                marginBottom:'30px',
              
              }}
            >
              <LoadMoreButton
                onClick={handleLoadMore}
                label={t('imdbtop100movies.Load More')}
              />
            </Box>
          </Box>

          <Box flex="0.5" padding="28px" display="flex" flexDirection="column" alignItems="center">
            <Box
              display="flex"
              alignItems="center"
              style={{ cursor: 'pointer' }}
              onMouseEnter={() => setHoverArtists(true)}
              onMouseLeave={() => setHoverArtists(false)}
            >
              <Link href="/most-popular-artists" underline="none" color="inherit">
                <Typography variant="h5" onClick={handleMostPopularArtistsClick}>
                  {t('imdbtop100movies.Most Popular Artists')}
                </Typography>
              </Link>
              <LaunchIcon sx={{ marginLeft: '8px', color: hoverArtists ? '#FFD700' : 'inherit' }} />
            </Box>

            <GroupAvatars artists={artists} />

            <Box
              display="flex"
              alignItems="center"
              style={{ marginTop: '80px', cursor: 'pointer' }}
              onMouseEnter={() => setHoverAwards(true)}
              onMouseLeave={() => setHoverAwards(false)}
            >
              <Link href="/awardwinningmovies" underline="none" color="inherit">
                <Typography variant="h5">{t('imdbtop100movies.Award Winning Movies')}</Typography>
              </Link>
              <LaunchIcon sx={{ marginLeft: '8px', color: hoverAwards ? '#FFD700' : 'inherit' }} />
            </Box>

            
            <Box
              display="flex"
              alignItems="center"
              style={{ marginTop: '80px', cursor: 'pointer' }}
              onMouseEnter={() => setNewestMovies(true)}
              onMouseLeave={() => setNewestMovies(false)}
            >
              <Link href="/newest-movies" underline="none" color="inherit">
                <Typography variant="h5">{t("hamburgerMenu.Newest Movies")}</Typography>
              </Link>
              <LaunchIcon sx={{ marginLeft: '8px', color: newestMovies? '#FFD700' : 'inherit' }} />
            </Box>
            <Box
              display="flex"
              alignItems="center"
              style={{ marginTop: '80px', cursor: 'pointer' }}
              onMouseEnter={() => setNewestSeries(true)}
              onMouseLeave={() => setNewestSeries(false)}
            >
              <Link href="/newest-series" underline="none" color="inherit">
                <Typography variant="h5">{t('hamburgerMenu.Newest Series')}</Typography>
              </Link>
              <LaunchIcon sx={{ marginLeft: '8px', color: newestSeries ? '#FFD700' : 'inherit' }} />
            </Box>
          </Box>
          

          {selectedMovie && (
            <MovieDetailModal
              open={openModal}
              onClose={handleCloseModal}
              movie={selectedMovie}
            />
          )}
        </Box>
      )}
    </>
  );
};
export default ImdbTop100Movies;
