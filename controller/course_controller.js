import express from 'express';
import CourseModel from '../models/course.model.js';

export const getLatestCourses =  async(req,res)=>{

    const courses = await CourseModel.find({ dateTime: { $gt: req.query.dateTime } });

    res.status(201).json(courses);
};

export const addCourse = async (req, res) => {    
    if(!req.body.dateTime && !req.body.courseId){
        res.status(500).json({msg: "no data"})
    }

    const model = await CourseModel.findOne({courseId: req.body.courseId});

    if(model){
        CourseModel.findOneAndUpdate({courseId: req.body.courseId}, req.body).then(()=>{
        res.status(200).json({msg: `Course updated`})
        }).catch((e)=>{
        res.status(500).json({msg: e})
        })      
        
    }else{
        const courseModel = new CourseModel(
            req.body,
        );
    
        courseModel.save().then(()=>{
            res.status(200).json({msg: "Successfully created"}); 
        }).catch((err)=>{
            res.status(500).json({msg: err});
        })
    }  
};

export const deleteCourse = async (req, res) => {
    if(!req.body.courseId){
        res.status(500).json({msg: "no data"})
    }

    CourseModel.updateOne({ courseId: req.body.courseId },
        { $set: { isDeleted: true } }, // Use $set to add the new field with its value
    { new: true, merge: true } // Options to return the updated document and merge the new field with existing fields
        ).then(() => { 
            res.status(201).json({msg: "Successfully Deleted"}); 
        }).catch((err)=>{
            res.status(500).json({msg: err});
        });
     
};

export const searchCourses = async (req, res) => {
    if(!req.query.q){
        res.status(400).json({msg: "no date found"})
      }
    
    
    CourseModel.find({
            title: { $regex: req.query.q, $options: 'i' }
            }).then((courses)=>{
        res.status(200).json(courses);
    }).catch((e)=>{
        res.status(500).json({err: e})
    })
    
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
    
    CourseModel.updateOne({ courseId: req.body.courseId }, // Query condition to match the document
    { $set: req.body }).then(() => {
        
        res.status(201).json({msg: "Successfully updated"}); 
        
    }).catch((err)=>{
        res.status(500).json({msg: err});
    });
};

export const getAllCourses = async (req, res) => {
    try {
        // const courses = await courseModel.find();
        res.status(200).json("We never did that");
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};