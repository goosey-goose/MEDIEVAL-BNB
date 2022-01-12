import React, { useState, useEffect } from "react";
import NavMenuLoggedOut from "../NavMenuLoggedOut/NavMenuLoggedOut";
import './Header.css';

function Header() {
  // console.log({navbar: "rendering"});

    return (
        <>
        <header>
          <p className="header-paragraph">Medieval BNB</p>
          <nav>
            <NavMenuLoggedOut />
          </nav>
      </header>
      <div className="root-div-spacer"></div>
      </>
    );
}

export default Header;
