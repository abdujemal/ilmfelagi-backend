import mongoose from "mongoose";

const categoryModel = mongoose.Schema({
    
    name: {
        type: String,
    }
}, { collection: 'Category' })

const CategoryModel = mongoose.model("Category", categoryModel);

export default CategoryModel