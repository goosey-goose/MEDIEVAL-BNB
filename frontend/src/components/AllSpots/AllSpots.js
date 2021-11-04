import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserBooking } from "../../store/booking";
import { addUserReview, deleteUserReview } from "../../store/review";
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
    const [testSpotId, setTestSpotId] = useState(null);
    // const [showWriteReview, setShowWriteReview] = useState(false);
    const [review, setReview] = useState(null);

    let sId = null;


    const submitBooking = async () => {
      let temp = await dispatch(createUserBooking(spotId, sessionUser.id, selectedStartDate, selectedEndDate));
      // let bookItButtonDiv = document.getElementById("book_it_button_div");
      if (temp === null) {
        setModalIsOpen(false);
        setSelectedStartDate(null);
        setSelectedEndDate(null);
        currentSelectedSpot.classList.remove('no_effects');
      } else if (temp === "Bookings cannot overlap.") {
        // if (bookItButtonDiv) bookItButtonDiv.remove();
        let modalErrorsDiv = document.getElementById("modal_errors_div");
        if (modalErrorsDiv.innerHTML !== '') {
          modalErrorsDiv.innerHTML = '';
          modalErrorsDiv.style.padding = '0';
        }
        modalErrorsDiv.innerHTML = "<div>*Bookings cannot overlap.</div>";
        modalErrorsDiv.style.padding = ".5rem";
      } else if (temp === "Booking already exists.") {
        // if (bookItButtonDiv) bookItButtonDiv.remove();
        let modalErrorsDiv = document.getElementById("modal_errors_div");
        if (modalErrorsDiv.innerHTML !== '') {
          modalErrorsDiv.innerHTML = '';
          modalErrorsDiv.style.padding = '0';
        }
        modalErrorsDiv.innerHTML = "<div>*Booking already exists.</div>";
        modalErrorsDiv.style.padding = ".5rem";
      }
    }



    const submitReview = () => {
      let reviewTextArea = document.getElementById("review_box");
      // console.log(reviewTextArea.value);
      if (reviewTextArea.value !== '') {
        dispatch(addUserReview(sessionUser.id, sId, reviewTextArea.value));
        console.log(sId);
        let addReviewButton = document.getElementById("write_review_button");
        addReviewButton.innerText = 'Write a Review';
        let temp = document.getElementById("review_box");
        temp.remove();
        let temp2 = document.getElementById("submit_review_button");
        temp2.remove();
        let loggedInReviewsContainer = document.getElementById("logged_in_reviews_container");
        if (loggedInReviewsContainer.style.visibility === 'visible') {
          let reviewDiv = document.createElement("div");
          reviewDiv.style.padding = ".5rem .5rem 0 .5rem";
          reviewDiv.innerHTML = `<span style="font-weight: bold">${allUsers?.[sessionUser.id].username}</span> -- ${reviewTextArea.value}`;
          loggedInReviewsContainer.appendChild(reviewDiv);
        }
      } else {
        let modalErrorsDiv = document.getElementById("modal_errors_div");
        modalErrorsDiv.style.padding = ".5rem";
        modalErrorsDiv.innerHTML = "<div>*Review cannot be empty.</div>";
      }
    }

    console.log("eben: ", testSpotId);


    const showReviews = (id) => {
      // if (selectedStartDate || selectedEndDate) {
      //   setSelectedStartDate(null);
      //   setSelectedEndDate(null);
      // }
      let bookItButtonDiv = document.getElementById("book_it_button_div");
      if (bookItButtonDiv) bookItButtonDiv.style.visibility = "hidden";
      let modalErrorsDiv = document.getElementById("modal_errors_div");
      if (modalErrorsDiv.innerHTML !== '') {
        modalErrorsDiv.innerHTML = '';
        modalErrorsDiv.style.padding = '0';
      }
      console.log(id);
      let showReviewsbutton = document.querySelector(".show_reviews_button");
      let loggedOutReviewsContainer = document.getElementById("logged_out_reviews_container");
      let loggedInReviewsContainer = document.getElementById("logged_in_reviews_container");
      if (!sessionUser) {
        console.log("logged out");
        // let loggedOutReviewsContainer = document.getElementById("logged_out_reviews_container");
        let loggedOutCloseReviewsButton = document.getElementById("logged_out_close_reviews_button");
        loggedOutCloseReviewsButton.style.display = "inline-block";

        loggedOutReviewsContainer.style.animation = "slideMe .3s ease-in";
        loggedOutReviewsContainer.style.backgroundColor = "white";

        // let showReviewsbutton = document.querySelector(".show_reviews_button");

        loggedOutCloseReviewsButton.addEventListener('click', () => {
          loggedOutCloseReviewsButton.style.display = "none";
          loggedOutReviewsContainer.innerHTML = '';
          loggedOutReviewsContainer.style.visibility = 'hidden';
          showReviewsbutton.style.visibility = "visible";
        });
      } else {
        console.log("logged in");
          // let loggedInReviewsContainer = document.getElementById("logged_in_reviews_container");
          let loggedInCloseReviewsButton = document.getElementById("logged_in_close_reviews_button");
          loggedInCloseReviewsButton.style.display = "inline-block";

          loggedInReviewsContainer.style.animation = "slideMe .3s ease-in";
          loggedInReviewsContainer.style.backgroundColor = "white";

          // let showReviewsbutton = document.querySelector(".show_reviews_button");

          loggedInCloseReviewsButton.addEventListener('click', () => {
            loggedInCloseReviewsButton.style.display = "none";
            loggedInReviewsContainer.innerHTML = '';
            loggedInReviewsContainer.style.visibility = 'hidden';
            showReviewsbutton.style.visibility = "visible";
          });
        }

      showReviewsbutton.style.visibility = "hidden";
      allUserReviews?.forEach((review) => {
        if (review.spotId === id) {
          let reviewDiv = document.createElement("div");
          reviewDiv.setAttribute('data-id', `${review.createdAt}`);
          reviewDiv.setAttribute('class', 'review_div_class');
          reviewDiv.style.padding = ".5rem .5rem 0 .5rem";
          reviewDiv.style.cursor = "pointer";
          reviewDiv.innerHTML = `<span style="font-weight: bold">${allUsers?.[review.userId].username}</span> -- ${review.review}`;
          reviewDiv.addEventListener('click', (event) => {
            if (review.userId == sessionUser.id) {
              dispatch(deleteUserReview(event.target.attributes[0].value));
              setModalIsOpen(false);
            }
          })

          if (!sessionUser) {
            console.log("logged out");
            loggedOutReviewsContainer.appendChild(reviewDiv);
            loggedOutReviewsContainer.style.visibility = 'visible';
          } else {
            console.log("logged in");
            loggedInReviewsContainer.appendChild(reviewDiv);
            loggedInReviewsContainer.style.visibility = 'visible';
          }
        }
        if (loggedInReviewsContainer.innerHTML === '') {
          loggedInReviewsContainer.style.paddingBottom = "0";
        } else if (loggedInReviewsContainer.innerHTML !== '') {
          loggedInReviewsContainer.style.paddingBottom = ".5rem";
        }
      });

      // setShowWriteReview(true);


    }

    // console.log(review);

    const abc = () => {
      // let reactDatepickerInputContainer = document.querySelectorAll(".react-datepicker__input-container");
      // console.log(reactDatepickerInputContainer[0].children[0].value);
      // if (reactDatepickerInputContainer[0].children[0].value) {
      //   reactDatepickerInputContainer[0].children[0].value = '';
      // }
      // if (reactDatepickerInputContainer[1].children[0].value) {
      //   reactDatepickerInputContainer[1].children[0].value = '';
      // }
      let bookItButtonDiv = document.getElementById("book_it_button_div");
      if (bookItButtonDiv) bookItButtonDiv.style.visibility = "hidden";

      let modalErrorsDiv = document.getElementById("modal_errors_div");
      if (modalErrorsDiv.innerHTML !== '') {
        modalErrorsDiv.innerHTML = '';
        modalErrorsDiv.style.padding = '0';
      }
      let temp = document.getElementById("review_box");
      let temp2 = document.getElementById("submit_review_button");
      if (!temp) {
        let divInsideInnerModal = document.getElementById("div_inside_inner_modal");
        let submitReviewButton = document.createElement("button");
        submitReviewButton.setAttribute('id', 'submit_review_button');
        submitReviewButton.style.position = 'absolute';
        submitReviewButton.innerText = 'Submit Review';
        submitReviewButton.addEventListener('click', () => {
          submitReview();
        })
        let reviewTextArea = document.createElement("textarea");
        reviewTextArea.setAttribute('id', 'review_box');
        // reviewTextArea.rows = "1";
        // reviewTextArea.cols = "72";
        reviewTextArea.style.position = "absolute";
        // reviewTextArea.onchange = setReview;
        divInsideInnerModal.appendChild(submitReviewButton);
        divInsideInnerModal.appendChild(reviewTextArea);
      } else if (temp) {
          temp.remove();
          temp2.remove();
      }
      ///////////////////////////////////////////////////////////
      let loggedInReviewsContainer = document.getElementById("logged_in_reviews_container");
      let loggedInCloseReviewsButton = document.getElementById("logged_in_close_reviews_button");
      let showReviewsbutton = document.querySelector(".show_reviews_button");
      loggedInCloseReviewsButton.style.display = "none";
      loggedInReviewsContainer.innerHTML = '';
      loggedInReviewsContainer.style.visibility = 'hidden';
      showReviewsbutton.style.visibility = "visible";
      ///////////////////////////////////////////////////////////
      let addReviewButton = document.getElementById("write_review_button");
      if (addReviewButton.innerText === 'Write a Review') {
        addReviewButton.innerText = 'Close';
      } else if (addReviewButton.innerText === 'Close') {
        addReviewButton.innerText = 'Write a Review';
      }
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
                console.log("no session user here");
                // console.log("there is no session user............");
                let actualLoggedOutModal = document?.getElementById('actual_logged_out_modal');
                if (actualLoggedOutModal) {
                  actualLoggedOutModal.innerHTML = `<div id="div_inside_outer_modal" style="position: relative"><img src=${event.target.currentSrc}></img><div style="position: relative"><button id="logged_out_close_reviews_button">X</button></div><div id="logged_out_reviews_container" style="position: absolute; padding-bottom: .5rem; width: 100%; max-height: calc(100% - .5rem); overflow-y: scroll; border-radius: 10px"></div><button id="hide_this_button" class="show_reviews_button" type="button" style="position: absolute">REVIEWS</button></div>`;
                  let showReviewsbutton = document.querySelector(".show_reviews_button");
                  let hideThisButton = document.getElementById("hide_this_button");
                  hideThisButton.style.display = "none";
                  allSpots.forEach((spot) => {
                    if (spot.imageUrl === event.target.src) {
                      if (showReviewsbutton) {
                        showReviewsbutton.addEventListener('click', () => {
                          console.log("outside call");
                          showReviews(spot.id);
                        })
                      }
                    };
                  });
                }
              } else if (sessionUser) {
                console.log("right after session user");
                let actualLoggedInModal = document?.getElementById('actual_logged_in_modal');
                // console.log(actualLoggedInModal);
                if (actualLoggedInModal) {
                  let imageForLoggedInBooking = document.getElementById('image_for_logged_in_booking');
                  imageForLoggedInBooking.setAttribute('src', `${event.target.currentSrc}`);
                  // let showReviewsbutton = document.querySelector(".show_reviews_button");
                  allSpots.forEach((spot) => {
                    if (spot.imageUrl === event.target.src) {
                      setTestSpotId(spot.id);
                      sId = spot.id;
                      console.log("*************", testSpotId);
                      // if (showReviewsbutton) {
                      //   console.log("inside call");
                      //   showReviewsbutton.addEventListener('click', () => {
                      //     // console.log("inside call");
                      //     showReviews(spot.id);
                      //   })
                      // }
                    };
                  });
                }
                let spotAddress = document?.getElementById("spot_address");
                let spotName = document?.getElementById("spot_name");
                if (spotAddress) {
                  spotAddress.innerText = '';
                  allSpots.forEach((spot) => {
                    if (spot.imageUrl === event.target.src) {
                      // let showReviewsButtonRaw = (`<button id="show_reviews_below_write" className="show_reviews_button" type="button">Reviews</button>`);
                      spotAddress.innerText = spot.fullAddress;
                      // spotAddress.innerHTML = spot.fullAddress + showReviewsButtonRaw;
                      // let showReviewsButton = document.getElementById("show_reviews_below_write");
                      // showReviewsButton.addEventListener('click', () => {
                      //   let loggedInReviewsContainer = document.getElementById("logged_in_reviews_container");
                      //   if (loggedInReviewsContainer.innerHTML === '') {
                      //     showReviews(spot.id);
                      //   }
                      // })
                    }
                  });
                }
                if (spotName) {
                  // console.log("spotName is true..................................");
                  spotName.innerText = '';
                  allSpots.forEach((spot) => {
                    if (spot.imageUrl === event.target.src) {
                      // console.log("spot has been found..........................................");
                      let addReviewButtonRaw = (`<button id="write_review_button">Write a Review</button>`);
                      // spotName.innerText = spot.spotName;
                      spotName.innerHTML = spot.spotName + addReviewButtonRaw;
                      currentSpot = spot.id;
                      setSpotId(spot.id);

                      let addReviewButton = document.getElementById("write_review_button");
                      addReviewButton.addEventListener('click', () => {
                        abc();
                      })
                      console.log(addReviewButton);

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
            <div id="modal_errors_div"></div>
            <img alt="" id="image_for_logged_in_booking"></img>
            <div style={{position: "relative"}}>
              <button id="logged_in_close_reviews_button">X</button>
            </div>
            <div id="logged_in_reviews_container" style={{position: "absolute", paddingBottom: ".5rem", width: "100%", maxHeight: "calc(100% - .5rem)", overflowY: "scroll", borderRadius: "10px"}}>

            </div>
            <button className="show_reviews_button" type="button" onClick={() => showReviews(testSpotId)} style={{position: "absolute"}}>Reviews</button>
            {/* {selectedStartDate && selectedEndDate && <div id="book_it_button_div"><button onClick={submitBooking}>Book It</button></div>} */}
            <div id="book_it_button_div"><button onClick={submitBooking}>Book It</button></div>
          </div>

          <div style={{display: "flex", justifyContent: "space-between"}} id="spot_name">

          </div>

          <div id="spot_address">

          </div>


          <div id="date_picker_container_div">
            <DatePicker
              selected={selectedStartDate}
              onChange={date => {setSelectedStartDate(date); if (date && selectedEndDate) {document.getElementById("book_it_button_div").style.visibility = "visible";} else {document.getElementById("book_it_button_div").style.visibility = "hidden";} console.log(date);}}
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
              onChange={date => {setSelectedEndDate(date); if (date && selectedStartDate) {document.getElementById("book_it_button_div").style.visibility = "visible";} else {document.getElementById("book_it_button_div").style.visibility = "hidden";}}}
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
