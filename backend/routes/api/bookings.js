const express = require('express')
const { User, Booking } = require('../../db/models');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');
const { Op } = require("sequelize");


// READ A SINGLE USER'S BOOKINGS
router.get('/', requireAuth,
     asyncHandler (async (req, res) => {

        // const userBookings = await User.findByPk(req.user.id, {
        //     include: Booking
        // });

        const userBookings = await Booking.findAll({
            where: {
                userId: req.user.id
            }
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



/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TESTING SEQUELIZE QUERIES
router.get('/queries', requireAuth,
    asyncHandler (async (req, res) => {

    let id = '2';
    let sDate = '2021-10-27';
    let eDate = '2021-11-22';

    // FIND THE CURRENT BOOKING
    const bookingToUpdate = await Booking.findOne({
        where: {
            userId: "4",
            spotId: "2",
            startDate: "2021-10-28",
            endDate: "2021-11-16"
        }
    });

    const response = await Booking.findAll({
        where: {
            [Op.or]: [
                        {
                            spotId: id,
                            startDate: {
                                [Op.lt]: sDate,
                                // [Op.ne]: sDate
                            },
                            endDate: {
                                [Op.gt]: sDate,
                                // [Op.ne]: eDate
                            },
                            createdAt: {
                                [Op.ne]: bookingToUpdate.createdAt
                            }
                        },

                        {
                            spotId: id,
                            startDate: {
                                [Op.lt]: eDate,
                                // [Op.ne]: sDate
                            },
                            endDate: {
                                [Op.gt]: eDate,
                                // [Op.ne]: eDate
                            },
                            createdAt: {
                                [Op.ne]: bookingToUpdate.createdAt
                            }
                        },

                        {
                            spotId: id,
                            startDate: {
                                [Op.gt]: sDate,
                                // [Op.ne]: sDate
                            },
                            endDate: {
                                [Op.lt]: eDate,
                                // [Op.ne]: eDate
                            },
                            createdAt: {
                                [Op.ne]: bookingToUpdate.createdAt
                            }
                        },

                        // {
                        //     spotId: id,
                        //     startDate: {
                        //         // [Op.gt]: sDate,
                        //         [Op.ne]: sDate
                        //     },
                        //     endDate: {
                        //         // [Op.lt]: eDate,
                        //         [Op.ne]: eDate
                        //     }
                        // }
                    ]
        },
        // where: {
        //     startDate: {[Op.ne]: sDate},
        //     endDate: {[Op.ne]: eDate}
        // }

    });

    return res.json(response);
}));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////








// CREATE A BOOKING
router.post('/new', requireAuth,
    asyncHandler(async (req, res) => {

        const { spotId, userId, startDate, endDate } = req.body;
        // let { spotId } = req.body;
        let sDate = startDate;
        let eDate = endDate;
        let id = spotId;

        // spotId = parseInt(spotId);
        // spotId = spotId + 1;
        // spotId.toString();

        // CHECK IF DUPLICATE BOOKING / RECORD EXISTS
        const temp1 = await Booking.findOne({
            where: {
                spotId,
                startDate,
                endDate
            }
        });

        // CHECK IF THERE ARE ANY OVERLAPPING BOOKINGS
        const temp2 = await Booking.findOne({
            where: {
                [Op.or]: [
                            {
                                spotId: id,
                                startDate: {
                                    [Op.lt]: sDate
                                },
                                endDate: {
                                    [Op.gt]: sDate
                                }
                            },

                            {
                                spotId: id,
                                startDate: {
                                    [Op.lt]: eDate
                                },
                                endDate: {
                                    [Op.gt]: eDate
                                }
                            },

                            {
                                spotId: id,
                                startDate: {
                                    [Op.gt]: sDate
                                },
                                endDate: {
                                    [Op.lt]: eDate
                                }
                            }
                        ]
            }
        });

        // IF NO DUPLICATE AND OVERLAPPING EXISTS, CREATE BOOKING
        if (temp1 === null && temp2 === null) {
            const newBooking = await Booking.create({
                spotId,
                userId,
                startDate,
                endDate
            });

            res.json({"NEW BOOKING": newBooking});
        } else if (temp1 !== null) {
            res.json({"Error": "Booking already exists."});
        } else if (temp2 !== null) {
            res.json({"Error": "Bookings cannot overlap."});
        } else {
            res.json({"Error": "Something went wrong when creating this booking. Please try again."});
        }

    })
);




// UPDATE A BOOKING
router.patch('/edit', requireAuth,
    asyncHandler(async (req, res) => {


        const { spotId, userId, startDate, endDate, newStart, newEnd } = req.body;

        let sDate = newStart;
        let eDate = newEnd;
        let id = spotId;

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
        const temp1 = await Booking.findOne({
            where: {
                spotId,
                "startDate": newStart,
                "endDate": newEnd
            }
        });


        // CHECK IF THERE ARE ANY OVERLAPPING BOOKINGS
        const temp2 = await Booking.findAll({
            where: {
                [Op.or]: [
                            {
                                spotId: id,
                                startDate: {
                                    [Op.lt]: sDate
                                },
                                endDate: {
                                    [Op.gt]: sDate
                                },
                                createdAt: {
                                    [Op.ne]: bookingToUpdate.createdAt
                                }
                            },

                            {
                                spotId: id,
                                startDate: {
                                    [Op.lt]: eDate
                                },
                                endDate: {
                                    [Op.gt]: eDate
                                },
                                createdAt: {
                                    [Op.ne]: bookingToUpdate.createdAt
                                }
                            },

                            {
                                spotId: id,
                                startDate: {
                                    [Op.gt]: sDate
                                },
                                endDate: {
                                    [Op.lt]: eDate
                                },
                                createdAt: {
                                    [Op.ne]: bookingToUpdate.createdAt
                                }
                            },

                            // {
                            //     spotId: id,
                            //     startDate: {
                            //         [Op.ne]: sDate
                            //     },
                            //     endDate: {
                            //         [Op.ne]: eDate
                            //     }
                            // }
                        ]
            }
        });


        // IF NO DUPLICATE EXISTS AND NOTHING OVERLAPS, UPDATE BOOKING
        if (temp1 === null && temp2.length === 0 && bookingToUpdate !== null) {
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
            // await bookingToUpdate.update(newBookingInfo);
            await Booking.update(newBookingInfo, {
                where: {
                    userId,
                    spotId,
                    startDate,
                    endDate
                }
            });

            const newUpdatedBooking = await Booking.findOne({
                where: {
                    userId,
                    spotId,
                    startDate: newStart,
                    endDate: newEnd
                }
            })


            // USING THE .save() METHOD
            // bookingToUpdate.spotId = newSpot;
            // bookingToUpdate.startDate = newStart;
            // bookingToUpdate.endDate = newEnd;

            // await bookingToUpdate.save({ fields: ['startDate', 'endDate'] });


            res.json(
                {
                    "ORIGINAL BOOKING:": originalBooking,
                    "UPDATED BOOKING": newUpdatedBooking
                }
            );


        } else {
            res.json({"Error": "Booking already exists or something else went wrong."});
        }



    }));




// DELETE A BOOKING
router.delete('/delete', requireAuth,
    asyncHandler(async (req, res) => {

        const { spotId, userId, startDate, endDate } = req.body;

        console.log("##########################", spotId, userId, startDate, endDate);

        const bookingToDelete = await Booking.findOne({
            where: {
                userId,
                spotId,
                startDate,
                endDate
            }
        });

        // console.log("%%%%%%%%%%%%%%%%%%%", bookingToDelete);

        // await bookingToDelete.destroy();

        if (bookingToDelete !== null) {
            await Booking.destroy({
                where: {
                    userId,
                    spotId,
                    startDate,
                    endDate
                }
            });
        }



        res.json(
            {
                "DELETED BOOKING": bookingToDelete
            }
        );

    }));





module.exports = router;
