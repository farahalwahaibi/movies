import {
  Card,
  TextField,
  Button,
  Typography,
  ImageListItem,
  CardActions,
} from "@mui/material";
import { Container } from "@mui/system";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { authenticate } from "../../store/auth-actions";

import classes from "./AuthForm.module.css";
const API_KEY = "AIzaSyCUPQ9pr8nFchYVUqvS2HjzQRQYc0HBeJc";
const AuthForm = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => !!state.auth.token);
  const history = useHistory();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;
    // Validation...
    setIsLoading(true);
    if (isLogin) {
      const loginUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
        API_KEY;
      dispatch(authenticate(loginUrl, email, password));
      setIsLoading(false);
      if (authenticated) {
        history.push("/");
      }
    } else {
      const registerUrl =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=" +
        API_KEY;
      dispatch(authenticate(registerUrl, email, password));
      setIsLoading(false);
      if (authenticated) {
        history.push("/");
      }
    }
  };

  return (
    <Container sx={{ justifyContent: "center", alignItems: "center" }}>
      <Card elevation={5} sx={{ marginTop: 5, padding: 4, }}>
        <Typography component="h1" variant="h5">
          {isLogin ? "Login" : "Sign Up"}
        </Typography>
        <form onSubmit={submitHandler}>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Email"
            variant="outlined"
            inputRef={emailInputRef}
            type="email"
            required
            sx={{
              marginTop: 3,
            }}
            autoFocus
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Password"
            variant="outlined"
            inputRef={passwordInputRef}
            type="password"
            required
            sx={{
              marginTop: 3,
            }}
          />
          <CardActions sx={{ marginTop: 1 }}>
            {!isLoading && (
              <Button type="submit">
                {isLogin ? "Login" : "Sign Up"}
              </Button>
            )}
            {isLoading && <p>Sending Request...</p>}
            <Button
              type="button"
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Don't have an account?" : "Login with existing account"}
            </Button>
          </CardActions>
        </form>
      </Card>
    </Container>
  );
};

export default AuthForm;
