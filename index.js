
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
import { getLatestCourses } from './controller/course_controller.js';
import { uploadAllCourses } from './firebase.js';
import CourseModel from './models/course.model.js';
import { convertToMp3AndReplace, initB2, updateAudioOfCourses } from './utils.js';
import fs from "fs";

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
app.use('/api/courses', getLatestCourses);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/ustazs", ustazRoutes)
app.use("/api/v1/faq", faqRouter)

app.get('/api/course/:id', async (req, res) => {
  const [course] = await CourseModel.find({courseId: req.params.id}); // Get course info from API
  res.send(`
    <html>
      <head>
        <meta property="og:title" content="${course.title}" />
        <meta property="og:description" content="${course.ustaz}" />
        <meta property="og:image" content="${course.image}" />
        <meta property="og:url" content="https://www.ilmfelagi.com/course/${course.id}" />
        <meta name="twitter:card" content="summary_large_image" />
        <!-- ... -->
      </head>
      <body>
        <script>
          window.location.href = "ilmfelagi://details/${course.courseId}";
          const fallback = "https://ilmfelagi.com/details/${course.courseId}";
          
          setTimeout(() => {
            window.location.href = fallback;
          }, 1000);
        </script>
      </body>
    </html>
  `);
});

app.listen(port, () => {

    console.log(`Express server started at port : ${port}`);
    connectToMongo().then(()=>{
      // uploadAllCourses()
        // updateAudioOfCourses()
        // console.log("Connected to MongoDB");
        // initB2().then(()=>{
        //   console.log("B2 Initialized");
        //   convertToMp3AndReplace("https://b2.ilmfelagi.com/file/ilm-Felagi2/00testest/%D9%85%D8%B3%D9%84%D9%85_%D9%83%D8%AA%D8%A7%D8%A8_%D8%A7%D9%84%D8%A5%D9%8A%D9%85%D8%A7%D9%86_%D9%A1%D9%A3A.amr")
        // })        
        // uploadAllCourses()
        // checkCoursesAndUpdate()
        // uploadCourseThatDoesnotExist();
        // saveJson()
        // CourseModel.find({}).then((courses)=>{
          // let courses = JSON.parse(fs.readFileSync("names.json", "utf-8"));

          //   console.log("Courses without 'dateTime':", courses.length);
            // let names = []
            // for(const course of courses){
            //   if(names.find(n => n.title === course.title && n.category === course.category)){
            //     continue
            //   }
            //   names.push({title: course.title, category: course.category})
            // }
            // fs.writeFileSync("names.json", JSON.stringify(names, null, 2));
          // })
        // let names = JSON.parse(fs.readFileSync("names.json", "utf-8"));
        // names.sort()
        // formatJson()
        // uploadLatestCourses()
    })
});

