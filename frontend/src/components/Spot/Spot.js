import React, { useState, useEffect } from "react";
import Header from '../Header/Header.js';
import './Spot.css';

function Spot() {
    return (
        <div id="spot-outer-container-div">
            <div id="spot-outer-grid">
                <div style={{backgroundColor: "red"}}></div>
                <div style={{backgroundColor: "yellow"}}></div>
                <div style={{backgroundColor: "green"}}></div>
                <div id="spot-outer-grid_child_4">
                    <div id="child_4-a"></div>
                    <div id="child_4-b"></div>
                </div>
            </div>
        </div>
    );
}

export default Spot;
