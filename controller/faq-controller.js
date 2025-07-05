import FAQModel from "../models/faq.model.js"

export const getFaq = async (req, res) => {
    try {
        const faqs = await FAQModel.find({})
        
        res.status(200).json(faqs);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
}