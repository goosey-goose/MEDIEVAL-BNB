import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spot';
import './BottomHalfHomePage.css';

function BottomHalfHomePage() {
  const dispatch = useDispatch();

  const allSpots = useSelector(state => state.spots.spots);

  if (allSpots) {
    console.log(allSpots);
  }

  useEffect(() => {
    dispatch(getAllSpots());
  }, [])

  return (
    <div id="homepage-bottom-grid">
      <div className="test-div"></div>
      <div className="test-div"></div>
      <div className="test-div"></div>
      <div className="test-div"></div>
      <div className="test-div"></div>
      <div className="test-div"></div>
      <div className="test-div"></div>
      <div className="test-div"></div>
      <div className="test-div"></div>
      <div className="test-div"></div>
      <div className="test-div"></div>
      <div className="test-div"></div>
      <div className="test-div"></div>
      <div className="test-div"></div>
      <div className="test-div"></div>
      <div className="test-div"></div>
      <div className="test-div"></div>
      <div className="test-div"></div>
      <div className="test-div"></div>
      <div className="test-div"></div>
    </div>
  );
}

export default BottomHalfHomePage;
