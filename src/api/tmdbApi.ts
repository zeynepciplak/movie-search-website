import axios from 'axios';

const apiKey = '99cd5d08a91b7c3308edfd32c078eb7a';
const baseURL = 'https://api.themoviedb.org/3';

// Movie arayüzü
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

// Trailer arayüzü
export interface Trailer {
  title: string;
  trailerUrl: string;
  releaseDate: string;
}

// Popüler filmleri getiren fonksiyon
export const fetchPopularMovies = async (language: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${baseURL}/trending/movie/week`, {
      params: {
        api_key: apiKey,
        language: language,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('API isteği başarısız:', error);
    return [];
  }
};

// Yakında çıkacak filmlerin fragmanlarını getiren fonksiyon
export const fetchUpcomingTrailers = async (): Promise<Trailer[]> => {
  try {
    const response = await axios.get(`${baseURL}/movie/upcoming`, {
      params: {
        api_key: apiKey,
        language: 'en-US', // İsteğe bağlı olarak dili burada ayarlayabilirsiniz
        page: 1,
      },
    });

    const movies = response.data.results;
    const trailers: Trailer[] = [];

    for (let movie of movies) {
      const videoResponse = await axios.get(`${baseURL}/movie/${movie.id}/videos`, {
        params: {
          api_key: apiKey,
          language: 'en-US',
        },
      });

      const trailer = videoResponse.data.results.find((video: any) => video.type === 'Trailer');
      if (trailer) {
        trailers.push({
          title: movie.title,
          trailerUrl: `https://www.youtube.com/watch?v=${trailer.key}`,
          releaseDate: movie.release_date,
        });
      }
    }

    return trailers;
  } catch (error) {
    console.error('API isteği başarısız:', error);
    return [];
  }
};

