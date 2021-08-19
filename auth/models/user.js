var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');




var userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    //experiment starts:
    userId: {
        type: String,
        require: true
    },
    image: {
        data: Buffer,
        type: String,
        require: false,
    },
    favBarber: [{
        type: String,
    }],
    chatBarber: [{
        type: String,
    }],
    nearbyBarber: [{
        type: String,
    }],
    phoneNumber: {
        type: Number
    }
    //now from here when we initiate a barber (sign up), we have to 
    //initialize above and some willl be empty. Make a null check and 
    // UI respond to null.
    //Also add card in database at the end.
})

userSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            })
        })
    } else {
        return next();
    }
})

userSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    })
}

module.exports = mongoose.model('User', userSchema);