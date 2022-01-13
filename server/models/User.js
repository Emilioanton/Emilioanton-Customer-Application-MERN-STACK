const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        min : 6,
        max : 15,
        unique: true,
    },
    password : {
        type : String,
    },
    role : {
        type : String,
        enum : ['user','admin'],
        required: true
    },
    companyname : {
        type : String,
    },
    language : {
        type : String,
    },
    custnumb : {
        type : String,
    },
});

UserSchema.pre('save', function(next){
    if(!this.isModified('password'))
        return next();
    bcryptjs.hash(this.password,10,(err,passwordHash)=>{
        if(err){
            console.log("error occurred")
            return next(err);
        }

        this.password = passwordHash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password,cb){
    bcryptjs.compare(password,this.password,(err,isMatch)=>{
        if(err)
            return cb(err);
        else{
            if(!isMatch)
                return cb(null,isMatch);
            return cb(null,this);
        }
    });
}

module.exports = mongoose.model('User',UserSchema);