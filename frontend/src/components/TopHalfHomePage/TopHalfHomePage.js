import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import NavMenuLoggedOut from '../NavMenuLoggedOut/NavMenuLoggedOut.js';
import SignupFormPage from '../SignupFormPage/index.js';
import './TopHalfHomePage.css';

function TopHalfHomePage() {
  const sessionUser = useSelector(state => state.session.user);

  // const setActiveTab = (event) => {
  //   tabs.forEach((tab) => {
  //     if (event.currentTarget === tab) {
  //       tab.classList.add("selected-tab");
  //     } else tab.classList.remove("selected-tab");
  //   })
  // }

  // let tabs;
  // useEffect(() => {
  //   tabs = document.querySelectorAll(".default-tab-style");
  //   tabs.forEach((tab) => {
  //     tab.addEventListener("click", (event) => setActiveTab(event));
  //   });
  // }, [])


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
        {!sessionUser && <div id="homepage-top-grid_signup_form">
          <SignupFormPage />
        </div>}
      </div>
      {/* <div id="tabs-div-container">
        <div className="empty-tab-1"></div>
        <div className="selected-tab default-tab-style">Tiles</div>
        <div className="default-tab-style">Map</div>
        <div className="empty-tab-2"></div>
      </div> */}
    </>
  );
}

export default TopHalfHomePage;
