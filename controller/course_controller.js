const express = require('express');
const courseModel = require('../models/course.model');
var router = express.Router();

router.get('/:dateTime', async (req,res)=>{

    const courses = await courseModel.find({ dateTime: { $gt: req.params.dateTime } });

    res.status(201).json(courses);
});


module.exports = router;