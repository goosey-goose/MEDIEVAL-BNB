import React, { useState, useEffect } from 'react';
import './TopHalfHomePage.css';

function TopHalfHomePage() {

  const toggleMenu = (event) => {
    event.stopPropagation();
    const menu = document.querySelector(".menu");
    const closeIcon= document.querySelector(".closeIcon");
    const menuIcon = document.querySelector(".menuIcon");
    if (event.target.className === "menuIcon" || event.target.className === "closeIcon") {
      if (menu.classList.contains("showMenu")) {
        // console.log("A");
        menu.classList.remove("showMenu");
        closeIcon.style.display = "none";
        menuIcon.style.display = "block";
      } else {
        // console.log("B");
        menu.classList.add("showMenu");
        closeIcon.style.display = "block";
        menuIcon.style.display = "none";
      }
    } else if (menu.classList.contains("showMenu")) {
        menu.classList.remove("showMenu");
        closeIcon.style.display = "none";
        menuIcon.style.display = "block";
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
