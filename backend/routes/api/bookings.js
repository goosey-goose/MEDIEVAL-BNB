const express = require('express')
const { User, Booking } = require('../../db/models');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');


// READ A SINGLE USER'S BOOKINGS
router.get('/', requireAuth,
     asyncHandler (async (req, res) => {

        const userBookings = await User.findByPk(req.user.id, {
            include: Booking
        });

        // console.log("**********************************************", userBookings);

        return res.json(userBookings);
    }));




// READ ALL BOOKINGS
router.get('/all', requireAuth,
    asyncHandler (async (req, res) => {

    const allBookings = await Booking.findAll();

    return res.json(allBookings);
}));








// CREATE A BOOKING
router.post('/new', requireAuth,
    asyncHandler(async (req, res) => {

        const { userId, startDate, endDate } = req.body;
        let { spotId } = req.body;

        // spotId = parseInt(spotId);
        // spotId = spotId + 1;
        // spotId.toString();

        // CHECK IF DUPLICATE BOOKING / RECORD EXISTS
        const temp = await Booking.findOne({
            where: {
                spotId,
                startDate,
                endDate
            }
        });

        // console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX", temp);

        // IF NO DUPLICATE EXISTS, CREATE BOOKING
        if (temp === null) {
            const newBooking = await Booking.create({
                spotId,
                userId,
                startDate,
                endDate
            });

            res.json({"NEW BOOKING": newBooking});
        } else {
            res.json({"Error": "Booking already exists."});
        }

    })
);




// UPDATE A BOOKING
router.patch('/edit', requireAuth,
    asyncHandler(async (req, res) => {


        const { spotId, userId, startDate, endDate, newStart, newEnd } = req.body;

        // FIND THE CURRENT BOOKING
        const bookingToUpdate = await Booking.findOne({
            where: {
                userId,
                spotId,
                startDate,
                endDate
            }
        });

        // CHECK IF DUPLICATE BOOKING / RECORD EXISTS
        const temp = await Booking.findOne({
            where: {
                spotId,
                startDate,
                endDate
            }
        });

        // IF NO DUPLICATE EXISTS, UPDATE BOOKING
        if (temp === null && bookingToUpdate !== null) {
            const newBookingInfo = {
                startDate: newStart,
                endDate: newEnd
            }


            const originalBooking = {
                "userId": bookingToUpdate.userId,
                "spotId": bookingToUpdate.spotId,
                "startDate": bookingToUpdate.startDate,
                "endDate": bookingToUpdate.endDate
            };

            // USING THE .update() METHOD
            await bookingToUpdate.update(newBookingInfo);


            res.json(
                {
                    "ORIGINAL BOOKING:": originalBooking,
                    "UPDATED BOOKING": bookingToUpdate
                }
            );


        } else {
            res.json({"Error": "Booking already exists or something else went wrong."});
        }


        // USING THE .save() METHOD
        // bookingToUpdate.spotId = newSpot;
        // bookingToUpdate.startDate = newStart;
        // bookingToUpdate.endDate = newEnd;

        // await bookingToUpdate.save({ fields: ['spotId', 'startDate', 'endDate'] });


    }));




// DELETE A BOOKING
router.delete('/delete', requireAuth,
    asyncHandler(async (req, res) => {

        const { spotId, userId, startDate, endDate } = req.body;

        const bookingToDelete = await Booking.findOne({
            where: {
                userId,
                spotId,
                startDate,
                endDate
            }
        });

        await bookingToDelete.destroy();

        res.json(
            {
                "DELETED BOOKING": bookingToDelete
            }
        );

    }));





module.exports = router;
