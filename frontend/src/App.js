// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import './App.css';

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  const test = 5;
  console.log(1);

  let history = useHistory();

  useEffect(() => {
    console.log(3);
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // debugger
  // if (sessionUser) return (
  //   <>
  //   {console.log(4)}
  //   {console.log("from conditional check", isLoaded)}
  //   <Redirect to="/home" from="/" />
  //   </>
  // );

  useEffect(() => {
    if (!sessionUser) {
      // window.alert("hello");
      // return (
      //   <Redirect to="/" />
      // );
      history.push("/");
    } else {
      history.push("/home");
    }
  })



  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          {sessionUser && <Route exact path="/home">
            {/* {!sessionUser && <Redirect to="/" />} */}
            <div>tired</div>
          </Route>}

          {!sessionUser && <Route to="/">
            <div id="logged_out_page_grid">
              <div id="homepage_app_description">
                <div id="description_level_1">
                  <div id="description_level_2">
                    Discover your next journey through time with family and friends on Medieval BNB.
                  </div>
                </div>
                <div id="description_subpoints_parent">
                  <div id="description_subpoints">
                    {/* test */}
                  </div>
                </div>
              </div>
              <div id="signup_form_page_div"><SignupFormPage /></div>
            </div>
          </Route>}

          <Route exact path="/login">
            <LoginFormPage />
            {console.log("login page")}
          </Route>

          <Route exact path="/signup">
            <SignupFormPage />
            {console.log("signup page")}
          </Route>

        </Switch>
      )}


    </>
  );
}

export default App;
