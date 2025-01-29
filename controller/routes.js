import express from 'express';
import { getLatestCourses } from './course_controller';
var router = express.Router();

router.get('/', getLatestCourses);

export default router;