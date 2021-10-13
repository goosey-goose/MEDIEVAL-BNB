const express = require('express')
const { Spot, Review } = require('../../db/models');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');


router.get('/',
     asyncHandler (async (req, res) => {

        // ORIGINAL QUERY
        // const spots = await Spot.findAll();

        // THIS QUERY RETURNS ALL SPOTS WITH ANY ASSOCIATED REVIEWS
        const spots = await Spot.findAll({
            include: Review,
            order: [["id", "ASC"]]
        });

        return res.json(spots);
    }));



module.exports = router;
