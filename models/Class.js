import mongoose from "mongoose";

const classSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    startDay : {
        type : String,
        required : true
    },
    endDay : {
        type : String,
        required : true
    },
    startTime : {
        type : String,
        required : true
    },
    endTime : {
        type : String,
        required : true
    }
    
}, {timestamps: true});

export default mongoose.models.Class || mongoose.model('Class', classSchema);