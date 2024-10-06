import React, { useState, useEffect } from 'react';
import Slider from '../../components/Slider/Slider';
import { fetchPopularTVShows ,fetchPopularMovies, fetchAwardWinningMovies, fetchPopularArtists ,fetchPopularDirectors} from '../../api/tmdbApi';
import { useTranslation } from 'react-i18next';
import AvatarSlider from '../../components/Slider/AvatarSlider';

const HomePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [someData, setSomeData] = useState([]);
  const [directors, setDirectors] = useState<any[]>([]);
  const currentLanguage = i18n.language;

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchPopularArtists(currentLanguage); // Veriyi dinamik olarak çekiyoruz
      setSomeData(data);
    };
    loadData();
  }, [currentLanguage]);

  useEffect(() => {
    const loadDirectors = async () => {
      const fetchedDirectors = await fetchPopularDirectors(currentLanguage); // Yönetmen verilerini çekme
      const directorsData = fetchedDirectors.map((director) => ({
        id: director.id,
        name: director.name,
        imageSrc: director.profile_path, // Avatar için yönetmenlerin fotoğraflarını kullanıyoruz
      }));
      setDirectors(directorsData);
    };

    loadDirectors();
  }, [currentLanguage]);
  return (
    <div>
      {/* Diğer sliderlar */}
      <Slider title={t("slider.Popular Movies This Week")} fetchData={fetchPopularMovies} />
      <Slider title={t("slider.Popular TV Shows This Week")} fetchData={fetchPopularTVShows} />
      <Slider title={t("slider.Award Winning Movies")} fetchData={fetchAwardWinningMovies} />

      {/* Popüler sanatçıları gösteren avatar slider */}
      <AvatarSlider data={someData} title={t('imdbtop100movies.Most Popular Directors')} />
      <AvatarSlider data={directors} title={t('imdbtop100movies.Most Popular Directors')} />
    </div>
  );
};

export default HomePage;