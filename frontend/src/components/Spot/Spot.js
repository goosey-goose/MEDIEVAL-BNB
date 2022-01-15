import React, { useState, useEffect } from "react";
import Header from '../Header/Header.js';
import './Spot.css';

function Spot() {

    useEffect(() => {
        let root = document.getElementById("root");
        root.style.minWidth = "56.25rem";

        return () => {
            root.style.minWidth = "23rem";
        }
    });


    return (
        <div id="spot-outer-container-div">
            <div id="spot-outer-grid">
                <div id="spot-info-1">
                    <div>
                        Spot Title
                    </div>
                    <div>
                        Spot Address
                    </div>
                </div>
                <div id="spot-info-2">
                    <div>
                        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Eilean_Donan_Castle%2C_Scotland_-_Jan_2011.jpg/383px-Eilean_Donan_Castle%2C_Scotland_-_Jan_2011.jpg" /> */}
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Rochester_Castle_Keep_and_Bailey_0038stcp.JPG/600px-Rochester_Castle_Keep_and_Bailey_0038stcp.JPG" />
                        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Eilean_Donan_Castle%2C_Scotland_-_Jan_2011.jpg/383px-Eilean_Donan_Castle%2C_Scotland_-_Jan_2011.jpg" /> */}
                    </div>
                </div>
                <div id="spot-info-3">
                    <div id="spot-info-3_child_1">1</div>
                    <div id="spot-info-3_child_2">2</div>
                </div>
            </div>
        </div>
    );
}

export default Spot;
