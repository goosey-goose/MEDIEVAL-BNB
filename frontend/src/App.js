// frontend/src/App.js
import React, { useState, useEffect } from "react";
// import Modal from 'react-modal';
// import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import AllSpots from "./components/AllSpots/AllSpots";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import { RiBook3Line } from 'react-icons/ri';
import { HiPencilAlt } from 'react-icons/hi';
import { HiOutlineSearch } from 'react-icons/hi';
import { getAllSpots } from "./store/spot";
import 'react-datepicker/dist/react-datepicker.css'
import './App.css';
import { getUserBookings, getAllUserBookings } from './store/booking';
import { getAllReviews, getAllUsers } from "./store/review";
import LoggedInHomePage from "./components/LoggedInHomePage/LoggedInHomePage";



// Modal.setAppElement('#root');

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [selectedStartDate, setSelectedStartDate] = useState(null);
  // const [selectedEndDate, setSelectedEndDate] = useState(null);
  const sessionUser = useSelector(state => state.session.user);
  // const allSpots = useSelector(state => state.spots.spots);

  console.log('#####################################  APP COMPONENT RENDERED  ##################################');

  let history = useHistory();


  useEffect(() => {
    dispatch(getAllSpots());
    dispatch(getAllReviews());
    dispatch(getAllUsers());
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  useEffect(() => {
    if (!sessionUser) {
      history.push("/");
    } else {
      dispatch(getUserBookings());
      dispatch(getAllUserBookings());
      // dispatch(getAllReviews());
      history.push("/home");
    }
  })









  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>

          {sessionUser && <Route exact path="/home">

            {sessionUser && <LoggedInHomePage isLoaded={isLoaded} />}
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
                          Create fun, lasting memories for everyone to enjoy together.
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
            {/* {console.log("login page")} */}
          </Route>

          <Route exact path="/signup">
            <SignupFormPage />
            {/* {console.log("signup page")} */}
          </Route>

        </Switch>
      )}

      {isLoaded && <AllSpots isLoaded={isLoaded} />}





    </>
  );
}

export default App;
