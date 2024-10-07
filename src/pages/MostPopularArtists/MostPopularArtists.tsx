import React, { useEffect, useState } from 'react';
import { Grid, Box } from '@mui/material';
import { fetchPopularArtists } from '../../api/tmdbApi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MediaCard from '../../components/MediaCard/MediaCard'; // MediaCard bileşenini ekliyoruz
import LoadMoreButton from '../../components/LoadMoreButton/LoadMoreButton'; // LoadMoreButton bileşeni


interface Artist {
  id: number;
  name: string;
  imageSrc: string;
}

const MostPopularArtists: React.FC = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [page, setPage] = useState(1); // Sayfa numarasını takip eden state
  const [loading, setLoading] = useState(false); // Yükleme durumu yönetimi
  const navigate = useNavigate();
  const { i18n, t } = useTranslation(); 
  const currentLanguage = i18n.language;

  useEffect(() => {
    // Sayfa numarasına göre sanatçıları yükler
    const loadArtists = async () => {
      setLoading(true); // Yüklemeye başladığında butonu devre dışı bırak
      const fetchedArtists = await fetchPopularArtists(currentLanguage, page); // API çağrısı yaparken sayfa parametresini geç
      setArtists((prevArtists) => [...prevArtists, ...fetchedArtists]); // Yeni verileri önceki verilerin üstüne ekle
      setLoading(false); // Yükleme tamamlandığında butonu aktif et
    };
    loadArtists();
  }, [page, currentLanguage]);

  // "Daha fazla yükle" butonuna tıklandığında çalışacak fonksiyon
  const loadMoreArtists = async () => {
    setLoading(true);
    const fetchedArtists = await fetchPopularArtists(page);  // Verileri çek
    setArtists((prevArtists) => [...prevArtists, ...fetchedArtists]);  // Yeni verileri öncekiyle birleştir
    setPage(page + 1);  // Sayfa numarasını artır
    setLoading(false);
  };
  const handleArtistClick = (artistId: number) => {
    navigate(`/artist/${artistId}`);
  };

  return (
    <Box sx={{ padding: '20px' }}>
      <Grid container spacing={4} justifyContent="center">
        {artists.map((artist) => (
          <MediaCard
            key={artist.id}
            title={artist.name}
            posterPath={artist.imageSrc}
            releaseDate={''} // Sanatçılar için bir tarih olmayabilir, boş geçebiliriz.
            onClick={() => handleArtistClick(artist.id)} // Tıklama olayını yönlendirme için kullanıyoruz
            xs={12} sm={6} md={4} lg={2} // Grid boyutlarını burada belirleyebiliriz.
          />
        ))}
      </Grid>
      
      {/* LoadMoreButton'ı ekliyoruz */}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <LoadMoreButton
          onClick={loadMoreArtists}
          label={t('Load More')} // Buton üzerindeki metin, çeviri kullanıyoruz
        />
      </Box>
    </Box>
  );
};

export default MostPopularArtists;
