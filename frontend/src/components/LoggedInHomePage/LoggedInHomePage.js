import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './LoggedInHomePage.css';

function LoggedInHomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  // const userBookings = useSelector(state => state.bookings.bookings.Bookings);
  const userBookings = useSelector(state => state.bookings?.bookings?.Bookings);
  // const userBookings = [];
  const [errors, setErrors] = useState([]);



  // useEffect(() => {
  //   userBookings = useSelector(state => state.bookings.bookings.Bookings);
  //   console.log("Ray Barone", userBookings);
  // }, []);

  // console.log("Ray Barone", userBookings);


  return (
    <div id="logged_in_main_div">
      <div id="limd_div_1">
        Trips
      </div>
      <div id="limd_div_2">
        Upcoming     Past
      </div>
      <div id="limd_div_3">

      </div>
    </div>
  );
}

export default LoggedInHomePage;
