import axios from "axios";
import { moviesActions } from "./movies-slice";
import store from "./index";

const user_id = store.getState().auth.id;
export const getMovies = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/search/movie?api_key=668baa4bb128a32b82fe0c15b21dd699&language=en-US&query=The&page=2"
      );

      const data = response.data.results;
      const movies = [];
      const favorites = store.getState().movies.favorites;

      for (const key in data) {
        let favorite_id = null;
        let note = '';
        if (user_id) {
          const isFavorite = favorites.find(favorite => favorite.movie_id === data[key].id);
          if (isFavorite) {
            favorite_id = isFavorite.id;
            note = isFavorite.note;
          }
        }

        movies.push({
          id: data[key].id,
          title: data[key].title,
          original_language: data[key].original_language,
          overview: data[key].overview,
          popularity: data[key].popularity,
          release_date: data[key].release_date,
          vote_average: data[key].vote_average,
          vote_count: data[key].vote_count,
          poster_path: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${data[key].poster_path}`,
          favorite_id,
          note
        });
      }
      dispatch(moviesActions.save({ movies }));
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const getFavorites = () => {
  return (dispatch) => {
    const user_id = store.getState().auth.id;
    axios.get("http://localhost:8000/favorites").then((response) => {
      const data = response.data;
      const myFavorites = data.filter((movie) => movie.user_id === user_id);
      dispatch(moviesActions.storeFavorites({ favorites: myFavorites }));
      dispatch(getMovies());
    });
  };
};
export const addfavorite = (movie_id) => {
  return (dispatch) => {
    axios.post("http://localhost:8000/favorites", {
      movie_id,
      user_id,
      note: "",
    });
    dispatch(getFavorites());
  }
}

export const removeFavorite = (favorite_id) => {
  return (dispatch) => {
    axios.delete("http://localhost:8000/favorites/" + favorite_id);
    dispatch(getFavorites());
  }
}