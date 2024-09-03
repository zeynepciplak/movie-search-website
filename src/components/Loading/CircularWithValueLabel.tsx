import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CircularProgressWithLabel from './CircularProgressWithLabel';

const CircularWithValueLabel: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        await axios.get('https://your-api-endpoint.com/data', {
          cancelToken: source.token,
          onDownloadProgress: (progressEvent) => {
            const total = progressEvent.total || 1;
            const current = progressEvent.loaded;
            const percentCompleted = Math.round((current / total) * 100);
            setProgress(percentCompleted);
          },
        });

        // Veri başarıyla yüklendi
        setLoadingComplete(true);
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Request canceled', error.message);
        } else {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();

    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  if (loadingComplete) {
    return null; // Yükleme tamamlandığında bileşeni kaldırıyoruz
  }

  return <CircularProgressWithLabel value={progress} />;
};

export default CircularWithValueLabel;
