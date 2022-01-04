import React, { useState, useEffect } from 'react';
import LoginFormPage from '../LoginFormPage/index';
import './TopHalfHomePage.css';

function TopHalfHomePage() {

  const toggleMenu = (event) => {
    event.stopPropagation();
    const menu = document.querySelector(".menu");
    // const closeIcon= document.querySelector(".closeIcon");
    // const menuIcon = document.querySelector(".menuIcon");
    // if (event.target.className === "menuIcon" || event.target.className === "closeIcon") {
    //   if (menu.classList.contains("showMenu")) {
    //     menu.classList.remove("showMenu");
    //     closeIcon.style.display = "none";
    //     menuIcon.style.display = "block";
    //   } else {
    //     menu.classList.add("showMenu");
    //     closeIcon.style.display = "block";
    //     menuIcon.style.display = "none";
    //   }
    // } else if (menu.classList.contains("showMenu")) {
    //     menu.classList.remove("showMenu");
    //     closeIcon.style.display = "none";
    //     menuIcon.style.display = "block";
    // }
    if (event.currentTarget.className === "hamburger") {
      console.log("hamsburger");
      if (menu.classList.contains("showMenu")) {
        menu.classList.remove("showMenu");
      } else {
        menu.classList.add("showMenu");
      }
    } else if (menu.classList.contains("showMenu")) {
      menu.classList.remove("showMenu");
    }

  }

  useEffect(() => {
    const menuItems = document.querySelectorAll(".menuItem");
    const hamburger= document.querySelector(".hamburger");
    const bodyElement = document.getElementsByTagName("body");

    hamburger.addEventListener("click", toggleMenu);

    menuItems.forEach(
      function(menuItem) {
        menuItem.addEventListener("click", toggleMenu);
      }
    )

    bodyElement[0].addEventListener('click', toggleMenu);
  }, [])

  return (
    <>
      <header>
          <p>Medieval BNB</p>
          <nav>
            <ul className="menu">
              <li><a className="menuItem" href="#">Home</a></li>
              <li><a className="menuItem" href="#">Food</a></li>
              <li><a className="menuItem" href="#">Places</a></li>
              <li><a className="menuItem" href="#">Things</a></li>
            </ul>
            <div id="nav-login-form-page-div">
              <LoginFormPage />
            </div>
            <button className="hamburger">
              {/* <i className="menuIcon">menu</i>
              <i className="closeIcon">close</i> */}
              <i className="fas fa-bars"></i>
            </button>
          </nav>
      </header>
      <div className="root-div-spacer"></div>
      <div id="homepage-top-grid">
        <div id="homepage-top-grid_title">
          Discover your next journey through time with family and friends on Medieval BNB.
        </div>
        <div id="homepage-top-grid_subpoints">
          <p>Book spots at amazing castles all over the United Kindom.</p>
          <p>Write reviews to let everyone know how awesome your stay was.</p>
          <p>Create fun, lasting memories for everyone to enjoy together.</p>
        </div>
      </div>
    </>
  );
}

export default TopHalfHomePage;
