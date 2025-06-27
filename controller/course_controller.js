import CourseModel from '../models/course.model.js';

export const getCourses = async (req, res) => {
    try {
        const { page = 1, limit = 20 } = req.query;
        const skip = (page - 1) * limit;

        const courses = await CourseModel.find({ isDeleted: false })
            .skip(skip)
            .limit(Number(limit))
            .sort({ dateTime: -1 }) // Sort by dateTime in descending order
            .select('-__v'); // Exclude the __v field
        res.status(200).json(courses);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};

export const getLatestCourses =  async(req,res)=>{
    try{

        const courses = await CourseModel.find({ dateTime: { $gt: req.query.dateTime } });
    
        res.status(201).json(courses);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};
export const getNamesOfCourses =  async(req,res)=>{
    try{

        const courses = await CourseModel.find({}, // Filter (empty = get all documents)
        {
            projection: { name: 1, ustaz: 1 } // Include only name, ustaz, and _id
        },);
    
        res.status(201).json(courses);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};
export const getCourseById = async (req, res) => {
    try {
        const course = await CourseModel.findById(req.params.id);
        if (!course) {
            return res.status(404).json({ msg: "Course not found" });
        }
        res.status(200).json(course);
    } catch (e) {
        res.status(500).json({ msg: e.message });
    }
};
export const addCourse = async (req, res) => {    
    if(!req.body.dateTime && !req.body.courseId){
        res.status(500).json({msg: "no data"})
    }

    try {
        const model = await CourseModel.findOne({courseId: req.body.courseId});

        if(model){
            await CourseModel.findOneAndUpdate({courseId: req.body.courseId}, req.body);
            res.status(200).json({msg: `Course updated`});
        } else {
            const courseModel = new CourseModel(req.body);
            await courseModel.save();
            res.status(200).json({msg: "Successfully created"}); 
        }
    } catch (e) {
        res.status(500).json({msg: e.message});
    }
};

export const deleteCourse = async (req, res) => {
    if(!req.body.courseId){
        res.status(500).json({msg: "no data"})
    }

    try {
        await CourseModel.updateOne({ courseId: req.body.courseId },
            { $set: { isDeleted: true } }, 
            { new: true, merge: true }
        );
        res.status(201).json({msg: "Successfully Deleted"}); 
    } catch (e) {
        res.status(500).json({msg: e.message});
    }
};

export const searchCourses = async (req, res) => {
    if(!req.query.q){
        res.status(400).json({msg: "no date found"})
    }

    try {
        const courses = await CourseModel.find({
            title: { $regex: req.query.q, $options: 'i' }
        });
        res.status(200).json(courses);
    } catch (e) {
        res.status(500).json({err: e.message});
    }
};

export const updateCourse = async (req, res) => {
    if(req.method !== 'POST'){
        res.status(400).json({msg: "access denied!"})
    }

    if(!req.body.dateTime || !req.body.courseId){
        res.status(500).json({msg: "no data"})
    }
    if(!req.query.userName || !req.query.password){
        res.status(400).json({msg: "access denied!"})
    }

    try {
        await CourseModel.updateOne({ courseId: req.body.courseId }, { $set: req.body });
        res.status(201).json({msg: "Successfully updated"}); 
    } catch (e) {
        res.status(500).json({msg: e.message});
    }
};
// export const addCourse = async (req, res) => {    
//     if(!req.body.dateTime && !req.body.courseId){
//         res.status(500).json({msg: "no data"})
//     }

//     const model = await CourseModel.findOne({courseId: req.body.courseId});

//     if(model){
//         CourseModel.findOneAndUpdate({courseId: req.body.courseId}, req.body).then(()=>{
//         res.status(200).json({msg: `Course updated`})
//         }).catch((e)=>{
//         res.status(500).json({msg: e})
//         })      
        
//     }else{
//         const courseModel = new CourseModel(
//             req.body,
//         );
    
//         courseModel.save().then(()=>{
//             res.status(200).json({msg: "Successfully created"}); 
//         }).catch((err)=>{
//             res.status(500).json({msg: err});
//         })
//     }  
// };

// export const deleteCourse = async (req, res) => {
//     if(!req.body.courseId){
//         res.status(500).json({msg: "no data"})
//     }

//     CourseModel.updateOne({ courseId: req.body.courseId },
//         { $set: { isDeleted: true } }, // Use $set to add the new field with its value
//     { new: true, merge: true } // Options to return the updated document and merge the new field with existing fields
//         ).then(() => { 
//             res.status(201).json({msg: "Successfully Deleted"}); 
//         }).catch((err)=>{
//             res.status(500).json({msg: err});
//         });
     
// };

// export const searchCourses = async (req, res) => {
//     if(!req.query.q){
//         res.status(400).json({msg: "no date found"})
//       }
    
    
//     CourseModel.find({
//             title: { $regex: req.query.q, $options: 'i' }
//             }).then((courses)=>{
//         res.status(200).json(courses);
//     }).catch((e)=>{
//         res.status(500).json({err: e})
//     })
    
// };

// export const updateCourse = async (req, res) => {
//     if(req.method !== 'POST'){
//         res.status(400).json({msg: "access denied!"})
//     }
    
//     if(!req.body.dateTime || !req.body.courseId){
//         res.status(500).json({msg: "no data"})
//     }
//     if(!req.query.userName || !req.query.password){
//         res.status(400).json({msg: "access denied!"})
//     }
    
//     CourseModel.updateOne({ courseId: req.body.courseId }, // Query condition to match the document
//     { $set: req.body }).then(() => {
        
//         res.status(201).json({msg: "Successfully updated"}); 
        
//     }).catch((err)=>{
//         res.status(500).json({msg: err});
//     });
// };

export const getAllCourses = async (req, res) => {
    try {
        // const courses = await courseModel.find();
        res.status(200).json("We never did that");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};