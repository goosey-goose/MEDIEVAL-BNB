import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NavMenuLoggedOut from '../NavMenuLoggedOut/NavMenuLoggedOut.js';
import SignupFormPage from '../SignupFormPage/index.js';
import './TopHalfHomePage.css';

function TopHalfHomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);



  return (
    <>
      <header>
          <p>Medieval BNB</p>
          <nav>
            <NavMenuLoggedOut />
          </nav>
      </header>
      <div className="root-div-spacer"></div>
      <div id="homepage-top-grid">
        {!sessionUser && <div id="homepage-top-grid_title">
          Discover your next journey through time with family and friends on Medieval BNB.
        </div>}
        {!sessionUser && <div id="homepage-top-grid_subpoints">
          <p>Book spots at amazing castles all over the United Kindom.</p>
          <p>Write reviews to let everyone know how awesome your stay was.</p>
          <p>Create fun, lasting memories for everyone to enjoy together.</p>
        </div>}
        <div id="homepage-top-grid_signup_form">
          <SignupFormPage />
        </div>
      </div>
    </>
  );
}

export default TopHalfHomePage;
