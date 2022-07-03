import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authenticated = useSelector((state) => !!state.auth.token);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(authActions.signOut());
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Movies</div>
      </Link>
      <nav>
        <ul>
          {!authenticated && (
            <li>
              <Link to="/auth">Login</Link>
            </li>
          )}
          {authenticated && (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          )}
          {authenticated && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
