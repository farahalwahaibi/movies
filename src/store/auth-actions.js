import axios from "axios";
import { authActions } from "./auth-slice";

export const authenticate = (url, email, password) => {
  return async (dispatch) => {
    axios
      .post(url, { email, password, returnSecureToken: true })
      .then((response) => {
        const user = response.data;
        dispatch(authActions.commit({id: user.localId, email: user.email, token: user.idToken}))
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
};
