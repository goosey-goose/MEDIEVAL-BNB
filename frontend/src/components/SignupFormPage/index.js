// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { BsCheckCircleFill } from 'react-icons/bs';
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <form id="signup_form" onSubmit={handleSubmit}>
      <ul style={{position: "absolute", top: ".4rem", left: "-2rem", color: "white"}}>
        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
      </ul>
      <p>Sign Up</p>


      <div>
      <label className="signup_form_labels signup_email">
        {/* Email */}
        {/* <span className="signup_icons"><BsCheckCircleFill color='green' size='1.5rem' /></span> */}
        <input
          className="signup_inputs"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Email"
        />

      </label>
      <label className="signup_form_labels signup_username">
        {/* Username */}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Username"
        />
      </label>
      </div>



      <div>
      <label className="signup_form_labels">
        {/* Password */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Password"
        />
      </label>
      <label className="signup_form_labels">
        {/* Confirm Password */}
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          placeholder="Confirm Password"
        />
      </label>
      </div>


      <div>
        <button type="submit">Sign Up</button>
      </div>

    </form>
  );
}

export default SignupFormPage;
