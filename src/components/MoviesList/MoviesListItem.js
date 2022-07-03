import { Button, ListItem, CardMedia, Box, TextField } from "@mui/material";
import axios from "axios";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addfavorite, getFavorites, removeFavorite } from "../../store/movies-actions";

const MoviesListItem = (props) => {
  const [showField, setShowField] = useState(false);
  const noteRef = useRef();

  const authenticated = useSelector((state) => !!state.auth.token);
  const user_id = useSelector(state => state.auth.id);
  const history = useHistory();

  const dispatch = useDispatch();
  const addToFavorites = () => {
    dispatch(addfavorite(props.id));
  };

  const removeFromFavoriteHandler = () => {
    dispatch(removeFavorite(props.favorite_id));
  }

  const noteFieldHandler = () => {
    const note = noteRef.current.value;
    axios.put('http://localhost:8000/favorites/' + props.favorite_id, {
      movie_id: props.id,
      user_id,
      note
    })
  }

  const noteBtnHandler = () => {
    if (showField) {
      setShowField(false);
      dispatch(getFavorites());
    } else {
      setShowField(true)
    }
  }

  return (
    <>
      <ListItem>
        <CardMedia
          component="img"
          alt=""
          sx={{
            width: 80,
            height: "auto",
          }}
          src={props.poster_path}
        />
        <Box sx={{ marginLeft: 2 }}>
          <h2>{props.title}</h2>
          {props.note !== '' && <p style={{ padding: 0, marginTop: 0 }}>{props.note}</p>}
          <Button sx={{ mr: 1 }} size="small" variant="outlined" onClick={() => history.push(`/movie/${props.id}`)}>View</Button>
          {authenticated && (
            <>
              {!props.favorite_id ? (
                <Button size="small" variant="outlined" onClick={addToFavorites}>Add to favorites</Button>
              ) : (<>
                <Button sx={{ mr: 1 }} size="small" variant="outlined" onClick={removeFromFavoriteHandler}>
                  Remove from favorites
                </Button>
                {props.showNote && <Button size="small" variant="outlined" onClick={noteBtnHandler}>
                  Note
                </Button>}
              </>
              )}
            </>
          )}
        </Box>
      </ListItem>
      {showField && 
      <TextField
        onChange={noteFieldHandler}
        fullWidth
        m={2}
        size="small"
        id="outlined-basic"
        label="Note"
        variant="outlined"
        inputRef={noteRef}
        defaultValue={props.note}
        sx={{
          marginInline: 2,
          marginBottom: 2,
        }}
      />}
    </>
  );
};

export default MoviesListItem;
