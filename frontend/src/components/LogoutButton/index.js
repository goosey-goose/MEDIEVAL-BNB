import React from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './LogoutButton.css'

const LogoutButton = () => {

    const dispatch = useDispatch()

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    return <button id="navlink_logout_button" onClick={logout}>Logout</button>;
  };

  export default LogoutButton;
