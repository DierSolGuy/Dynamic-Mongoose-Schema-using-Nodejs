const mongoose = require('mongoose')

const EnquirySchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
        //required: [true, "Contact Number is required"],
        //unique: true 
    }
    
}, {strict: false}, { timestamps: true });

const EnquiryModel = mongoose.model("form",EnquirySchema);

module.exports = EnquiryModel;
