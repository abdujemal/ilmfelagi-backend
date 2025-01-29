import express from 'express';
import { getLatestCourses, searchCourses } from './course_controller.js';
import { addCourse, deleteCourse, updateCourse, getAllCourses } from './course_controller.js';
var router = express.Router();

router.get('/', getLatestCourses);
router.post('/add', addCourse);
router.post('/delete', deleteCourse);
router.post('/update', updateCourse);
router.get('/getAll', getAllCourses);
router.get('/search', searchCourses);


export default router;