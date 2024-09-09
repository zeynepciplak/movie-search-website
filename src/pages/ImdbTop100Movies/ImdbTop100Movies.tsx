import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MovieGridItem from '../../MovieGridItem/MovieGridItem'; // Movie kart bileşeni
import CustomButton from '../../components/Button/Button'; // MUI Button
import { Box, Grid } from '@mui/material';
import GroupAvatars from '../../components/Icon/GroupAvatars';
import { useTranslation } from 'react-i18next';

// Gecikme fonksiyonu (API isteklerini yavaşlatmak için)
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ImdbTop100Movies: React.FC = () => {
   const { t } = useTranslation();
   const [movies, setMovies] = useState<any[]>([]); // Filmleri tutacak state
   const [page, setPage] = useState<number>(1); // Sayfa kontrolü (her sayfada 20 film, başta 1. sayfa)
   const [loading, setLoading] = useState<boolean>(false); // Yüklenme durumu
   const [hasMore, setHasMore] = useState<boolean>(true); // Daha fazla film var mı kontrolü

   // Sanatçı verileri
   const artists = [
      { name: 'Remy Sharp', imageSrc: '/static/images/avatar/1.jpg' },
      { name: 'Travis Howard', imageSrc: '/static/images/avatar/2.jpg' },
      { name: 'Cindy Baker', imageSrc: '/static/images/avatar/3.jpg' },
      { name: 'Agnes Walker', imageSrc: '/static/images/avatar/4.jpg' },
      { name: 'Trevor Henderson', imageSrc: '/static/images/avatar/5.jpg' },
    ];
  
   const apiKey = '99cd5d08a91b7c3308edfd32c078eb7a'; // TMDB API key
   const baseURL = 'https://api.themoviedb.org/3';

   // Film yükleme fonksiyonu
   const loadMovies = useCallback(async () => {
      try {
         setLoading(true);
         await delay(1000); // 1 saniye gecikme ekliyoruz (her API isteği için)
         const response = await axios.get(`${baseURL}/movie/top_rated`, {
            params: {
               api_key: apiKey,
               language: 'en-US', // Verileri İngilizce dilinde almak için
               page: page, // Sayfa kontrolü
            },
         });

         const fetchedMovies = response.data.results; // API'den gelen filmler
         setMovies((prevMovies) => [...prevMovies, ...fetchedMovies]); // Filmleri state'e ekle
         setPage((prevPage) => prevPage + 1); // Bir sonraki sayfa için page arttır

         if (page >= 5) {
            setHasMore(false); // Daha fazla yükleme yapma
         }

         setLoading(false);
      } catch (error) {
         console.error('API isteği başarısız:', error);
         setLoading(false);
      }
   }, [page]);

   useEffect(() => {
      loadMovies(); // İlk 20 filmi yükle
   }, [loadMovies]); // Sayfa açıldığında sadece bir kez çalışır

   return (
      <Box display="flex" justifyContent="space-between">
         {/* Filmler Bölümü */}
         <Box flex="1" >
            <h1>{t('ImdbTop100Movies.Top 100 Movies')}</h1>
            <Grid container spacing={2}>
               {movies.map((movie, index) => (
                  <MovieGridItem key={index} movie={movie} index={index} /> 
               ))}
            </Grid>
            {/* Daha fazla butonu */}
            <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
               {hasMore && (
                  <CustomButton
                     variant="contained"
                     color="secondary"
                     onClick={loadMovies}
                     disabled={loading}
                  >
                     {loading ? 'Loading...' : t('imdbtop100movies.Load More')}
                  </CustomButton>
               )}
            </Box>
         </Box>

         {/* Sanatçılar Bölümü */}
         <Box flex="0.3" padding="16px">
            <h2>{t("Today's Top Artists")}</h2>
            <GroupAvatars artists={artists} />
         </Box>
      </Box>
   );
};

export default ImdbTop100Movies;
