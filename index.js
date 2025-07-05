
import express from 'express';
import path from 'path';
// const exphbs = require('express-handlebars');
import bodyparser from 'body-parser';
import courseRoutes from './Routes/course_routes.js';
import categoryRoutes from "./Routes/category_routes.js";
import ustazRoutes  from "./Routes/ustaz_routes.js";
import faqRouter from "./Routes/faq_routes.js";
// import { uploadCourseThatDoesnotExist, checkCoursesAndUpdate } from './firebase.js';
import {connectToMongo} from './models/db.js'
import cors from 'cors';

var app = express();

const port = process.env.PORT || 3000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://ilmfelagi.com",
  "https://www.ilmfelagi.com"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed from origin: " + origin));
    }
  },
  credentials: true,
}));

// ✅ This handles OPTIONS preflight requests
app.options("*", cors());

// app.use(bodyparser.urlencoded({
//     extended: true
// }));
app.use(express.json());
// app.set('views', path.join(__dirname, '/views/'));
// app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
// app.set('view engine', 'hbs');
app.use('/api/v1/courses', courseRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/ustazs", ustazRoutes)
app.use("/api/v1/faq", faqRouter)

app.listen(port, () => {

    console.log(`Express server started at port : ${port}`);
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


