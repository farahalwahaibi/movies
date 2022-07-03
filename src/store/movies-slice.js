import { createSlice } from "@reduxjs/toolkit";
const initialState = { movies: [], favorites: [] };
const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    save(state, action) {
      state.movies = action.payload.movies;
    },
    storeFavorites(state, action) {
      state.favorites = action.payload.favorites;
    },
  },
});

export const moviesActions = moviesSlice.actions;
export default moviesSlice;
