import UstazModel from "../models/ustaz.model.js";

export const getUstazs = async (req, res) => {
     try {
        const ustazs = await UstazModel.find({})
        
        res.status(200).json(ustazs);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
}