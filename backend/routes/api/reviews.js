const express = require('express')
const { User, Booking, Review } = require('../../db/models');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');


// READ ALL REVIEWS
router.get('/',
     asyncHandler (async (req, res) => {

        const allReviews = await Review.findAll();

        return res.json(allReviews);

    }));




// CREATE A REVIEW
router.post('/new', requireAuth,
    asyncHandler(async (req, res) => {

        const { userId, spotId, review } = req.body;
        console.log(userId, spotId, review);
        const newReview = await Review.create({
            userId,
            spotId,
            review
        });

        res.json({"NEW REVIEW": newReview});
    })
);




// UPDATE A REVIEW
router.patch('/edit', requireAuth,
    asyncHandler(async (req, res) => {


        const { spotId, userId, review, newReview } = req.body;

        const updatedReview = {
            review: newReview
        }

        const reviewToUpdate = await Review.findOne({
            where: {
                userId,
                spotId,
                review
            }
        });


        const originalReview = {
            "userId": reviewToUpdate.userId,
            "spotId": reviewToUpdate.spotId,
            "review": reviewToUpdate.review
        };

        // USING THE .update() METHOD
        await reviewToUpdate.update(updatedReview);


        // USING THE .save() METHOD
        // bookingToUpdate.spotId = newSpot;
        // bookingToUpdate.startDate = newStart;
        // bookingToUpdate.endDate = newEnd;

        // await bookingToUpdate.save({ fields: ['spotId', 'startDate', 'endDate'] });

        res.json({
                    "ORIGINAL REVIEW:": originalReview,
                    "UPDATED REVIEW": reviewToUpdate
                });
    }));




// DELETE A REVIEW
router.delete('/delete', requireAuth,
    asyncHandler(async (req, res) => {

        // const { spotId, userId, review } = req.body;
        const { createdAt } = req.body;

        const reviewToDelete = await Review.findOne({
            // where: {
            //     userId,
            //     spotId,
            //     review
            // }
            where: {
                createdAt
            }
        });

        if (reviewToDelete !== null) {
            await Review.destroy({
                where: {
                    createdAt
                }
            });
        }

        // await reviewToDelete.destroy();

        res.json(
          {"DELETED REVIEW": reviewToDelete}
          );

    }));





module.exports = router;
