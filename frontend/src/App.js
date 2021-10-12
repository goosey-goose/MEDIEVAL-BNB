// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { RiBook3Line } from 'react-icons/ri';
import { HiPencilAlt } from 'react-icons/hi';
import { HiOutlineSearch } from 'react-icons/hi';
import { getAllSpots } from "./store/spot";
import './App.css';
import { getUserBookings } from './store/booking';
import LoggedInHomePage from "./components/LoggedInHomePage/LoggedInHomePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);

  const test = 5;
  console.log(1);

  let history = useHistory();

  useEffect(() => {
    // console.log("McFly");
    dispatch(getAllSpots());
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
      dispatch(getUserBookings());
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
            {sessionUser && <LoggedInHomePage />}
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
                    <div>
                      <div className="subpoint">
                        <RiBook3Line size='5rem' />

                        <div className="subpoints_text">
                          Book spots at amazing castles all over the United Kindom.
                        </div>

                      </div>

                      <div className="subpoint">
                        <HiPencilAlt size='5rem' />

                        <div className="subpoints_text">
                          Write reviews to let everyone know how awesome your stay was.
                        </div>

                      </div>





                      <div className="subpoint">
                        <HiOutlineSearch size='5rem' />

                        <div className="subpoints_text">
                          Search for castles based on the features you're looking for.
                        </div>

                      </div>






                  </div>
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

      {isLoaded && <div id="tommy-test">
        TOMMY AND TAMMY
      </div>}


    </>
  );
}

export default App;
