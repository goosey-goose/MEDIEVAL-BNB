import React, { useState } from 'react';
import TopHalfHomePage from '../TopHalfHomePage/TopHalfHomePage';
import BottomHalfHomePage from '../BottomHalfHomePage/BottomHalfHomePage';
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
