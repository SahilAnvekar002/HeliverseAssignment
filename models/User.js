import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fname : {
        type : String,
        required : true
    },
    lname : {
        type : String,
        required : true
    },
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    classId : {
        type : String,
        default : ''
    },
    designation : {
        type : String,
        required : true
    }
    
}, {timestamps: true});

export default mongoose.models.User || mongoose.model('User', userSchema);