import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import MovieDetail from "./pages/MovieDetail";

function App() {

  const authenticated = useSelector((state) => !!state.auth.token);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/movies" />
        </Route>
        <Route path="/movies" exact>
          <HomePage />
        </Route>
        <Route path="/movie/:id">
          <MovieDetail />
        </Route>
        {!authenticated && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        {!!authenticated && (
          <Route path="/profile">
            <UserProfile />
          </Route>
        )}
      </Switch>
    </Layout>
  );
}

export default App;
