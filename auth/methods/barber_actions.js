var Barber = require('../models/barber');
var jwt = require('jwt-simple');
var config = require('../config/dbconfig');
var Joi = require('joi');
const fs = require('fs');

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}

var barberfunctions = {
    addBarber: function (req, res) {
        Barber.findOne({
            email: req.body.email
        }, function (err, barber) {
            if (err) throw err;
            if ((!req.body.name) || (!req.body.email) || (!req.body.openingTime) || (!req.body.description) || (req.body.slots.length == 0)) {
                res.json({ success: false, msg: 'Developer, All required fields should be added!, contact manav shah if you are confused.' })
            } else {
                if (barber) {
                    res.status(403).send({ success: false, msg: 'Email is already being used!' })
                } else {
                    if (!(req.body.tags)) {
                        res.status(403).send({ success: false, msg: 'tags should be equal to 4' })
                    } else {
                        console.log(req.file);
                        const imgpath = req.file ? req.file.path : null;
                        var newBarber = Barber({
                            name: req.body.name,
                            email: req.body.email,
                            openingTime: req.body.openingTime,
                            image: req.file ? fs.readFileSync(imgpath) : null,
                            id: makeid(8),
                            description: req.body.description,
                            tags: req.body.tags.split(", "),
                            slots: req.body.slots.split(", "),
                        });
                        newBarber.save(function (err, newBarber) {
                            if (err) {
                                res.json({ success: false, msg: 'Failed to save' })
                            } else {
                                res.json({ success: true, msg: 'Succesfully saved!' })
                                fs.unlinkSync(String(imgpath), console.log("File removed!"));
                            }
                        })
                    }
                }
            }
        })
    },
    makeAChange: function (req, res) {
        Barber.findOne({
            email: req.body.email,
        }, function (err, barber) {
            if (err) throw err;
            if (!barber) {
                res.status(403).send({ success: false, msg: 'Email not found!' })
            } else {
                if (req.body.name || (req.body.email) || (req.body.openingTime) || (req.body.description) || (req.body.slots) || (req.body.tags) || (req.file)) {
                    console.log(barber.name);
                    console.log(barber.tags);
                    const imgpath = req.file ? req.file.path : null;
                    barber.updateOne({
                        name: req.body.name ? req.body.name : barber.name,
                        description: req.body.description ? req.body.description : barber.description,
                        openingTime: req.body.openingTime ? req.body.openingTime : barber.openingTime,
                        image: req.file ? fs.readFileSync(imgpath) : barber.image,
                        tags: req.body.tags ? req.body.tags.split(", ") : barber.tags,
                        slots: req.body.slots ? req.body.slots.split(", ") : barber.slots,
                    }, function (err, succ) {
                        if (err) {
                            res.json({ success: false, msg: 'Failed to change' })
                        } else {
                            res.json({ success: true, msg: 'Succesfully changed!' })
                        }
                    })
                }
            }
        })
    }
}

module.exports = barberfunctions;