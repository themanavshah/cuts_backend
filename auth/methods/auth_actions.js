var User = require('../models/user');
var jwt = require('jwt-simple');
var config = require('../config/dbconfig');
var Joi = require('joi');

const joiSchema = Joi.object({
    name: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
})

var authfunctions = {
    addNew: function (req, res) {
        const validation = joiSchema.validate(req.body);
        User.findOne({
            email: req.body.email
        },
            function (err, user) {
                if (err) throw err;
                if ((!req.body.name) || (!req.body.password) || (!req.body.email)) {
                    res.json({ success: false, msg: 'Enter all the fields' })
                } else {
                    if (user) {
                        res.status(403).send({ success: false, msg: 'Email is already being used!' })
                    } else {
                        if (validation.error) {
                            res.json({ success: false, msg: `${validation.error['details'][0]['message']}` });
                        } else {
                            var newUser = User({
                                name: req.body.name,
                                password: req.body.password,
                                email: req.body.email
                            });
                            newUser.save(function (err, newUser) {
                                if (err) {
                                    res.json({ success: false, msg: 'Failed to save' })
                                } else {
                                    res.json({ success: true, msg: 'Succesfully saved!' })
                                }
                            })
                        }
                    }
                }
            })
    },
    authenticate: function (req, res) {
        User.findOne({
            email: req.body.email
        }, function (err, user) {
            if (err) throw err;
            if (!user) {
                res.json({ success: false, msg: 'User not found!' })
            } else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (isMatch && !err) {
                        var token = jwt.encode(user, config.secret);
                        res.json({ success: true, token: token })
                    } else {
                        res.json({ success: false, msg: 'Authetication failed, wrong password!' })
                    }
                })
            }
        })
    },
    getinfo: function (req, res) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            var token = req.headers.authorization.split(' ')[1]
            var decodedtoken = jwt.decode(token, config.secret)
            return res.json({ success: true, msg: `hello ${decodedtoken.name}` })
        } else {
            return res.json({ success: false, msg: 'No headers' })
        }
    }
}

module.exports = authfunctions;