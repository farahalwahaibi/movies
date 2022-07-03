import MoviesListItem from "./MoviesListItem";
import { useSelector } from "react-redux";
import { Card, CardContent, Container, Divider } from "@mui/material";

const MovieList = (props) => {
  const { header, showNote, movies } = props;
  const loading = useSelector((state) => state.movies.loading);

  return (
    <Card
      sx={{
        marginTop: 3,
        padding: 2,
        maxWidth: 2000,
      }}
      elevation={4}
    >
      <h3>{header}</h3>
      <Divider />
      {movies.length !== 0 ? (
        movies.map((movie) => (
          <MoviesListItem
            key={movie.id}
            id={movie.id}
            title={movie.title}
            favorite_id={movie.favorite_id}
            note={movie.note}
            // showNote={props.showNote}
            poster_path={movie.poster_path}
            showNote={showNote}
          />
        ))
      ) : (
        <p>Found no movies here...</p>
      )}
      {loading && <h3>Loading...</h3>}
    </Card>
  );
};

export default MovieList;
