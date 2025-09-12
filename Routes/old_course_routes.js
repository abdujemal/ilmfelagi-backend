import express from 'express';
import { addCourse, getLatestCourses } from '../controller/course_controller';

var router = express.Router();

router.get('/', getLatestCourses);
router.post("/add", addCourse)


export default router;