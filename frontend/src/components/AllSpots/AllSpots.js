import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserBooking } from "../../store/booking";
// import { getAllReviews } from "../../store/review";
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';

import './AllSpots.css';

Modal.setAppElement('#root');


function AllSpots({ isLoaded }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const allSpots = useSelector(state => state.spots.spots);
    const allUsers = useSelector(state => state.reviews.users);
    // const userBookings = useSelector(state => state.bookings?.bookings?.Bookings);
    const allUserBookings = useSelector(state => state.bookings.allUserBookings);
    const allUserReviews = useSelector(state => state.reviews.reviews);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [reservedDates, setReservedDates] = useState([]);
    const [currentSelectedSpot, setCurrentSelectedSpot] = useState(null);
    const [spotId, setSpotId] = useState(null);
    // const [currentSelectedBooking, setCurrentSelectedBooking] = useState(null);


    const submitBooking = async () => {
      let temp = await dispatch(createUserBooking(spotId, sessionUser.id, selectedStartDate, selectedEndDate));
      // console.log(temp);
      setModalIsOpen(false);
      setSelectedStartDate(null);
      setSelectedEndDate(null);
      currentSelectedSpot.classList.remove('no_effects');
    }




    const showReviews = (id) => {
      // console.log("show the reviews");
      let loggedOutReviewsContainer = document.getElementById("logged_out_reviews_container");

      loggedOutReviewsContainer.style.animation = "slideMe .3s ease-in";
      loggedOutReviewsContainer.style.backgroundColor = "white";
      // console.log(loggedOutReviewsContainer);

      let showReviewsbutton = document.getElementById("show_reviews_button");
      showReviewsbutton.style.display = "none";
      // console.log("#############", allUsers);
      allUserReviews?.forEach((review) => {
        // console.log(id);
        if (review.spotId === id) {
          let reviewDiv = document.createElement("div");
          reviewDiv.style.padding = ".5rem .5rem 0 .5rem";
          // reviewDiv.innerHTML = `<span style="font-weight: bold">${allUsers[3].username}</span>`;
          // reviewDiv.innerText = allUsers[review.userId].username + " -- " + '"' + review.review + '"';
          reviewDiv.innerHTML = `<span style="font-weight: bold">${allUsers?.[review.userId].username}</span> -- ${review.review}`;

          loggedOutReviewsContainer.appendChild(reviewDiv);
        }
      });


    }







    useEffect(() => {
      // console.log("this should run............................");
        if (allSpots?.length) {
          // console.log("allSpots now has length..................................");
          let spotDivs = document.querySelectorAll(".spot_divs");
          // console.log(spotDivs);
          spotDivs.forEach((spot) => {
            // console.log("spot");
            spot.addEventListener('click', (event) => {
              let currentSpot;
              setModalIsOpen(true);
              // console.log(spot.childNodes[0]);
              spot.classList.add('no_effects');
              setCurrentSelectedSpot(spot);
              // console.log(sessionUser);
              if (!sessionUser) {
                // console.log("there is no session user............");
                let actualLoggedOutModal = document?.getElementById('actual_logged_out_modal');
                if (actualLoggedOutModal) {
                  actualLoggedOutModal.innerHTML = `<div id="div_inside_outer_modal" style="position: relative"><img src=${event.target.currentSrc}></img><div id="logged_out_reviews_container" style="position: absolute; padding-bottom: .5rem; width: 100%"></div><button id="show_reviews_button" type="button" style="position: absolute">REVIEWS</button></div>`;
                  let showReviewsbutton = document.getElementById("show_reviews_button");
                  allSpots.forEach((spot) => {
                    if (spot.imageUrl === event.target.src) {
                      if (showReviewsbutton) {
                        showReviewsbutton.addEventListener('click', () => {
                          showReviews(spot.id);
                        })
                      }
                    };
                  });
                }
              } else if (sessionUser) {
                let actualLoggedInModal = document?.getElementById('actual_logged_in_modal');
                // console.log(actualLoggedInModal);
                if (actualLoggedInModal) {
                  let imageForLoggedInBooking = document.getElementById('image_for_logged_in_booking');
                  imageForLoggedInBooking.setAttribute('src', `${event.target.currentSrc}`)
                }
                let spotAddress = document?.getElementById("spot_address");
                let spotName = document?.getElementById("spot_name");
                if (spotAddress) {
                  spotAddress.innerText = '';
                  allSpots.forEach((spot) => {
                    if (spot.imageUrl === event.target.src) spotAddress.innerText = spot.fullAddress;
                  });
                }
                if (spotName) {
                  // console.log("spotName is true..................................");
                  spotName.innerText = '';
                  allSpots.forEach((spot) => {
                    if (spot.imageUrl === event.target.src) {
                      // console.log("spot has been found..........................................");
                      spotName.innerText = spot.spotName;
                      currentSpot = spot.id;
                      setSpotId(spot.id);

                      let tempReservedDates = [];

                      if (Array.isArray(allUserBookings)) {
                        // console.log("allUserBookings", allUserBookings);
                        allUserBookings.forEach((booking) => {
                          if (booking.spotId == currentSpot) {
                            let date1 = new Date(booking.endDate);
                            let date2 = new Date(booking.startDate);
                            let difference = date1.getTime() - date2.getTime();
                            let days = Math.ceil(difference / (1000 * 3600 * 24));
                            let startDate = booking.startDate;
                            let startDateInMilliseconds = new Date(startDate).getTime();
                            for (let i = 0, milliseconds = 86400000; i <= days; ++i, milliseconds += 86400000) {
                              tempReservedDates.push(new Date(startDateInMilliseconds + milliseconds));
                            }
                          }
                        });
                        setReservedDates(tempReservedDates);


                      } else if (allUserBookings !== null && !Array.isArray(allUserBookings)) {
                        let temp2 = Object.values(allUserBookings);
                        // console.log("temp2", temp2);
                        temp2.forEach((booking) => {
                          if (booking.spotId == currentSpot) {
                            let date1 = new Date(booking.endDate);
                            let date2 = new Date(booking.startDate);
                            let difference = date1.getTime() - date2.getTime();
                            let days = Math.ceil(difference / (1000 * 3600 * 24));
                            let startDate = booking.startDate;
                            let startDateInMilliseconds = new Date(startDate).getTime();
                            for (let i = 0, milliseconds = 86400000; i <= days; ++i, milliseconds += 86400000) {
                              tempReservedDates.push(new Date(startDateInMilliseconds + milliseconds));
                            }
                          }
                        });
                        setReservedDates(tempReservedDates);
                      }
                    }
                  });
                }
              }
            })
          });
        }
      }, [allUserBookings, allSpots, sessionUser]);









    return (
        <>
        <div id="tommy-test">
            <div id="spots_grid">
                {allSpots && allSpots.map((spot, index) => {
                return (<div className="spot_divs" key={index}>
                    <img alt="" src={spot.imageUrl}></img>
                    <div style={{display: "flex", justifyContent: "space-between", marginTop: ".3rem"}}><div>{spot.spotName}</div><div>${spot.price}</div></div>
                </div>)
                })}
            </div>


        </div>

        {/* MODAL FOR LOGGED OUT */}
        {isLoaded && !sessionUser && <Modal
            id="actual_logged_out_modal"
            isOpen={modalIsOpen}
            onRequestClose={() => {
            let actualLoggedOutModal = document.getElementById('actual_logged_out_modal');
            actualLoggedOutModal.innerHTML = '';
            setModalIsOpen(false);
            let spotDivs = document.querySelectorAll(".spot_divs");
            spotDivs.forEach((spot) => {
                spot.classList.remove('no_effects');
            })
            }}
            style={
            {
                overlay: {
                backgroundColor: 'transparent',
                // margin: '10rem'
                },
                content: {
                position: 'absolute',
                borderRadius: '10px',
                height: 'fit-content',
                margin: 'auto',
                width: 'fit-content',
                backgroundColor: 'rgb(33 33 84)',
                border: 'none'
                }
            }
            }
            >
            </Modal>}


        {/* -------------------------------------------------------------------------------------- */}


        {/* MODAL FOR LOGGED IN */}
        {isLoaded && sessionUser && <Modal
        id="actual_logged_in_modal"
        isOpen={modalIsOpen}
        onRequestClose={() => {
          // console.log("onRequestClose() called.......................................");
          let actualLoggedInModal = document.getElementById('actual_logged_in_modal');
          actualLoggedInModal.innerHTML = '';
          setModalIsOpen(false);
          // console.log(currentSelectedSpot.childNodes[0]);
          currentSelectedSpot.classList.remove('no_effects');
          // let spotDivs = document.querySelectorAll(".spot_divs");
          // spotDivs.forEach((spot) => {
          //   spot.classList.remove('no_effects');
          // })
          // let spotAddress = document?.getElementById("spot_address");
          // spotAddress.innerText = '';
        }}
        style={
          {
            overlay: {
              backgroundColor: 'transparent',
              // margin: '10rem'
            },
            content: {
              position: 'absolute',
              borderRadius: '10px',
              height: 'fit-content',
              margin: 'auto',
              width: 'fit-content',
              backgroundColor: 'rgb(33 33 84)',
              border: 'none'
            }
          }
        }
        >
        {/* {myDatePicker} */}


          <div id="div_inside_inner_modal">
            <img alt="" id="image_for_logged_in_booking"></img>
            {selectedStartDate && selectedEndDate && <div id="book_it_button_div"><button onClick={submitBooking}>Book It</button></div>}
          </div>

          <div id="spot_name">

          </div>

          <div id="spot_address">

          </div>


          <div id="date_picker_container_div">
            <DatePicker
              selected={selectedStartDate}
              onChange={date => setSelectedStartDate(date)}
              selectsStart
              startDate={selectedStartDate}
              endDate={selectedEndDate}
              dateFormat='yyyy-MM-dd'
              minDate={new Date()}
              placeholderText={'Start Date'}
              isClearable
              showYearDropdown
              scrollableMonthYearDropdown
              excludeDates={reservedDates}
              />



            <DatePicker
              selected={selectedEndDate}
              onChange={date => setSelectedEndDate(date)}
              selectsEnd
              startDate={selectedStartDate}
              endDate={selectedEndDate}
              dateFormat='yyyy-MM-dd'
              minDate={new Date()}
              placeholderText={'End Date'}
              isClearable
              showYearDropdown
              scrollableMonthYearDropdown
              excludeDates={reservedDates}
              />
          </div>
        </Modal>}
        </>
    );
};

export default AllSpots;
