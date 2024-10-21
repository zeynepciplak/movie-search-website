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
export interface Genre {
  id: number;
  name: string;
}

// Haftalık trend olan popüler filmleri getiren fonksiyon
export const fetchPopularMovies = async (language: string): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${baseURL}/trending/movie/week`, {
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
      vote_average: movie.vote_average,
    }));

    return movies;
  } catch (error) {
    console.error('API isteği başarısız:', error);
    return [];
  }
};

//Dizi Detaylarını Getiren Fonksiyon
export const fetchTVDetails = async (tvId: string, language: string) => {
  try {
    const response = await axios.get(`${baseURL}/tv/${tvId}`, {
      params: {
        api_key: apiKey,
        language: language, 
        append_to_response: 'credits', 
      },
    });

    const tvData = response.data;
    return tvData;
  } catch (error) {
    console.error('Dizi detaylarını çekerken hata oluştu:', error);
    return null;
  }
};



// Film Detaylarını Getiren Fonksiyon 2 
export const fetchMovieDetailsById = async (movieId: string, language: string) => {
  try {
    const response = await axios.get(`${baseURL}/movie/${movieId}`, {
      params: {
        api_key: apiKey,
        language: language, 
        append_to_response: 'credits', 
      },
    });

    const movieData = response.data;
    return movieData;
  } catch (error) {
    console.error('Film detaylarını çekerken hata oluştu:', error);
    return null;
  }
};

// Top 100 filmleri getiren fonksiyon
export const fetchIMDbTop100Movies = async (language: string , page: number): Promise<Movie[]> => {
  try {
    const response = await axios.get(`${baseURL}/discover/movie`, {
      params: {
        api_key: apiKey,
        language: language, 
        sort_by: 'vote_average.desc',
        'vote_count.gte': 1000, // IMDb Top 100 için minimum 1000 oy
        page: page, 
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
export const fetchPopularArtists = async (language: string, page: number = 1) => {
  try {
    const response = await axios.get(`${baseURL}/person/popular`, {
      params: {
        api_key: apiKey,
        language: language, // Dil parametresi dinamik olarak gönderiliyor
        page: page,
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
    console.error('En yeni filmleri alma hatası:', error);
    return [];
  }
};

// En yeni dizileri getiren fonksiyon 
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
    console.error('En yeni dizileri alma hatası:', error);
    return [];
  }
};
// Tüm Filmleri Çekme
export const fetchAllMovies = async (language : string, page = 1) => {
  const response = await axios.get(`${baseURL}/discover/movie`, {
    params: {
      api_key: apiKey,
      language:language,
      page, // Sayfa numarası
    },
  });
  return response.data.results; // Film listesini döner
};

// Tüm Dizileri Çekme
export const fetchAllSeries = async (language :string, page = 1) => {
  const response = await axios.get(`${baseURL}/discover/tv`, {
    params: {
      api_key: apiKey,
      language:language,
      page, // Sayfa numarası
    },
  });
  return response.data.results; // Dizi listesini döner
};
// Film türlerini getiren fonksiyon
export const fetchMovieGenres = async (language: string): Promise<Genre[]> => {
  try {
    const response = await axios.get(`${baseURL}/genre/movie/list`, {
      params: {
        api_key: apiKey,
        language: language,
      },
    });

    return response.data.genres;
  } catch (error) {
    console.error('Film türlerini çekerken hata oluştu:', error);
    return [];
  }
};

// Dizi türlerini getiren fonksiyon
export const fetchTVGenres = async (language: string): Promise<Genre[]> => {
  try {
    const response = await axios.get(`${baseURL}/genre/tv/list`, {
      params: {
        api_key: apiKey,
        language: language,
      },
    });

    return response.data.genres;
  } catch (error) {
    console.error('Dizi türlerini çekerken hata oluştu:', error);
    return [];
  }
};
// Belirli bir türe göre filmleri getiren fonksiyon
export const fetchMoviesByGenre = async (genreId: number, language: string, page = 1) => {
  try {
    const response = await axios.get(`${baseURL}/discover/movie`, {
      params: {
        api_key: apiKey,
        language: language,
        with_genres: genreId,
        page: page,
      },
    });

    return response.data.results; // Filmleri döndür
  } catch (error) {
    console.error('Türe göre filmleri çekerken hata oluştu:', error);
    return [];
  }
};

// Belirli bir türe göre dizileri getiren fonksiyon
export const fetchTVShowsByGenre = async (genreId: number, language: string, page = 1) => {
  try {
    const response = await axios.get(`${baseURL}/discover/tv`, {
      params: {
        api_key: apiKey,
        language: language,
        with_genres: genreId,
        page: page,
      },
    });

    return response.data.results; // Dizileri döndür
  } catch (error) {
    console.error('Türe göre dizileri çekerken hata oluştu:', error);
    return [];
  }
};

export const fetchSearchResults = async (query: string , language: string) => {
  try {
    const response = await axios.get(`${baseURL}/search/multi`, {
      params: {
        api_key: apiKey,
        language: language,
        query, // Arama sorgusu
        include_adult: false, // Yetişkin içerik hariç
      },
    });

    return response.data.results;
  } catch (error) {
    console.error('Arama sonuçları alınırken hata oluştu:', error);
    return [];
  }
};
// Sanatçı detaylarını almak için 
export const fetchArtistDetails = async (artistId: string, language: string) => {
  try {
    const response = await axios.get(`${baseURL}/person/${artistId}`, {
      params: {
        api_key: apiKey,
        language: language,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Sanatçı ayrıntıları alınırken hata oluştu:', error);
    throw error;
  }
};