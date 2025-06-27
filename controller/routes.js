import express from 'express';
import { getLatestCourses, searchCourses } from './course_controller.js';
import { addCourse, deleteCourse, updateCourse, getAllCourses, getNamesOfCourses, getCourses } from './course_controller.js';
var router = express.Router();

router.get('/', getLatestCourses);
router.post('/add', addCourse);
router.post('/delete', deleteCourse);
router.post('/update', updateCourse);
router.get('/getAll', getAllCourses);
router.get('/courses', getCourses);
router.get('/search', searchCourses);
router.get('/getNames', getNamesOfCourses);



export default router;