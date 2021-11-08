import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { NavLink } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { updateUserBooking, deleteUserBooking } from "../../store/booking";
import { getAllUsers } from '../../store/review';
import './LoggedInHomePage.css';

function LoggedInHomePage({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const userBookings = useSelector(state => state.bookings.bookings);
  const allSpots = useSelector(state => state.spots.spots);
  const usersForReviews = useSelector(state => state?.reviews?.users);
  // const userBookings = useSelector(state => state.bookings?.bookings?.Bookings);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentSelectedBooking, setCurrentSelectedBooking] = useState(null);
  const [reservedDates, setReservedDates] = useState([]);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  // const [errors, setErrors] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [spotId, setSpotId] = useState(null);
  const [originalStartDate, setOriginalStartDate] = useState(null);
  const [originalEndDate, setOriginalEndDate] = useState(null);
  ////////////////////////////////////////////////////////////////////////////
  const [showFutureBookings, setShowFutureBookings] = useState(true);
  const [showPastBookings, setShowPastBookings] = useState(false);
  ////////////////////////////////////////////////////////////////////////////
  const [showUpdateButton, setShowUpdateButton] = useState(false);



  const updateBooking = async () => {
    // console.log("testing the update button");
    let temp = await dispatch(updateUserBooking(spotId, sessionUser.id, originalStartDate, originalEndDate, selectedStartDate, selectedEndDate));
    console.log(temp);
    if (temp === null) {
      setModalIsOpen(false);
      setSelectedStartDate(null);
      setSelectedEndDate(null);
    } else if (temp === "Bookings cannot overlap.") {
      let modal2ErrorsDiv = document.getElementById("modal2_errors_div");
      if (modal2ErrorsDiv.innerHTML !== '') {
        modal2ErrorsDiv.innerHTML = '';
        modal2ErrorsDiv.style.padding = '0';
      }
      modal2ErrorsDiv.innerHTML = "<div>*Bookings cannot overlap.</div>";
      modal2ErrorsDiv.style.padding = ".5rem";
    } else if (temp === "Booking already exists.") {
      let modal2ErrorsDiv = document.getElementById("modal2_errors_div");
      if (modal2ErrorsDiv.innerHTML !== '') {
        modal2ErrorsDiv.innerHTML = '';
        modal2ErrorsDiv.style.padding = '0';
      }
      modal2ErrorsDiv.innerHTML = "<div>*Booking already exists.</div>";
      modal2ErrorsDiv.style.padding = ".5rem";
    }
  };


  const testFunction = () => {
    setShowUpdateButton(true);
    let showDatePickerButton = document.getElementById("show_date_picker_button");
    showDatePickerButton.style.display = "none";
    let datePickerContainer = document.getElementById("date_picker_container_div2");
    datePickerContainer.style.display = "flex";
    datePickerContainer.style.flexDirection = "column";
    datePickerContainer.style.alignItems = "center";

    let deleteCheckbox = document.getElementById("delete_checkbox");
    let deleteBookingButton = document.getElementById("delete_booking_button");
    deleteBookingButton.setAttribute('disabled', 'true');
    deleteCheckbox.addEventListener('change', () => {
      if (deleteCheckbox.checked) {
        // console.log("check is working...........");
        // deleteBookingButton.style.backgroundColor = "rgb(255 252 248)";
        // deleteBookingButton.setAttribute('disabled', 'false');
        deleteBookingButton.removeAttribute('disabled');
        deleteBookingButton.style.cursor = "pointer";
        deleteBookingButton.style.color = "black";
      } else {
        // deleteBookingButton.style.backgroundColor = "#878787";
        deleteBookingButton.setAttribute('disabled', 'true');
        deleteBookingButton.style.cursor = 'inherit';
        deleteBookingButton.style.color = "white";
      }
    })
  };

  const deleteBooking = () => {
    // console.log("delete button is clicked");
    dispatch(deleteUserBooking(spotId, sessionUser.id, originalStartDate, originalEndDate));
    setModalIsOpen(false);
    // console.log(spotId, sessionUser.id, originalStartDate, originalEndDate);
  }



  const totalBookingCost = (booking) => {
    let date1 = new Date(booking.endDate);
    let date2 = new Date(booking.startDate);
    let difference = date1.getTime() - date2.getTime();
    let days = Math.ceil(difference / (1000 * 3600 * 24));
    let totalCost;
    allSpots.forEach((spot) => {
      if (spot.id === booking.spotId) {
        totalCost = (parseInt(days) + 1) * spot.price;
      }
    })
    return totalCost;
  }




      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      useEffect(() => {
        if (userBookings?.length) {
          // console.log("allSpots now has length..................................");
          let confirmedBookings = document.querySelectorAll(".confirmed_bookings");
          confirmedBookings.forEach((spot) => {
            spot.addEventListener('click', (event) => {
              // console.log(event.currentTarget.getAttribute('data-ca'));
              let currentSpot;
              let ogStartDate;
              let ogEndDate;
              setModalIsOpen(true);
              // console.log(spot.childNodes[0]);
              spot.classList.add('no_effects');
              setCurrentSelectedBooking(spot);
              // console.log(event);
              if (sessionUser) {
                let actualLoggedInModal2 = document?.getElementById('actual_logged_in_modal2');
                // console.log(actualLoggedInModal);
                if (actualLoggedInModal2) {
                  let imageForLoggedInBooking2 = document.getElementById('image_for_logged_in_booking2');
                  imageForLoggedInBooking2.setAttribute('src', `${event.target.currentSrc}`)
                }
                let spotAddress = document?.getElementById("spot_address2");
                let spotName = document?.getElementById("spot_name2");
                let bookingDates = document?.getElementById("booking_dates");
                // if (bookingDates) {
                //   userBookings.forEach((booking) => {

                //   })
                // }
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

                      if (bookingDates) {
                        userBookings.forEach((booking) => {
                          if (booking.spotId === currentSpot && booking.createdAt === event.currentTarget.getAttribute('data-ca')) {
                            setOriginalStartDate(booking.startDate);
                            setOriginalEndDate(booking.endDate);
                            ogStartDate = booking.startDate;
                            ogEndDate = booking.endDate;
                            setSelectedStartDate(new Date((booking.startDate).substr(5) + "-" + (booking.startDate).substr(0, 4)));
                            setSelectedEndDate(new Date((booking.endDate).substr(5) + "-" + (booking.endDate).substr(0, 4)));
                            let d1 = (booking.startDate).substr(5) + "-" + (booking.startDate).substr(0, 4);
                            let d2 = (booking.endDate).substr(5) + "-" + (booking.endDate).substr(0, 4);
                            bookingDates.innerHTML = `Your booking dates:` + '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + `${(new Date(d1)).toDateString()}`  + '&nbsp;&nbsp;&nbsp;&nbsp;' + 'to' + '&nbsp;&nbsp;&nbsp;&nbsp;' + `${(new Date(d2)).toDateString()}`;
                          }
                        })
                      }

                      let tempReservedDates = [];

                      if (Array.isArray(userBookings)) {
                        // console.log("allUserBookings", allUserBookings);
                        userBookings.forEach((booking) => {
                          if (booking.spotId == currentSpot && booking.startDate !== ogStartDate && booking.endDate !== ogEndDate) {
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


                      } else if (userBookings !== null && !Array.isArray(userBookings)) {
                        let temp2 = Object.values(userBookings);
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
      }, [userBookings, showFutureBookings, showPastBookings]);
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
      const toggleFuturePastBookings = (event) => {
        // console.log(event.target.id);
        let upcomingButton = document.getElementById("upcoming_bookings_button");
        let pastButton = document.getElementById("past_bookings_button");
        if (event.target.id === "upcoming_bookings_button") {
          pastButton.classList.remove("actively_focused_button");
          upcomingButton.classList.add("actively_focused_button");
          setShowPastBookings(false);
          setShowFutureBookings(true);
        } else if (event.target.id === "past_bookings_button") {
            upcomingButton.classList.remove("actively_focused_button");
            pastButton.classList.add("actively_focused_button");
            setShowFutureBookings(false);
            setShowPastBookings(true);
        }
      }

      useEffect(() => {
        let upcomingButton = document.getElementById("upcoming_bookings_button");
        upcomingButton.classList.add("actively_focused_button");
      }, [])
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////

      useEffect(() => {
        // if (!usersForReviews[sessionUser.id]) {
        //   // console.log("no such user");
        //   dispatch(getAllUsers());
        // }
        // if (usersForReviews[sessionUser.id]) {
        //   console.log("USER FOUND!!!!!");
        // }
        console.log("The Office");
        dispatch(getAllUsers());
      }, [sessionUser])


  return (
    <>
      <div id="logged_in_main_div">
        <div id="limd_div_1">
          Bookings
        </div>
        <div id="limd_div_2">
          <button id="upcoming_bookings_button" onClick={(event) => toggleFuturePastBookings(event)}>Upcoming</button><button id="past_bookings_button" onClick={(event) => toggleFuturePastBookings(event)}>Past</button>
        </div>
        <div style={{margin: "1rem"}}>
        <div id="limd_div_3">
          {/* {console.log(userBookings)} */}
          {userBookings && showFutureBookings && (userBookings.filter(booking => new Date(booking.startDate) > new Date())).map((booking, index) => {
            // console.log(booking.spotId);
            return (<div className="confirmed_bookings" data-ca={booking.createdAt} key={index}>
                <img alt="" src={allSpots[parseInt(booking.spotId) - 1].imageUrl}></img>
                <div className="cb_dates"><div>{((new Date((booking.startDate).substr(5) + "-" + (booking.startDate).substr(0, 4))).toDateString()).substr(4)}</div><div>to</div><div>{((new Date((booking.endDate).substr(5) + "-" + (booking.endDate).substr(0, 4))).toDateString()).substr(4)}</div></div>
                <div style={{display: "flex", justifyContent: "space-between", marginTop: "0"}}><div>{allSpots[parseInt(booking.spotId) - 1].spotName}</div><div></div></div>
                <div className="cb_total_cost"><div>{"Total:"}&nbsp;&nbsp;</div><div>{"$" + totalBookingCost(booking)}</div></div>
            </div>)
          })}

          {userBookings && showPastBookings && (userBookings.filter(booking => new Date(booking.startDate) < new Date())).map((booking, index) => {
            // console.log(booking.spotId);
            return (<div className="confirmed_bookings" data-ca={booking.createdAt} key={index}>
                <img alt="" src={allSpots[parseInt(booking.spotId) - 1].imageUrl}></img>
                <div className="cb_dates"><div>{((new Date((booking.startDate).substr(5) + "-" + (booking.startDate).substr(0, 4))).toDateString()).substr(4)}</div><div>to</div><div>{((new Date((booking.endDate).substr(5) + "-" + (booking.endDate).substr(0, 4))).toDateString()).substr(4)}</div></div>
                <div style={{display: "flex", justifyContent: "space-between", marginTop: "0"}}><div>{allSpots[parseInt(booking.spotId) - 1].spotName}</div><div></div></div>
                <div className="cb_total_cost"><div>{"Total:"}&nbsp;&nbsp;</div><div>{"$" + totalBookingCost(booking)}</div></div>
            </div>)
          })}
        </div>
        </div>
      </div>



        {/* MODAL FOR LOGGED IN */}
        {isLoaded && sessionUser && <Modal
        id="actual_logged_in_modal2"
        isOpen={modalIsOpen}
        onRequestClose={() => {
          // console.log("onRequestClose() called.......................................");
          let actualLoggedInModal2 = document.getElementById('actual_logged_in_modal2');
          actualLoggedInModal2.innerHTML = '';
          setModalIsOpen(false);
          setShowUpdateButton(false);
          // console.log(currentSelectedSpot.childNodes[0]);
          currentSelectedBooking.classList.remove('no_effects');
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


          <div id="div_inside_inner_modal2">
          <div id="modal2_errors_div"></div>
            <img alt="" id="image_for_logged_in_booking2"></img>
            {showUpdateButton && selectedStartDate && selectedEndDate && <div id="update_booking_button_div"><button onClick={updateBooking}>Update Booking</button></div>}
          </div>

          <div id="spot_name2">

          </div>

          <div id="spot_address2">

          </div>

          <div id="booking_dates">

          </div>


          {showDatePicker && <div id="show_date_picker_button">
            <button style={{cursor: "pointer"}} onClick={testFunction}>Change This Booking?</button>
          </div>}

          {showDatePicker && <div id="date_picker_container_div2">

            <div style={{display: "inline-flex"}}>
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


              <div style={{marginTop: "1rem"}}>
                <div style={{display: "inline-block"}}>
                  <input id="delete_checkbox" type="checkbox"></input>
                </div>
                <div style={{display: "inline-block"}}>
                  <button id="delete_booking_button" onClick={deleteBooking} style={{border: "none", lineHeight: "1.2", color: "white"}}>Delete this booking?</button>
                </div>
              </div>
          </div>}

        </Modal>}
    </>
  );
}

export default LoggedInHomePage;
