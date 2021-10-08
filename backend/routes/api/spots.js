const express = require('express')
const { Spot } = require('../../db/models');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const { requireAuth } = require('../../utils/auth');


router.get('/', requireAuth,
     asyncHandler (async (req, res) => {

        const spots = await Spot.findAll();

        return res.json(spots);
    }));



module.exports = router;
