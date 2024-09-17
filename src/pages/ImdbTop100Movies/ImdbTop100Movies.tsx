import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Link } from '@mui/material';
import MovieGridItem from '../../MovieGridItem/MovieGridItem'; // Film bileşeni
import CustomButton from '../../components/Button/Button'; // Özel buton bileşeni
import GroupAvatars from '../../components/Icon/GroupAvatars'; // Avatar bileşeni
import { useTranslation } from 'react-i18next'; // Dil desteği için
import { fetchIMDbTop100Movies, fetchPopularArtists, fetchMovieDetails, Movie, MovieDetails } from '../../api/tmdbApi'; // API fonksiyonları
import { useNavigate } from 'react-router-dom';
import MovieDetailModal from '../../Modal/MovieDetailModal'; // Modal bileşenini import et
import { styled } from '@mui/material/styles';
import LaunchIcon from '@mui/icons-material/Launch';

const ImdbTop100Movies: React.FC = () => {
  const { i18n, t } = useTranslation(); // Mevcut dili ve çeviriyi al
  const [movies, setMovies] = useState<Movie[]>([]); // Filmler için state
  const [movieDetailsList, setMovieDetailsList] = useState<{ [key: number]: MovieDetails | null }>({}); // Film detayları için state
  const [page, setPage] = useState<number>(1); // Sayfa numarası
  const [hasMore, setHasMore] = useState<boolean>(true); // Daha fazla veri olup olmadığını kontrol etmek için
  const [artists, setArtists] = useState<any[]>([]); // Sanatçılar için state
  const [openModal, setOpenModal] = useState<boolean>(false); // Modal aç/kapa
  const [selectedMovie, setSelectedMovie] = useState<MovieDetails | null>(null); // Seçili film detayları
  const navigate = useNavigate();
  
  // Hover state'leri her iki link için ayrı ayrı
  const [hoverArtists, setHoverArtists] = useState(false);
  const [hoverAwards, setHoverAwards] = useState(false);
  const [hoverDirectors,setHoverDirectors]=useState(false);

  const currentLanguage = i18n.language; // Mevcut dil (tr-TR veya en-US gibi)

  const StyledButton = styled(CustomButton)({
    backgroundColor: '#3a3a3a',
    color: '#fbc02d', 
    borderRadius: '15px', // Yuvarlak köşeler
    fontSize: '0.7rem',
    padding: '6px 12px', 
   
    '&:hover': {
      backgroundColor: '#fbc02d', 
      color: '#fff', 
    },
  });

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
    return movieDetailsList[movieId]; // Detayları döndür
  };

  // Modalı açmak için seçili filmi alıyoruz
  const handleOpenModal = async (movieId: number) => {
    const movieDetails = await getMovieDetails(movieId);
    setSelectedMovie(movieDetails); // Seçilen filmi state'e atıyoruz
    setOpenModal(true); // Modalı aç
  };

  const handleCloseModal = () => {
    setOpenModal(false); // Modalı kapat
    setSelectedMovie(null); // Seçili filmi temizle
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
                fetchMovieDetails={() => handleOpenModal(movie.id)} // Filme tıklanınca modal aç
                movieDetails={movieDetailsList[movie.id]}
              />
            ))}
          </Grid>
        </Box>

        <Box flex="0.5" padding="28px" display="flex" flexDirection="column" alignItems="center">
          {/* Most Popular Artists Link */}
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

          {/* Award-Winning Movies Link */}
          <Box
            display="flex"
            alignItems="center"
            style={{ marginTop: '80px', cursor: 'pointer' }}
            onMouseEnter={() => setHoverAwards(true)}
            onMouseLeave={() => setHoverAwards(false)}
          >
            <Link href="/awardwinningmovies" underline="none" color="inherit">
              <Typography variant="h5">{t('Award Winning Movies')}</Typography>
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
              <Typography variant="h5">{t('Top Directors')}</Typography>
            </Link>
            <LaunchIcon sx={{ marginLeft: '8px', color: hoverDirectors ? '#FFD700' : 'inherit' }} />
            
          </Box>
        </Box>

        {/* Modal Bileşeni */}
        {selectedMovie && (
          <MovieDetailModal
            open={openModal}
            onClose={handleCloseModal}
            movie={selectedMovie} // Seçilen film detayları modalda gösterilecek
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
            onClick={() => setPage((prevPage) => prevPage + 1)} // Sayfa numarasını artır
          >
            {t('imdbtop100movies.Load More')}
          </StyledButton>
        )}
      </Box>
    </>
  );
};

export default ImdbTop100Movies;
