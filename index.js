
import express from 'express';
import path from 'path';
// const exphbs = require('express-handlebars');
import bodyparser from 'body-parser';
import courseRoutes from './Routes/course_routes.js';
import categoryRoutes from "./Routes/category_routes.js";
import { uploadCourseThatDoesnotExist, checkCoursesAndUpdate } from './firebase.js';
import {connectToMongo} from './models/db.js'
import CourseModel from './models/course.model.js';
import cors from 'cors';

var app = express();

const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // if you're using cookies or auth headers
}));

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
// app.set('views', path.join(__dirname, '/views/'));
// app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
// app.set('view engine', 'hbs');
app.use('/api/v1/courses', courseRoutes);
app.use("/api/v1/categories", categoryRoutes);

app.listen(port, () => {

    console.log('Express server started at port : 3000');
    connectToMongo().then(()=>{
        console.log("Connected to MongoDB");
        // checkCoursesAndUpdate()
        // uploadCourseThatDoesnotExist();
        // saveJson()
        // CourseModel.find().limit(300).then((courses)=>{

        //     console.log("Courses without 'dateTime':", courses);
        // })

        // formatJson()
        // uploadLatestCourses()
    })
});


