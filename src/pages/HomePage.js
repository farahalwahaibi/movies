import { Container } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import MoviesList from '../components/MoviesList/MoviesList';

const HomePage = () => {

  const movies = useSelector(state => state.movies.movies);

  return (
    <Container>
      <MoviesList header="Movies:" showNote={false} movies={movies}/>
    </Container>
  );
};

export default HomePage;
