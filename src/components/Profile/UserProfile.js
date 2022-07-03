import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import MoviesList from "../MoviesList/MoviesList";
import { CardContent, Card } from "@mui/material";
import { Container } from "@mui/system";

const UserProfile = () => {
  const [moviesData, setMoviesData] = useState([]);
  const favorites = useSelector((state) => state.movies.favorites);
  const movies = useSelector((state) => state.movies.movies);
  const email = useSelector((state) => state.auth.email);

  useEffect(() => {
    let favoritesWithData = [];
    for (const key in favorites) {
      const movie = movies.find(
        (movie) => movie.id === favorites[key].movie_id
      );
      favoritesWithData.push(movie);
    }
    setMoviesData(favoritesWithData);
  }, [favorites, movies]);

  return (
    <Container>
      <Card fullwidth sx={{marginTop: 2, padding: 2}}>
        <CardContent>
          <h1>User Data</h1>
          <b>Email: {email}</b>
        </CardContent>
      </Card>
      <MoviesList header="Favorites:" movies={moviesData} showNote={true} />
    </Container>
  );
};

export default UserProfile;
