import axios from 'axios';

const apiKey = '99cd5d08a91b7c3308edfd32c078eb7a';
const baseURL = 'https://api.themoviedb.org/3';

// Movie arayüzü haftalık populer olan 
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
  mediaType: 'movie' | 'tv';
}

// Haftalık trend olan popüler filmleri getiren fonksiyon
export const fetchPopularMovies = async (language: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${baseURL}/trending/movie/week`, { // Haftalık popüler filmler
      params: {
        api_key: apiKey,
        language: language,
      },
    });

    const movies: Movie[] = response.data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
    }));

    return movies;
  } catch (error) {
    console.error('API isteği başarısız:', error);
    return [];
  }
};
// Haftalık trend olan popüler dizileri getiren fonksiyon
export const fetchPopularTVShows = async (language: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${baseURL}/trending/tv/week`, { // Haftalık popüler diziler
      params: {
        api_key: apiKey,
        language: language,
      },
    });

    const tvShows: Movie[] = response.data.results.map((show: any) => ({
      id: show.id,
      title: show.name,  // TV şovları için 'name' kullanıyoruz
      poster_path: show.poster_path,
      release_date: show.first_air_date,
    }));

    return tvShows;
  } catch (error) {
    console.error('API isteği başarısız:', error);
    return [];
  }
};


// Yakında çıkacak film ve dizilerin fragmanlarını getiren fonksiyon
export const fetchUpcomingTrailers = async (language: string = 'en-US'): Promise<Trailer[]> => {
  try {
    // Filmler için `upcoming` endpoint'i
    const movieResponse = await axios.get(`${baseURL}/movie/upcoming`, {
      params: {
        api_key: apiKey,
        language: language,
        page: 1,
      },
    });

    // Diziler için `on_the_air` endpoint'i
    const tvResponse = await axios.get(`${baseURL}/tv/on_the_air`, {
      params: {
        api_key: apiKey,
        language: language,
        page: 1,
      },
    });

    let movies = movieResponse.data.results;
    let tvShows = tvResponse.data.results;

    let allResults = [...movies, ...tvShows]; // Filmler ve dizileri birleştir

    if (allResults.length === 0 && language !== 'en-US') {
      // Eğer TR dilinde içerik bulunamazsa, EN diline geri döner
      const fallbackMovieResponse = await axios.get(`${baseURL}/movie/upcoming`, {
        params: {
          api_key: apiKey,
          language: 'en-US',
          page: 1,
        },
      });

      const fallbackTvResponse = await axios.get(`${baseURL}/tv/on_the_air`, {
        params: {
          api_key: apiKey,
          language: 'en-US',
          page: 1,
        },
      });

      movies = fallbackMovieResponse.data.results;
      tvShows = fallbackTvResponse.data.results;
      allResults = [...movies, ...tvShows];
    }

    const trailers: Trailer[] = [];

    for (let item of allResults) {
      const videoResponse = await axios.get(
        `${baseURL}/${item.title ? 'movie' : 'tv'}/${item.id}/videos`,
        {
          params: {
            api_key: apiKey,
            language: language,
          },
        }
      );

      const trailer = videoResponse.data.results.find((video: any) => video.type === 'Trailer');

      // Sadece çalışır durumda olan videoları ekliyoruz ve title varsa filmdir, yoksa dizidir
      if (trailer && trailer.key) {
        trailers.push({
          title: item.title || item.name,
          trailerUrl: `https://www.youtube.com/watch?v=${trailer.key}`,
          releaseDate: item.release_date || item.first_air_date,
          mediaType: item.title ? 'movie' : 'tv',
        });
      }
    }

    return trailers;
  } catch (error) {
    console.error('API isteği başarısız:', error);
    return [];
  }
};
