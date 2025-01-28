import express from 'express';
import courseModel from '../models/course.model.js';
var router = express.Router();

router.get('/', async (req,res)=>{

    const courses = await courseModel.find({ dateTime: { $gt: req.query.dateTime } });

    res.status(201).json(courses);
});

export default router;