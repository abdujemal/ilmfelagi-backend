import express from 'express';
import { getCourseById, getLatestCourses, searchCourses, getCourseByCategory, getCourseByUstaz, getCourseByTitle, getCourseByNumber} from '../controller/course_controller.js';
import { addCourse, deleteCourse, updateCourse, getAllCourses, getNamesOfCourses, getCourses } from '../controller/course_controller.js';
var router = express.Router();

router.get('/', getCourses);
router.get('/latest', getLatestCourses);
router.post('/add', addCourse);
router.get('/single/:id', getCourseById); // Assuming this is to get a
router.post('/delete', deleteCourse);
router.post('/update', updateCourse);
router.get('/getAll', getAllCourses);
router.get('/search', searchCourses);
router.get("/category/:category", getCourseByCategory)
router.get("/ustaz/:ustaz", getCourseByUstaz)
router.get("/title/:title", getCourseByTitle)
router.get('/getNames', getNamesOfCourses);

router.get('/byNumber/:n', getCourseByNumber);



export default router;