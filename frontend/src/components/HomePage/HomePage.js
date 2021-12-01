import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import TopHalfHomePage from '../TopHalfHomePage/TopHalfHomePage';
import BottomHalfHomePage from '../BottomHalfHomePage/BottomHalfHomePage';
// import { getAllSpots } from '../../store/spot';
import './HomePage.css';

function HomePage() {

  return (
    <>
      <TopHalfHomePage />
      <BottomHalfHomePage />
    </>
  );
}

export default HomePage;
