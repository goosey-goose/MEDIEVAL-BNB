import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllSpots } from '../../store/spot';
// import Maps from '../Maps/Maps';
import MapContainer from '../Maps/index.js';
import './BottomHalfHomePage.css';

function BottomHalfHomePage() {
  const dispatch = useDispatch();

  const allSpots = useSelector(state => state.spots.spots);

  const switchBetweenTilesAndMap = (text) => {

    if (text === "Map") {
      let outerMostMapContainerDiv = document.getElementById("outermost-map-container-div");
      outerMostMapContainerDiv.classList.remove("hide");
      let homepageBottomGrid = document.getElementById("homepage-bottom-grid");
      homepageBottomGrid.classList.remove("show-tiles");
      homepageBottomGrid.classList.add("hide-tiles");
    } else if (text === "Tiles") {
      let outerMostMapContainerDiv = document.getElementById("outermost-map-container-div");
      outerMostMapContainerDiv.classList.add("hide");
      let homepageBottomGrid = document.getElementById("homepage-bottom-grid");
      homepageBottomGrid.classList.remove("hide-tiles");
      homepageBottomGrid.classList.add("show-tiles");
    }
  }


  const setActiveTab = (event, divInnerText = null) => {
    if (event === null && divInnerText !== undefined) {
      // console.log(tabs[1]);
      tabs[1].classList.remove("selected-tab");
      tabs[0].classList.add("selected-tab");
      return;
    }
    tabs.forEach((tab) => {
      if (event.currentTarget === tab) {
        tab.classList.add("selected-tab");
      } else tab.classList.remove("selected-tab");
    });

    switchBetweenTilesAndMap(event.currentTarget.innerText);
    // EBEN, REFACTOR THIS BLOCK IN A SEPARATE FUNCTION;
    // ALSO, GRAB THE CURRENTLY SELECTED TAB AND STORE IT IN A VARIABLE
    // IN ORDER TO REFERENCE IT INSTEAD OF THE CURRENT CONDITIONAL CHECKS
    // USING event.currentTarget.innerText....
    // if (event.currentTarget.innerText === "Map") {
    //   let outerMostMapContainerDiv = document.getElementById("outermost-map-container-div");
    //   outerMostMapContainerDiv.classList.remove("hide");
    //   let homepageBottomGrid = document.getElementById("homepage-bottom-grid");
    //   homepageBottomGrid.classList.remove("show-tiles");
    //   homepageBottomGrid.classList.add("hide-tiles");
    // } else if (event.currentTarget.innerText === "Tiles") {
    //   let outerMostMapContainerDiv = document.getElementById("outermost-map-container-div");
    //   outerMostMapContainerDiv.classList.add("hide");
    //   let homepageBottomGrid = document.getElementById("homepage-bottom-grid");
    //   homepageBottomGrid.classList.remove("hide-tiles");
    //   homepageBottomGrid.classList.add("show-tiles");
    // }
  }

  let tabs;
  useEffect(() => {
    tabs = document.querySelectorAll(".default-tab-style");
    tabs.forEach((tab) => {
      tab.addEventListener("click", (event) => setActiveTab(event));
    });
  }, [])



  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch])

  return (
    <>
      <div id="tabs-div-container">
        <div className="empty-tab-1"></div>
        <div className="selected-tab default-tab-style">Tiles</div>
        <div className="default-tab-style">Map</div>
        <div className="empty-tab-2"></div>
      </div>
      <div id="bottom-grid-and-map-container">
        <div id="homepage-bottom-grid" className="show-tiles">
          {allSpots && allSpots.map((spot, index) => {
            return (<div className="test-div" key={index}>
              <img alt="" src={spot.imageUrl}></img>
            </div>)
          })}
        </div>
        <div id="outermost-map-container-div" className="hide">
          <MapContainer setActiveTab={setActiveTab} switchBetweenTilesAndMap={switchBetweenTilesAndMap}></MapContainer>
        </div>
      </div>
    </>
  );
}

export default BottomHalfHomePage;
