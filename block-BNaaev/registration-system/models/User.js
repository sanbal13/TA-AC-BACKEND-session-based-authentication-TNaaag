let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');

let userSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, minlength: 5},
    age: {type: Number, min: 18, max: 100},
    phone: {type: Number, minlength: 7}
}, {timestamps: true});

userSchema.pre('save', function (next) {
    if(this.password && this.isModified('password')) {
        bcrypt.hash(this.password, 10, (err, hashed) => {
            if(err) return next(err);
            this.password = hashed;
            return next();
        });
    } else {
        next();
    }
});

let User = mongoose.model('User', userSchema);

module.exports = User;
