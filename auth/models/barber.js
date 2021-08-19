var mongoose = require('mongoose');
var Schema = mongoose.Schema;

function Slot(hour, min, isOccupied) {
    this.hour = hour;
    this.min = min;
    this.isOccupied = isOccupied;
}

var barberSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    openingTime: {
        type: String,
        require: true
    },
    distance: {
        type: Number,
    },
    image: {
        data: Buffer,
        type: String,
        require: false,
    },
    id: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    tags: [{
        type: String
    }],
    slots: [{
        type: String
    }],
    //add location...
})

module.exports = mongoose.model('Barber', barberSchema);