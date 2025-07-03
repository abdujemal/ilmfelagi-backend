import CategoryModel from "../models/category.model.js"

export const getCategories = async (req, res) =>{
    try {
        const categories = await CategoryModel.find({})
        
        res.status(200).json(categories);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
} 