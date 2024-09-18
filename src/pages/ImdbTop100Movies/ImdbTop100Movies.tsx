import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';
import MovieGridItem from '../../MovieGridItem/MovieGridItem'; 
import CustomButton from '../../components/Button/Button'; 
import GroupAvatars from '../../components/Icon/GroupAvatars'; 
import { useTranslation } from 'react-i18next';
import { fetchIMDbTop100Movies, fetchPopularArtists, fetchMovieDetails, Movie, MovieDetails } from '../../api/tmdbApi'; 
import { useNavigate } from 'react-router-dom';
import MovieDetailModal from '../../Modal/MovieDetailModal'; 
import { styled } from '@mui/material/styles';
import LaunchIcon from '@mui/icons-material/Launch';

const ImdbTop100Movies: React.FC = () => {
  const { i18n, t } = useTranslation(); 
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieDetailsList, setMovieDetailsList] = useState<{ [key: number]: MovieDetails | null }>({}); 
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true); 
  const [artists, setArtists] = useState<any[]>([]); 
  const [openModal, setOpenModal] = useState<boolean>(false); 
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null); 
  const navigate = useNavigate();

  const [hoverArtists, setHoverArtists] = useState(false);
  const [hoverAwards, setHoverAwards] = useState(false);
  const [hoverDirectors, setHoverDirectors] = useState(false);

  const currentLanguage = i18n.language;

  const StyledButton = styled(CustomButton)({
    backgroundColor: '#3a3a3a',
    color: '#fbc02d',
    borderRadius: '15px',
    fontSize: '0.7rem',
    padding: '6px 12px',
    '&:hover': {
      backgroundColor: '#fbc02d',
      color: '#fff',
    },
  });

  const getMovies = useCallback(async (language: string, reset: boolean = false) => {
    try {
      if (movies.length >= 100 && !reset) {
        setHasMore(false);
        return;
      }

      const fetchedMovies = await fetchIMDbTop100Movies(language); 
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
    }
  }, [movies]);

  const getMovieDetails = useCallback(async (movieId: number) => {
    if (!movieDetailsList[movieId]) {
      const details = await fetchMovieDetails(movieId, currentLanguage);
      setMovieDetailsList((prevDetails) => ({
        ...prevDetails,
        [movieId]: details,
      }));
    }
    return movieDetailsList[movieId];
  }, [currentLanguage, movieDetailsList]);

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
      const allArtists = await fetchPopularArtists();
      setArtists(allArtists.slice(0, 5)); 
    } catch (error) {
      console.error('Sanatçıları çekerken bir hata oluştu:', error);
    }
  }, []);

  useEffect(() => {
    getMovies(currentLanguage, true);
    fetchArtists();
  }, [getMovies, fetchArtists, currentLanguage]);

  const handleMostPopularArtistsClick = () => {
    navigate('/most-popular-artists');
  };

  return (
    <>
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
            onMouseEnter={() => setHoverDirectors(true)}
            onMouseLeave={() => setHoverDirectors(false)}
          >
            <Link href="/topdirectors" underline="none" color="inherit">
              <Typography variant="h5">{t('imdbtop100movies.Top Directors')}</Typography>
            </Link>
            <LaunchIcon sx={{ marginLeft: '8px', color: hoverDirectors ? '#FFD700' : 'inherit' }} />
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

      <Box
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginLeft: '16rem',
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
      >
        {hasMore && (
          <StyledButton
            variant="contained"
            color="secondary"
            onClick={() => setPage((prevPage) => prevPage + 1)}
          >
            {t('imdbtop100movies.Load More')}
          </StyledButton>
        )}
      </Box>
    </>
  );
};

export default ImdbTop100Movies;
