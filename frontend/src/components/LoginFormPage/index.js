// frontend/src/components/LoginFormPage/index.js
import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// import { getUserBookings } from '../../store/booking';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const demoUserEmail = "demo@user.io";
  const demoUserPassword = "password";

  ///////////////////////////////////////////////////////
  // debugger
  const onDemoLogin = () => {
    let credential = demoUserEmail;
    let password = demoUserPassword;
    // debugger
    return dispatch(sessionActions.login({credential, password})).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        setErrors(data.errors);
        console.log(data);
      }
    });

  };
  ///////////////////////////////////////////////////////

  // console.log("Bad Guy");

  if (sessionUser) {
    // console.log("Biff");
    // dispatch(getUserBookings());
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
      // return dispatch(getUserBookings()).catch(async (res) => {
      //   const data = await res.json();
      //   if (data && data.errors) console.log("there are errors...");
      // });
  }

  // useEffect(() => {
  //   if (sessionUser) {
  //     dispatch(getUserBookings());
  //   }
  // }, []);

  return (
    <>
    <form id="login_form" onSubmit={handleSubmit}>
      <ul style={{position: "absolute", top: "5rem"}}>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      {/* <p>Login</p> */}
      <label className="login_form_labels">
        Username or Email
        <input
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
          placeholder="Username or Email"
        />
      </label>
      <label className="login_form_labels">
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
      </label>
      <div id="login_submit_button">
        <button type="submit">Log In</button>
      </div>
    </form>
    <div id="login_button_divider">

    </div>
    <div id="demo_button_div">
      <button id="actual_demo_button" onClick={onDemoLogin}>Use Demo User</button>
    </div>
    </>
  );
}

export default LoginFormPage;
