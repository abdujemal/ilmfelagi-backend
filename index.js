
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
  'http://localhost:5173',
  'https://ilm-felagi.netlify.app',
  'https://ilmfelagi.com',
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));

app.options('*', cors());

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


