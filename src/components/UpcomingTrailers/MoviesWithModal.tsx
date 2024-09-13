import React, { useState, useEffect } from 'react';
import Modal from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import MovieCard from './MovieCard'; // MovieCard bileşeni (film afişini ve başlığı gösterir)
import { Trailer, fetchUpcomingTrailers } from '../../api/tmdbApi';

const MoviesWithModal: React.FC = () => {
  const [open, setOpen] = useState(false); // Modal'ın açık olup olmadığını kontrol ederiz
  const [selectedTrailer, setSelectedTrailer] = useState<Trailer | null>(null); // Seçilen fragmanı tutar
  const [trailers, setTrailers] = useState<Trailer[]>([]); // Tüm fragmanları tutar

  // Modal açıldığında, seçilen fragman ayarlanır ve modal açılır
  const handleOpenModal = (trailer: Trailer) => {
    setSelectedTrailer(trailer);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelectedTrailer(null);
  };

  // Yakında çıkacak film ve dizi fragmanlarını çekmek için useEffect kullanıyoruz
  useEffect(() => {
    const fetchData = async () => {
      const trailerData = await fetchUpcomingTrailers('en-US'); // Fragmanları çekiyoruz
      setTrailers(trailerData); // Fragmanları state'e kaydediyoruz
    };

    fetchData();
  }, []);

  return (
    <div>
      {/* Yakında çıkacak olan film ve dizileri gösteren Card'lar */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        {trailers.map((trailer) => (
          <MovieCard
          key={trailer.title}
          title={trailer.title}               // Title prop'u
          trailerUrl={trailer.trailerUrl}     // Trailer URL'si
          releaseDate={trailer.releaseDate}   // Yayınlanma tarihi
          mediaType={trailer.mediaType}       // Film mi dizi mi olduğunu belirten prop
          onClick={() => handleOpenModal(trailer)} // Modal açmak için onClick event'i
        />
        ))}
      </div>

      {/* Modal yapısı ve trailer */}
      <Modal open={open} onClose={handleCloseModal} center>
        {selectedTrailer && (
          <>
            <h2>{selectedTrailer.title}</h2>
            {selectedTrailer.trailerUrl ? (
              <iframe
                width="560"
                height="315"
                src={selectedTrailer.trailerUrl}
                title={selectedTrailer.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <p>Trailer bulunamadı.</p>
            )}
          </>
        )}
      </Modal>
    </div>
  );
};

export default MoviesWithModal;
