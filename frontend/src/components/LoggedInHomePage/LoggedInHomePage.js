import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './LoggedInHomePage.css';

function LoggedInHomePage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);

  if (sessionUser) {
    //
  }

  return (
    <div id="logged_in_main_div">
      <div id="limd_div_1">
        Trips
      </div>
      <div id="limd_div_2">
        Upcoming     Past
      </div>
      <div id="limd_div_3">
        <div className="test-divs">

        </div>
        <div className="test-divs">

        </div>
        <div className="test-divs">

        </div>
        <div className="test-divs">

        </div>
        <div className="test-divs">

        </div>
        <div className="test-divs">

        </div>
        <div className="test-divs">

        </div>
        <div className="test-divs">

        </div>
        <div className="test-divs">

        </div>
        <div className="test-divs">

        </div>
        <div className="test-divs">

        </div>
      </div>
    </div>
  );
}

export default LoggedInHomePage;
