import React from 'react';
import { useSelector } from 'react-redux';
import './LoggedInHomePage.css';

function LoggedInHomePage() {
  // const dispatch = useDispatch();
  // const sessionUser = useSelector(state => state.session.user);
  const userBookings = useSelector(state => state.bookings?.bookings?.Bookings);
  const allSpots = useSelector(state => state.spots.spots);
  // const [errors, setErrors] = useState([]);

  // console.log(allSpots);

  return (
    <div id="logged_in_main_div">
      <div id="limd_div_1">
        Trips
      </div>
      <div id="limd_div_2">
        Upcoming     Past
      </div>
      <div style={{margin: "1rem"}}>
      <div id="limd_div_3">
        {userBookings && userBookings.map((booking, index) => {
          // console.log(booking.spotId);
          return (<div className="confirmed_bookings" key={index}>
              <img alt="" src={allSpots[parseInt(booking.spotId) - 1].imageUrl}></img>
              <div style={{display: "flex", justifyContent: "space-between", marginTop: "1.3rem"}}><div>{allSpots[booking.spotId].spotName}</div><div>${allSpots[booking.spotId].price}</div></div>
          </div>)
        })}
      </div>
      </div>
    </div>
  );
}

export default LoggedInHomePage;
