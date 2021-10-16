const express = require('express')

const { User, Spot, Booking, Review } = require('../../db/models');

const router = express.Router();


router.get('/', async (req, res) => {

    const user = await User.findOne({
        where: {
          username: 'Demo-lition'
        },
        include: [Booking, Review]
    });

    // res.json({
    //     "hello": "ebenezer"
    // });
    // console.log(user);
    return res.json(
        {
            spotId: user.Bookings[0]["spotId"]
        }
    );
});




//   return res.json({ user });







module.exports = router;
