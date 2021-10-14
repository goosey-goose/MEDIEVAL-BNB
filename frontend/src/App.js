// frontend/src/App.js
import React, { useState, useEffect } from "react";
import Modal from 'react-modal';
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
import { getAllReviews } from "./store/review";
import LoggedInHomePage from "./components/LoggedInHomePage/LoggedInHomePage";

Modal.setAppElement('#root');

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const allSpots = useSelector(state => state.spots.spots);



  let history = useHistory();


  useEffect(() => {
    dispatch(getAllSpots());
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  useEffect(() => {
    if (!sessionUser) {
      history.push("/");
    } else {
      dispatch(getUserBookings());
      dispatch(getAllReviews());
      history.push("/home");
    }
  })


  useEffect(() => {
    if (allSpots?.length) {
      let spotDivs = document.querySelectorAll(".spot_divs");
      spotDivs.forEach((spot) => {
        spot.addEventListener('click', (event) => {
          setModalIsOpen(true);
          spot.classList.add('no_effects');
          console.log(event.target.currentSrc);
          let actualLoggedOutModal = document.getElementById('actual_logged_out_modal');
          actualLoggedOutModal.innerHTML = `<div id="div_inside_outer_modal"><img src=${event.target.currentSrc}></img></div>`;
        })
      });
    }

    let bodyElement = document.getElementsByTagName('body')[0];
    bodyElement.addEventListener('click', () => {
      // setModalIsOpen(false);
    })
  });



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
        <div id="spots_grid">
          {allSpots && allSpots.map((spot, index) => {
            return (<div className="spot_divs" key={index}>
              <img src={spot.imageUrl}></img>
              <div style={{display: "flex", justifyContent: "space-between", marginTop: ".3rem"}}><div>{spot.spotName}</div><div>${spot.price}</div></div>
            </div>)
          })}
        </div>


      </div>}

      {isLoaded && <Modal
        id="actual_logged_out_modal"
        isOpen={modalIsOpen}
        onRequestClose={() => {
          let actualLoggedOutModal = document.getElementById('actual_logged_out_modal');
          actualLoggedOutModal.innerHTML = '';
          setModalIsOpen(false);
          let spotDivs = document.querySelectorAll(".spot_divs");
          spotDivs.forEach((spot) => {
            spot.classList.remove('no_effects');
          })
        }}
        style={
          {
            overlay: {
              backgroundColor: 'transparent',
              // margin: '10rem'
            },
            content: {
              position: 'absolute',
              borderRadius: '10px',
              height: 'fit-content',
              margin: 'auto',
              width: 'fit-content',
              backgroundColor: 'rgb(134, 134, 225)',
              border: 'none'
            }
          }
        }
        >
          {/* <h2>Modal Title</h2>
          <p>Modal Body</p> */}
        </Modal>}


    </>
  );
}

export default App;
