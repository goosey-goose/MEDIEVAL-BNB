// frontend/src/components/Navigation/index.js
import React from 'react';
// import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
import LoginFormPage from "../../components/LoginFormPage";
import LogoutButton from '../LogoutButton';
import './Navigation.css';

function Navigation(){
  const sessionUser = useSelector(state => state.session.user);

  // let sessionLinks;
  if (sessionUser) {
    // sessionLinks = (
    //   <ProfileButton user={sessionUser} />
    // );
  } else {
    // sessionLinks = (
    //   <>
    //     <NavLink to="/login">Log In</NavLink>
    //     <NavLink to="/signup">Sign Up</NavLink>
    //   </>
    // );
  }

  return (
    <nav id="homepage_nav">
      <div id="homepage_div_grid">
        <div id="logo">Medieval BNB</div>
        {sessionUser ? <div id="logout_button_div"><LogoutButton /></div> : <div id="nav_login"><LoginFormPage /></div>}
      </div>
    </nav>

    // <ul>
    //   <li>
    //     <NavLink exact to="/">Home</NavLink>
    //     {isLoaded && sessionLinks}
    //   </li>
    // </ul>
  );
}

export default Navigation;
