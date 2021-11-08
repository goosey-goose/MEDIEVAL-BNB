const express = require('express')

const { User, Spot, Booking, Review } = require('../../db/models');

const router = express.Router();


router.get('/', async (req, res) => {

    // const user = await User.findOne({
    //     where: {
    //       username: 'Demo-lition'
    //     },
    //     include: [Booking, Review]
    // });

    // res.json({
    //     "hello": "ebenezer"
    // });
    // console.log(user);

    const users = await User.findAll({
        raw: true
    });

    //console.log({...users});  // OUTPUTS ONE LARGE OBJECT INSTEAD OF AN ARRAY
    let usersObject = {};
    users.forEach((user) => {
        usersObject[user.id] = user;
    })
    console.log(usersObject);
    // const data = await users.json();

    return res.json(usersObject);
    // return res.json({"hi": "eben"});
});




//   return res.json({ user });







module.exports = router;
