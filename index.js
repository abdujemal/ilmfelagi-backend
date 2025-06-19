
import express from 'express';
import path from 'path';
// const exphbs = require('express-handlebars');
import bodyparser from 'body-parser';
import routes from './controller/routes.js';
import { uploadCourseThatDoesnotExist, checkCoursesAndUpdate } from './firebase.js';
import {connectToMongo} from './models/db.js'
import CourseModel from './models/course.model.js';

var app = express();

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
// app.set('views', path.join(__dirname, '/views/'));
// app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
// app.set('view engine', 'hbs');
app.use('/api/courses', routes);

app.listen(3000, () => {

    console.log('Express server started at port : 3000');
    connectToMongo().then(()=>{
        console.log("Connected to MongoDB");
        checkCoursesAndUpdate()
        // uploadCourseThatDoesnotExist();
        // saveJson()
        // CourseModel.find().limit(300).then((courses)=>{

        //     console.log("Courses without 'dateTime':", courses);
        // })

        // formatJson()
        // uploadLatestCourses()
    })
});


