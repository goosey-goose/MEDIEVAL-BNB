import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

function TestComponent() {
    const sessionUser = useSelector(state => state.session.user);

    if (sessionUser) return (
        <Redirect to="/" />
        // <p>Look OUT!!!!</p>
      );

    return (
        <p>TEST COMPONENT TEXT</p>
    );
}

export default TestComponent;
