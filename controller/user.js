const User = require('../model/userDBSchema');
const bcrypt = require('bcryptjs');

exports.getUser = async (req, res) => {
    try {
        let user = await User.find();
        reversed = user.reverse();
        res.status(200).json({ user:reversed, token: req.token })
    } catch(err) {
        res.status(404).json({ msg: 'No user found', token: req.token });
    }
};

exports.getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email });
        res.status(200).json({ user: user, token: req.token })
    } catch(err) {
        res.status(404).json({ msg: 'No user found', token: req.token });
    }
};

exports.postUser = async (req, res) => {
    const userA = new User({
        email: 'genewang7@gmail.com',
        password: bcrypt.hashSync('ssssss', 10),
        code: '1234',
        isAdmin: false,
        isActivated: true
    });

    const user = await userA.save();
    res.status(201).json({ user, token: req.token });
};

exports.deleteUser = async (req, res) => {
    User.findOneAndDelete({email: req.params.email}, (err, result) => {
        if (err){
            res.status(500).json({msg: err, token: req.token});
        } 
        else{
            console.log('got deleted');
            res.status(204).json({msg: "got deleted", token: req.token});
        }
    })
};