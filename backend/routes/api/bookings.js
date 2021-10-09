const express = require('express')
const { User, Booking } = require('../../db/models');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');


// RETURN A SINGLE USER'S BOOKINGS
router.get('/', requireAuth,
     asyncHandler (async (req, res) => {

        // console.log(req.user.id);

        const userBookings = await User.findByPk(req.user.id, {
            include: Booking
        });

        return res.json(userBookings);
        // res.send("hello");
    }));




// CREATE A BOOKING
router.post('/new', requireAuth,
    asyncHandler(async (req, res) => {

        const { spotId, userId, startDate, endDate } = req.body;

        const newBooking = await Booking.create({
            spotId,
            userId,
            startDate,
            endDate
        });

        res.json(newBooking);
    })
);



module.exports = router;
