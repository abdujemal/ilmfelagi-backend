import { app } from "./firebase-config.js"
import CourseModel from "./models/course.model.js";
import UstazModel from "./models/ustaz.model.js";
import CategoryModel from "./models/category.model.js";
import fs from "fs";
import { getFirestore, collection, getDocs, query, where, orderBy, getCountFromServer, limitToLast, limit } from "firebase/firestore";

const db = getFirestore(app)

export const checkCoursesAndUpdate = async ()=>{
    let courses = []
    fs.readFile('courses.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    courses = JSON.parse(data);
    
    console.log(courses.length)
    
    });

    const mongoCourses = await CourseModel.find({})
    console.log("mongoCourses", mongoCourses.length);

    // wait for 5 seconds
    await new Promise(resolve => setTimeout(resolve, 5000));
    for(var i in mongoCourses){
        const e = mongoCourses[i]
        
        //check if the courses already exists in MongoDBCourse
        if(courses.some(course => course.courseId === e.courseId)){
            console.log("Course already exists in SQL, skipping upload.", e.title);            
        }else{
            console.log("Course does not exist in SQL, updating...");
            // Save the document to the database
            try{
                await CourseModel.findOneAndUpdate({courseId: e.courseId}, 
                    { 
                        dateTime: new Date().toISOString().replace("T", " ").replace("Z", ""),
                    }
                );
                console.log(e.title, "is uploaded.");             
            }catch(e){
                console.log("Error updating course: ", e);                        
            }
        }
    }
}


export const uploadCourseThatDoesnotExist = async ()=>{
    const qu = query(collection(db, "Courses"))
    // console.log({singleCourse});
    const courses = await getDocs(qu)
    console.log("docs", courses.docs.length)

    for(var i in courses.docs){
        const e = courses.docs[i]
        // console.log(e.data().title);
        // print DateTime.now()
        // console.log(new Date().toISOString());
        
        // Create a new course instance
        const newCourse = new CourseModel({
            ... e.data(),
            dateTime: new Date().toISOString().replace("T", " ").replace("Z", ""),
        }
           
            
        );
        //check if the course already exists in MongoDB
        const course = await CourseModel.find({courseIds: e.data().courseIds})
        if(course.length === 0){
            console.log("Course does not exist in MongoDB, uploading...");
            // Save the document to the database
            try{
                await newCourse.save();
                console.log(newCourse.title, "is uploaded.");             
            }catch(e){
                console.log("Error uploading course: ", e);                        
            }
        }else{
            console.log("Course already exists in MongoDB, skipping upload.", newCourse.title);
        }
        
    };
}

export const uploadLatestCourses = async ()=>{
    
    const singleCourse = await CourseModel.find().sort({dateTime: -1}).limit(1);
    const qu = query(collection(db, "Courses"),where("dateTime",">", singleCourse[0].dateTime), orderBy("dateTime", 'asc'))
    // console.log({singleCourse});
    const snapshot = await getCountFromServer(qu)
    console.log("singleCourse", `${singleCourse[0].title} በ ${singleCourse[0].ustaz}`);
    
    console.log(`Number of documents: ${snapshot.data().count}`);
    const courses = await getDocs(qu);
    // console.log("docs",courses.docs.length)
    courses.docs.forEach(e => {
        try {
            console.log(e.data().title);
            
            // Create a new course instance
            const newCourse = new CourseModel(
                e.data()
               
            );
    
            // Save the document to the database
            newCourse.save().then((d)=>{
                console.log(newCourse.title, "is uploaded.");
            })
           
            
            
        } catch (error) {
            console.error("Error uploading course: ", error);
        }
    });
    // console.log("len", courses.docs.length);
    
   
}

export const uploadFromJson = async ()=>{
    const fileName = `data.json`;
    const data = fs.readFileSync(fileName, 'utf-8');
    const jsonData = JSON.parse(data);

    // jsonData.docs.forEach(e => {
    //     try {
    //         console.log(e.data().title);
            
    //         // Create a new course instance
    //         const newCourse = new CourseModel(
    //             e.data()
    //             // {
    //             //     courseId: "C001",
    //             //     author: "John Doe",
    //             //     category: "Technology",
    //             //     courseIds: "T001",
    //             //     noOfRecord: 12,
    //             //     pdfId: "PDF123",
    //             //     title: "Introduction to AI",
    //             //     ustaz: "Jane Smith",
    //             //     image: "https://example.com/course-image.jpg",
    //             //     totalDuration: 120,
    //             //     audioSizes: "50MB",
    //             //     isCompleted: 0,
    //             //     dateTime: new Date().toISOString(),
    //             //     isDeleted: false,
    //             //     isBeginner: true,
    //             // }
    //         );
    
    //         // Save the document to the database
            
    //         newCourse.save().then((d)=>{
    //             console.log(newCourse.title, "is uploaded.");
    //         })
           
            
            
    //     } catch (error) {
    //         console.error("Error uploading course: ", error);
    //     }
    // });
    console.log("len", jsonData.length);
    

}

export const saveJson = async ()=>{
    
    const qu = query(collection(db, "Courses"))
    // console.log({singleCourse});
    const courses = await getDocs(qu)

    let data = []
    courses.docs.forEach((e)=>{

        data.push(e.data())
    })

    fs.writeFileSync('data.json', JSON.stringify(data, null, 2)); // Save with 2-space indentation

}

export const formatJson = async ()=>{
    const fileName = `tefsir.json`;
    const data = fs.readFileSync(fileName, 'utf-8');
    const jsonData = JSON.parse(data);

    jsonData.sort((a, b) => {
        if (a.title < b.title) return -1; // a comes before b
        // if (a.name > b.name) return 1;  // a comes after b
        return 0;  // a and b are equal
      });

    console.log(jsonData.length);
    

    // let modifiedJson = []
    // let messedUpJson = []

    // jsonData.forEach((e)=>{
    //     if(!e["title"].includes("እስከ")){
    //         modifiedJson.push(e)
    //     }else{
    //         messedUpJson.push(e)
    //     }
    // })

    // messedUpJson.forEach((d)=>{
    //     d["courseIds"].split(",").forEach((e)=>{
    //         modifiedJson.push({...d,courseIds: e})
    //     })
    // })

    fs.writeFileSync('tefsir-modified.json', JSON.stringify(jsonData, null, 2));

}

export const uploadAllCourses = async ()=>{
    let ustazs = []
    let categories = []
    
    const courses = await getDocs(
        query(
            collection(db, "Courses"), 
            orderBy("dateTime", 'desc'),
            limit(23)
        )
    )
    console.log("docs", courses.docs.length)

    const data = [];
    courses.docs.forEach((doc) => {
        data.push(doc.data()); // Include document ID with the data
    });
    const fileName = `data.json`;
    fs.writeFileSync(fileName, JSON.stringify(data, null, 2)); // Save with 2-space indentation

    courses.docs.forEach(async e => {
        try {
            console.log(e.data().title, e.data().ustaz);

            // if(!ustazs.includes(e.data().ustaz)){
            //     ustazs.push(e.data().ustaz)
            //     const newUstaz = new UstazModel(
            //         {name: e.data().ustaz}
            //     );
                
            //     await newUstaz.save();
            // }

            // if(!categories.includes(e.data().category)){
            //     categories.push(e.data().category)
            //      const newCategory = new CategoryModel(
            //         {name: e.data().category}
            //     );
                
            //     await newCategory.save();
            // }
            
            const newCourse = new CourseModel(
                e.data()
            );
            
            await newCourse.save().then((d)=>{
                console.log(newCourse.title, "is uploaded.");
            })
        } catch (error) {
            console.error("Error uploading course: ", error);
        }
    });
    console.log("len", courses.docs.length);
}