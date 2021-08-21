var User = require('../models/user');
var Barber = require('../models/barber');

var jwt = require('jwt-simple');
var config = require('../config/dbconfig');

function removeItemOnce(arr, value) {
    var index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}


var userfunctions = {
    addfavBarber: function (req, res) {
        console.log("in the function!");
        User.findOne({
            email: req.body.useremail
        }, function (err, user) {
            console.log("found a user");
            if (err) throw err;
            if (user) {
                Barber.findOne({
                    email: req.body.barberemail
                }, function (err, barber) {
                    console.log("found a barber");
                    if (err) throw err;
                    if (barber) {
                        user.favBarber.push(req.body.barberemail)
                        user.save(function (err, succ) {
                            if (err) {
                                res.json({ success: false, msg: 'Failed to add' });
                            } else {
                                console.log(user.favBarber);
                                res.json({ success: true, msg: 'Barber added' });
                            };

                        }
                        );
                    }
                })
            }
        })
    },

    removefavBarber: function (req, res) {
        console.log("in the function!");
        User.findOne({
            email: req.body.useremail
        }, function (err, user) {
            console.log("found a user");
            if (err) throw err;
            if (user) {
                Barber.findOne({
                    email: req.body.barberemail
                }, function (err, barber) {
                    console.log("found a barber");
                    if (err) throw err;
                    if (barber) {
                        removeItemOnce(user.favBarber, req.body.barberemail);
                        user.save(function (err, succ) {
                            if (err) {
                                res.json({ success: false, msg: 'Failed to remove' });
                            } else {
                                console.log(user.favBarber);
                                res.json({ success: true, msg: 'Barber removed from your user\'s fav list.' });
                            };

                        }
                        );
                    }
                })
            }
        })
    },

    addchatBarber: function (req, res) {
        console.log("in the function!");
        User.findOne({
            email: req.body.useremail
        }, function (err, user) {
            console.log("found a user");
            if (err) throw err;
            if (user) {
                Barber.findOne({
                    email: req.body.barberemail
                }, function (err, barber) {
                    console.log("found a barber");
                    if (err) throw err;
                    if (barber) {
                        user.chatBarber.push(req.body.barberemail)
                        user.save(function (err, succ) {
                            if (err) {
                                res.json({ success: false, msg: 'Failed to add to your chat list.' });
                            } else {
                                console.log(user.chatBarber);
                                res.json({ success: true, msg: 'Barber added to your chat list.' });
                            };

                        }
                        );
                    }
                })
            }
        })
    },

    removechatBarber: function (req, res) {
        console.log("in the function!");
        User.findOne({
            email: req.body.useremail
        }, function (err, user) {
            console.log("found a user");
            if (err) throw err;
            if (user) {
                Barber.findOne({
                    email: req.body.barberemail
                }, function (err, barber) {
                    console.log("found a barber");
                    if (err) throw err;
                    if (barber) {
                        removeItemOnce(user.chatBarber, req.body.barberemail);
                        user.save(function (err, succ) {
                            if (err) {
                                res.json({ success: false, msg: 'Failed to remove, from user\'s chat list.' });
                            } else {
                                console.log(user.chatBarber);
                                res.json({ success: true, msg: 'Barber removed from your user\'s chat list.' });
                            };

                        }
                        );
                    }
                })
            }
        })
    },
}

module.exports = userfunctions;

