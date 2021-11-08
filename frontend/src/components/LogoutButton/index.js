import React from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { removeUserBookings } from '../../store/booking';
import { removeAllReviews } from '../../store/review';
import './LogoutButton.css'

const LogoutButton = () => {

    const dispatch = useDispatch()

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        dispatch(removeUserBookings());
        // dispatch(removeAllReviews());
    };

    return <button id="navlink_logout_button" onClick={logout}>Logout</button>;
  };

  export default LogoutButton;
