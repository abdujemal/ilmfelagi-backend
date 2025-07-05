import mongoose from "mongoose";

const ustazModel = mongoose.Schema({
    
    name: {
        type: String,
    }
}, { collection: 'Ustaz' })

const UstazModel = mongoose.model("Ustaz", ustazModel);

export default UstazModel