const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');

// Item Model
const User = require('../../models/User');

// @route  POST api/auth
// @desc   Log in user
// @access Public
router.post('/', (req,res) => {
    const { email, password } = req.body;

    // Check for the empty fields 
    if (!email || !password) {
        res.status(400).json({ msg: 'Please fill all the blanks' });
    }

    // Check if email is used before
    User.findOne({ email })
        .then( user => {
            if(!user) return res.status(400).json({ msg: 'User does not exists' })

            // Check password match
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: "Invalid password" });

                    jwt.sign(
                        { id: user.id },
                        config.get('jwtSecret'),
                        { expiresIn: 3600 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }    
                    );
                })
        })
});


// @route  GET api/auth/user
// @desc   get user
// @access Private
router.get("/user", auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
});

    
module.exports = router;