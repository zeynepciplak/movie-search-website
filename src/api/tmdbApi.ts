import axios from 'axios';


const apiKey = '99cd5d08a91b7c3308edfd32c078eb7a';
const baseURL = 'https://api.themoviedb.org/3';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
}

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
