import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import ReactPlayer from 'react-player';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useTranslation } from 'react-i18next';

export interface TrailerCardProps {
  title: string;
  trailerUrl: string;
  releaseDate: string;
  mediaType: 'movie' | 'tv';
  onError: () => void;
}

const UpcomingTrailerCard: React.FC<TrailerCardProps> = ({
  title,
  trailerUrl,
  releaseDate,
  mediaType,
  onError
}) => {
  const { t } = useTranslation();

  // isPlaying durumunu yönetmek için useState kullanıyoruz
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleMouseEnter = () => {
    setIsPlaying(true);
  };

  const handleMouseLeave = () => {
    setIsPlaying(false);
  };

  // Tarihi sayılı formatta gösteriyoruz
  const formattedDate = format(new Date(releaseDate), 'dd/MM/yyyy', { locale: tr });

  return (
    <Card sx={{ maxWidth: 600, maxHeight: 800, margin: '10px' }}>
      <CardActionArea
        onMouseEnter={handleMouseEnter}  // Mouse üzerine geldiğinde video oynatılır
        onMouseLeave={handleMouseLeave}  // Mouse üzerinden gidince video durdurulur
      >
        <ReactPlayer
          url={trailerUrl}
          width="100%"
          height="400px"
          controls={true}
          playing={isPlaying}  // isPlaying durumuna göre oynatma kontrol edilir
          onError={onError}  // Video oynatmada hata olursa onError çağrılır
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('UpComing.Release Date')}: {formattedDate} {/* i18n ile dinamik metin */}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {mediaType === 'movie' ? t('UpComing.Movie') : t('UpComing.TV Show')}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default UpcomingTrailerCard;
