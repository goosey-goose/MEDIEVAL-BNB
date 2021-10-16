import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createUserBooking, getUserBookings, getAllUserBookings } from "../../store/booking";
import { getAllReviews } from "../../store/review";
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';

import './AllSpots.css';

Modal.setAppElement('#root');


function AllSpots({ isLoaded }) {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const allSpots = useSelector(state => state.spots.spots);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const submitBooking = async () => {
      const temp = await dispatch(createUserBooking('4', '1', '2021-11-10', '2021-11-17'));
      console.log(temp);
      setModalIsOpen(false);
    }

    // useEffect(() => {
    //   dispatch(getUserBookings());
    //   dispatch(getAllUserBookings());
    //   dispatch(getAllReviews());
    // }, []);

    useEffect(() => {
        if (allSpots?.length) {
          let spotDivs = document.querySelectorAll(".spot_divs");
          spotDivs.forEach((spot) => {
            spot.addEventListener('click', (event) => {
              setModalIsOpen(true);
              spot.classList.add('no_effects');
              // console.log(event.target.currentSrc);
              if (!sessionUser) {
                let actualLoggedOutModal = document?.getElementById('actual_logged_out_modal');
                if (actualLoggedOutModal) {
                  actualLoggedOutModal.innerHTML = `<div id="div_inside_outer_modal"><img src=${event.target.currentSrc}></img></div>`;
                }
              } else if (sessionUser) {
                let actualLoggedInModal = document?.getElementById('actual_logged_in_modal');
                // console.log(actualLoggedInModal);
                if (actualLoggedInModal) {
                  let imageForLoggedInBooking = document.getElementById('image_for_logged_in_booking');
                  imageForLoggedInBooking.setAttribute('src', `${event.target.currentSrc}`)
                }
              }
            })
          });
        }
      });



    const holidays = [
      new Date('2021-10-24'),
      new Date('2021-10-25'),
      new Date('2021-10-26'),
      new Date('2021-10-27')
    ];



    return (
        <>
        <div id="tommy-test">
            <div id="spots_grid">
                {allSpots && allSpots.map((spot, index) => {
                return (<div className="spot_divs" key={index}>
                    <img src={spot.imageUrl}></img>
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
                backgroundColor: 'rgb(134, 134, 225)',
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
          let actualLoggedInModal = document.getElementById('actual_logged_in_modal');
          actualLoggedInModal.innerHTML = '';
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
              backgroundColor: 'rgb(134, 134, 225)',
              border: 'none'
            }
          }
        }
        >
        {/* {myDatePicker} */}


          <div id="div_inside_inner_modal">
            <img id="image_for_logged_in_booking"></img>
            {selectedStartDate && selectedEndDate && <div id="book_it_button_div"><button onClick={submitBooking}>Book It</button></div>}
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
              excludeDates={holidays}
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
              />
          </div>
        </Modal>}
        </>
    );
};

export default AllSpots;
