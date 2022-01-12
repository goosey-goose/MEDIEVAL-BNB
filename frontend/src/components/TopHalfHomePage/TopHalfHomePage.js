import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NavMenuLoggedOut from '../NavMenuLoggedOut/NavMenuLoggedOut.js';
import SignupFormPage from '../SignupFormPage/index.js';
import Header from '../Header/Header.js';
import './TopHalfHomePage.css';

function TopHalfHomePage() {
  const sessionUser = useSelector(state => state.session.user);

  // useEffect(() => {
  //   let headerParagraph = document.querySelector(".header-paragraph");
  //   headerParagraph.addEventListener("click", () => {
  //     console.log("home button clicked");

  //   });
  // }, [])



  return (
    <>
      {/* <header>
          <p className="header-paragraph">Medieval BNB</p>
          <nav>
            <NavMenuLoggedOut />
          </nav>
      </header>
      <div className="root-div-spacer"></div> */}
      {/* <Header /> */}
      <div id="homepage-top-grid">
        {!sessionUser && <div id="homepage-top-grid_title">
          Discover your next journey through time with family and friends on Medieval BNB.
        </div>}
        {!sessionUser && <div id="homepage-top-grid_subpoints">
          <p>Book spots at amazing castles all over the United Kindom.</p>
          <p>Write reviews to let everyone know how awesome your stay was.</p>
          <p>Create fun, lasting memories for everyone to enjoy together.</p>
          {/* <Link to="/spot">button</Link> */}
        </div>}
        {!sessionUser && <div id="homepage-top-grid_signup_form">
          <SignupFormPage />
        </div>}
      </div>
    </>
  );
}

export default TopHalfHomePage;
