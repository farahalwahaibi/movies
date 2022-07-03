import {
  Card,
  CardContent,
  Container,
  CardMedia,
  Typography,
  CardActions,
  Button,
  Divider,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { addfavorite, removeFavorite } from "../../store/movies-actions";

const Movie = (props) => {
  const { movie } = props;
  const authenticated = useSelector(state => !!state.auth.token);
  const dispatch = useDispatch();
  const addToFavorites = () => {
    dispatch(addfavorite(movie.id));
  };

  const removeFromFavoriteHandler = () => {
    dispatch(removeFavorite(movie.favorite_id));
  }
  return (
    <Container>
      <Card sx={{ marginTop: 3, display: 'flex' }}>
        <CardMedia
          component="img"
          alt=""
          sx={{
            width: 225,
            height: 'auto'
          }}
          src={movie.poster_path} rWidth
        />
        <Box sx={{

        }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              <b>{movie.title}</b>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {movie.overview}
            </Typography>
          </CardContent>
          <Divider sx={{ marginTop: 3 }} />
          <CardContent>
            <Typography gutterBottom variant="p" component="div">
              Original Language: <b>{movie.original_language}</b>
            </Typography>
            <Typography gutterBottom variant="p" component="div">
              Popularity: <b>{movie.popularity}</b>
            </Typography>
            <Typography gutterBottom variant="p" component="div">
              Release Date: <b>{movie.release_date}</b>
            </Typography>
            <Typography gutterBottom variant="p" component="div">
              Vote Average: <b>{movie.vote_average}</b>
            </Typography>
            <Typography gutterBottom variant="p" component="div">
              Vote Count: <b>{movie.vote_count}</b>
            </Typography>
          </CardContent>
          {authenticated && <>
            <Divider />
            <CardActions>
              {!movie.favorite_id && <Button onClick={addToFavorites} variant="outlined" size="small">Add to Favorites</Button>}
              {movie.favorite_id && (
                <Button onClick={removeFromFavoriteHandler} variant="outlined" size="small">Remove from Favorites</Button>
              )}
            </CardActions>
          </>}

        </Box>
      </Card>
    </Container>
  );
};
{
  /* <h2>Original language: {movie.original_language}</h2>
        <h2>overview: {movie.overview}</h2>
        <h2>popularity: {movie.popularity}</h2>
        <h2>release date: {movie.release_date}</h2>
        <h2>vote average: {movie.vote_average}</h2>
        <h2>vote count: {movie.vote_count}</h2> */
}
export default Movie;
