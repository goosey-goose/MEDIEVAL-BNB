// frontend/src/components/LoginFormPage/index.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserBookings } from '../../store/booking';
import './LoggedInHomePage.css';

function LoggedInHomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);

  if (sessionUser) {
    //   dispatch(getUserBookings());
  }

  return (
    <div id="logged_in_main_div">Hello from LoggedInHomePage.</div>
  );
}

export default LoggedInHomePage;
