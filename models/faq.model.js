import mongoose from "mongoose";

const fAQModel = mongoose.Schema({
    
    question: {
        type: String,
    },
    answer: {
        type: String,
    }
}, { collection: 'FAQ' })

const FAQModel = mongoose.model("FAQ", fAQModel);

export default FAQModel