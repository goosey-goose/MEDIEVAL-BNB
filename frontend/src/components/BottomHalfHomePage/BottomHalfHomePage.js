import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spot';
import './BottomHalfHomePage.css';

function BottomHalfHomePage() {
  const dispatch = useDispatch();

  const allSpots = useSelector(state => state.spots.spots);



  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch])

  return (
    <div id="homepage-bottom-grid">
      {allSpots && allSpots.map((spot, index) => {
        return (<div className="test-div" key={index}>
          <img alt="" src={spot.imageUrl}></img>
        </div>)
      })}
    </div>
  );
}

export default BottomHalfHomePage;
