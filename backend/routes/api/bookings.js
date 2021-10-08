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



module.exports = router;
