import React, { useState, useEffect } from 'react';
import LoginFormPage from '../LoginFormPage';
import './NavMenuLoggedOut.css';

function NavMenuLoggedOut() {

    const toggleMenu = (event) => {
        event.stopPropagation();
        const menu = document.querySelector(".menu");
        if (event.currentTarget.className === "hamburger") {
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
    </>
);
}

export default NavMenuLoggedOut;
