import axios from 'axios';

const apiKey = '99cd5d08a91b7c3308edfd32c078eb7a';
const baseURL = 'https://api.themoviedb.org/3';

// Movie arayüzü haftalık popüler olan
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number; // IMDb puanı
}
export interface Series {
  id: number;
  name: string;
  poster_path: string;
  first_air_date: string;
}
// Trailer arayüzü
export interface Trailer {
  title: string;
  trailerUrl: string;
  releaseDate: string;
  mediaType: 'movie' | 'tv';
  poster_path: string;
  videoId: string;
}

// Film Detayları
export interface MovieDetails {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  genres: { id: number; name: string }[];
  runtime: number;
  cast: { name: string; character: string }[];
}
export interface Director {
  id: number;
  name: string;
  biography: string;
  known_for: Movie[];
  profile_path: string | null;
}

// Haftalık trend olan popüler filmleri getiren fonksiyon
export const fetchPopularMovies = async (language: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${baseURL}/trending/movie/week`, {
      params: {
        api_key: apiKey,
        language: language, // Dil parametresi dinamik olarak gönderiliyor
      },
    });

    const movies: Movie[] = response.data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    }));

    return movies;
  } catch (error) {
    console.error('API isteği başarısız:', error);
    return [];
  }
};

// Top 100 filmleri getiren fonksiyon
export const fetchIMDbTop100Movies = async (language: string , page: number): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${baseURL}/discover/movie`, {
      params: {
        api_key: apiKey,
        language: language, // Dil parametresi dinamik
        sort_by: 'vote_average.desc',
        'vote_count.gte': 1000, // IMDb Top 100 için minimum 1000 oy
        page: page,  // İlk sayfayı alıyoruz, istersen bunu artırabilirsin
      },
    });

    const movies: Movie[] = response.data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    }));

    return movies;
  } catch (error) {
    console.error('IMDb API isteği başarısız:', error);
    return [];
  }
};

// Film Detaylarını Getiren Fonksiyon
export const fetchMovieDetails = async (movieId: number, language: string): Promise<MovieDetails | null> => {
  try {
    const response = await axios.get(`${baseURL}/movie/${movieId}`, {
      params: {
        api_key: apiKey,
        language: language, // Dil parametresi dinamik olarak gönderiliyor
        append_to_response: 'credits', // Oyuncu bilgilerini de alıyoruz
      },
    });

    const movieData = response.data;
    const cast = movieData.credits.cast.slice(0, 5).map((actor: any) => ({
      name: actor.name,
      character: actor.character,
    }));

    const movieDetails: MovieDetails = {
      id: movieData.id,
      title: movieData.title,
      poster_path: movieData.poster_path,
      release_date: movieData.release_date,
      vote_average: movieData.vote_average,
      overview: movieData.overview, // Konu
      genres: movieData.genres, // Türler
      runtime: movieData.runtime, // Film süresi
      cast: cast, // Oyuncular
    };

    return movieDetails;
  } catch (error) {
    console.error('Film detaylarını çekerken hata oluştu:', error);
    return null;
  }
};

// Haftalık trend olan popüler dizileri getiren fonksiyon
export const fetchPopularTVShows = async (language: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${baseURL}/trending/tv/week`, {
      params: {
        api_key: apiKey,
        language: language, // Dil parametresi dinamik olarak gönderiliyor
      },
    });

    const tvShows: Movie[] = response.data.results.map((show: any) => ({
      id: show.id,
      title: show.name,
      poster_path: show.poster_path,
      release_date: show.first_air_date,
      vote_average: show.vote_average,
    }));

    return tvShows;
  } catch (error) {
    console.error('API isteği başarısız:', error);
    return [];
  }
};

// Sanatçıları getiren fonksiyon
export const fetchPopularArtists = async (language: string) => {
  try {
    const response = await axios.get(`${baseURL}/person/popular`, {
      params: {
        api_key: apiKey,
        language: language, // Dil parametresi dinamik olarak gönderiliyor
      },
    });

    const artists = response.data.results.map((artist: any) => ({
      id: artist.id,
      name: artist.name,
      imageSrc: `https://image.tmdb.org/t/p/w500${artist.profile_path}`,
    }));

    return artists;
  } catch (error) {
    console.error('Sanatçıları çekerken hata oluştu:', error);
    return [];
  }
};

// Fragmanları getiren fonksiyon
export const fetchUpcomingTrailers = async (language: string): Promise<Trailer[]> => {
  try {
    const movieResponse = await axios.get(`${baseURL}/movie/upcoming`, {
      params: {
        api_key: apiKey,
        language: language,
        page: 1,
      },
    });

    const tvResponse = await axios.get(`${baseURL}/tv/on_the_air`, {
      params: {
        api_key: apiKey,
        language: language,
        page: 1,
      },
    });

    let movies = movieResponse.data.results;
    let tvShows = tvResponse.data.results;

    let allResults = [...movies, ...tvShows];

    if (allResults.length === 0 && language !== 'en-US') {
      const fallbackMovieResponse = await axios.get(`${baseURL}/movie/upcoming`, {
        params: {
          api_key: apiKey,
          language: language,
          page: 1,
        },
      });

      const fallbackTvResponse = await axios.get(`${baseURL}/tv/on_the_air`, {
        params: {
          api_key: apiKey,
          language: language,
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

      if (trailer && trailer.key) {
        trailers.push({
          title: item.title || item.name,
          trailerUrl: `https://www.youtube.com/watch?v=${trailer.key}`,
          videoId: trailer.key,
          releaseDate: item.release_date || item.first_air_date,
          mediaType: item.title ? 'movie' : 'tv',
          poster_path: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
        });
      }
    }

    return trailers;
  } catch (error) {
    console.error('API isteği başarısız:', error);
    return [];
  }
};

// Ödüllü filmleri getiren fonksiyon
export const fetchAwardWinningMovies = async (language: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${baseURL}/discover/movie`, {
      params: {
        api_key: apiKey,
        language: language,
        sort_by: 'vote_average.desc',  // Puan sırasına göre sıralıyoruz
        'vote_count.gte': 1000,        // En az 1000 oy alan filmler
      },
    });

    const movies: Movie[] = response.data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
    }));

    return movies;
  } catch (error) {
    console.error('Ödüllü filmleri çekerken hata oluştu:', error);
    return [];
  }
};

// Popüler yönetmenleri getiren fonksiyon
export const fetchPopularDirectors = async (language: string): Promise<Director[]> => {
  try {
    const response = await axios.get(`${baseURL}/person/popular`, {
      params: {
        api_key: apiKey,
        language: language,
      },
    });

    // Yönetmenleri popüler kişilerden filtreliyoruz (yönetmenler için popüler film yapımcılarını kullanıyoruz)
    const directors = response.data.results
      .filter((person: any) => person.known_for_department === 'Directing') // Yalnızca yönetmenleri filtrele
      .map((director: any) => ({
        id: director.id,
        name: director.name,
        profile_path: `https://image.tmdb.org/t/p/w500${director.profile_path}`,
        biography: director.biography || 'Biography not available.',
        known_for: director.known_for.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : null,
        })),
      }));

    return directors;
  } catch (error) {
    console.error('Yönetmenleri çekerken bir hata oluştu:', error);
    return [];
  }
};

// Yönetmen detaylarını getiren fonksiyon
export const fetchDirectorDetails = async (directorId: number, language: string) => {
  try {
    const response = await axios.get(`${baseURL}/person/${directorId}`, {
      params: {
        api_key: apiKey,
        language: language,
        append_to_response: 'movie_credits', // Yönetmenin filmlerini de alıyoruz
      },
    });

    const directorData = response.data;
    console.log("Director Data API Response:", directorData);
    const directorDetails = {
      id: directorData.id,
      name: directorData.name,
      profile_path: directorData.profile_path
        ? `https://image.tmdb.org/t/p/w500${directorData.profile_path}`
        : null,
      biography: directorData.biography || 'No biography available.',
      known_for: directorData.movie_credits?.crew
        .filter((movie: any) => movie.job === 'Director')
        .map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path
            ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
            : 'https://via.placeholder.com/200x300?text=No+Poster',
        })),
    };

    return directorDetails;
  } catch (error) {
    console.error('Yönetmen detaylarını çekerken bir hata oluştu:', error);
    return null;
  }
};
// En yeni filmleri getiren fonksiyon
export const fetchNewestMovies = async (language: string,page:number): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${baseURL}/movie/now_playing`, {
      params: {
        api_key: apiKey,
        language: language,
        page: page,
      },
    });

    // Veriyi type-safe olarak dönüştürüyoruz
    const movies: Movie[] = response.data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      release_date: movie.release_date,
    }));

    // release_date'e göre en yeni'den eskiye sıralıyoruz
    return movies.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
  } catch (error) {
    console.error('Error fetching newest movies:', error);
    return [];
  }
};

// En yeni dizileri getiren fonksiyon (popüler veya güncel diziler üzerinden)
export const fetchNewestSeries = async (language: string,page:number): Promise<Series[]> => {
  try {
    const response = await axios.get(`${baseURL}/tv/airing_today`, {
      params: {
        api_key: apiKey,
        language: language,
        page: page,
      },
    });

    // Veriyi type-safe olarak dönüştürüyoruz
    const series: Series[] = response.data.results.map((serie: any) => ({
      id: serie.id,
      name: serie.name,
      poster_path: serie.poster_path,
      first_air_date: serie.first_air_date,
    }));

    // first_air_date'e göre en yeni'den eskiye sıralıyoruz
    return series.sort((a, b) => new Date(b.first_air_date).getTime() - new Date(a.first_air_date).getTime());
  } catch (error) {
    console.error('Error fetching newest series:', error);
    return [];
  }
};