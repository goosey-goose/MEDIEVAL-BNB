import React, { useState, useEffect } from 'react';
import './TopHalfHomePage.css';

function TopHalfHomePage() {
  let menu;
  let closeIcon;
  let menuIcon;

  function toggleMenu() {
    console.log("hamburger menu clicked");
    if (menu.classList.contains("showMenu")) {
      console.log("A");
      menu.classList.remove("showMenu");
      closeIcon.style.display = "none";
      menuIcon.style.display = "block";
    } else {
      console.log("B");
      menu.classList.add("showMenu");
      closeIcon.style.display = "block";
      menuIcon.style.display = "none";
    }
  }

  useEffect(() => {
    menu = document.querySelector(".menu");
    const menuItems = document.querySelectorAll(".menuItem");
    const hamburger= document.querySelector(".hamburger");
    closeIcon= document.querySelector(".closeIcon");
    menuIcon = document.querySelector(".menuIcon");

    hamburger.addEventListener("click", toggleMenu);

    menuItems.forEach(
      function(menuItem) {
        menuItem.addEventListener("click", toggleMenu);
      }
    )
  }, [])

  return (
    <div id="homepage-top-grid">
      <header>
        Medieval BNB
        <nav>
          <ul className="menu">
            <li><a className="menuItem" href="#">Home</a></li>
            <li><a className="menuItem" href="#">Food</a></li>
            <li><a className="menuItem" href="#">Places</a></li>
            <li><a className="menuItem" href="#">Things</a></li>
          </ul>
          <button className="hamburger">
            <i className="menuIcon">menu</i>
            <i className="closeIcon">close</i>
          </button>
        </nav>
      </header>
    </div>
  );
}

export default TopHalfHomePage;
