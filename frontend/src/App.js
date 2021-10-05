// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
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



  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            {sessionUser ? <Redirect to="/home" /> : <Redirect to="/" />}
            {console.log("very tired")}
            {/* <div>tired</div> */}
          </Route>
          {sessionUser && <Route exact path="/home">
            <div>tired</div>
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

      {/* {isLoaded && !sessionUser && <div id="login_or_signup">

      <div id="logo">MEDIEVAL BNB</div>
      <nav id="homepage_nav">
        <div id="homepage_div_grid">
          <div id="logo">Medieval BNB</div>
          <div id="nav_login"><LoginFormPage /></div>
        </div>
      </nav>

        <div id="div_containing_both_forms">

          <div id="outer_div_for_login">
            <div><LoginFormPage /></div>
          </div>



          <div id="outer_div_for_signup">
            <div><SignupFormPage /></div>
          </div>

        </div>



      </div>} */}





    </>
  );
}

export default App;
