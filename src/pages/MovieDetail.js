import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie/Movie";

const MovieDetail = () => {

  const params = useParams();
  const movies = useSelector((state) => state.movies.movies);
  
  const movie = movies.find((movie) => movie.id === +params.id);
  
  if (!movie) {
    return <p>Movie not found.</p>
  }

  return <Movie movie={movie} />;
};

export default MovieDetail;
