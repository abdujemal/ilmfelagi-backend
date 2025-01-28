// import { collection, getDocs, getFirestore, orderBy, query, where, getCountFromServer } from "firebase/firestore"
// import { app } from "./firebase-config.js"
// import CourseModel from "./models/course.model.js";
// import fs from "fs";
// import { log } from "console";

// const db = getFirestore(app)

// export const uploadLatestCourses = async ()=>{
    
//     const singleCourse = await CourseModel.find().sort({dateTime: -1}).limit(1);
//     const qu = query(collection(db, "Courses"),where("dateTime",">", singleCourse[0].dateTime), orderBy("dateTime", 'asc'))
//     // console.log({singleCourse});
//     const snapshot = await getCountFromServer(qu)
//     console.log("singleCourse", `${singleCourse[0].title} በ ${singleCourse[0].ustaz}`);
    
//     console.log(`Number of documents: ${snapshot.data().count}`);
//     const courses = await getDocs(qu);
//     // console.log("docs",courses.docs.length)
//     courses.docs.forEach(e => {
//         try {
//             console.log(e.data().title);
            
//             // Create a new course instance
//             const newCourse = new CourseModel(
//                 e.data()
               
//             );
    
//             // Save the document to the database
//             newCourse.save().then((d)=>{
//                 console.log(newCourse.title, "is uploaded.");
//             })
           
            
            
//         } catch (error) {
//             console.error("Error uploading course: ", error);
//         }
//     });
//     // console.log("len", courses.docs.length);
    
   
// }

// export const uploadFromJson = async ()=>{
//     const fileName = `data.json`;
//     const data = fs.readFileSync(fileName, 'utf-8');
//     const jsonData = JSON.parse(data);

//     // jsonData.docs.forEach(e => {
//     //     try {
//     //         console.log(e.data().title);
            
//     //         // Create a new course instance
//     //         const newCourse = new CourseModel(
//     //             e.data()
//     //             // {
//     //             //     courseId: "C001",
//     //             //     author: "John Doe",
//     //             //     category: "Technology",
//     //             //     courseIds: "T001",
//     //             //     noOfRecord: 12,
//     //             //     pdfId: "PDF123",
//     //             //     title: "Introduction to AI",
//     //             //     ustaz: "Jane Smith",
//     //             //     image: "https://example.com/course-image.jpg",
//     //             //     totalDuration: 120,
//     //             //     audioSizes: "50MB",
//     //             //     isCompleted: 0,
//     //             //     dateTime: new Date().toISOString(),
//     //             //     isDeleted: false,
//     //             //     isBeginner: true,
//     //             // }
//     //         );
    
//     //         // Save the document to the database
            
//     //         newCourse.save().then((d)=>{
//     //             console.log(newCourse.title, "is uploaded.");
//     //         })
           
            
            
//     //     } catch (error) {
//     //         console.error("Error uploading course: ", error);
//     //     }
//     // });
//     console.log("len", jsonData.length);
    

// }

// export const saveJson = async ()=>{
    
//     const qu = query(collection(db, "Courses"))
//     // console.log({singleCourse});
//     const courses = await getDocs(qu)

//     let data = []
//     courses.docs.forEach((e)=>{

//         data.push(e.data())
//     })

//     fs.writeFileSync('data.json', JSON.stringify(data, null, 2)); // Save with 2-space indentation

// }

// export const formatJson = async ()=>{
//     const fileName = `tefsir.json`;
//     const data = fs.readFileSync(fileName, 'utf-8');
//     const jsonData = JSON.parse(data);

//     jsonData.sort((a, b) => {
//         if (a.title < b.title) return -1; // a comes before b
//         // if (a.name > b.name) return 1;  // a comes after b
//         return 0;  // a and b are equal
//       });

//     console.log(jsonData.length);
    

//     // let modifiedJson = []
//     // let messedUpJson = []

//     // jsonData.forEach((e)=>{
//     //     if(!e["title"].includes("እስከ")){
//     //         modifiedJson.push(e)
//     //     }else{
//     //         messedUpJson.push(e)
//     //     }
//     // })

//     // messedUpJson.forEach((d)=>{
//     //     d["courseIds"].split(",").forEach((e)=>{
//     //         modifiedJson.push({...d,courseIds: e})
//     //     })
//     // })

//     fs.writeFileSync('tefsir-modified.json', JSON.stringify(jsonData, null, 2));

// }

// export const uploadAllCourses = async ()=>{
    
//     // const singleCourse = await CourseModel.find().sort({dateTime: -1}).limit(1);
//     // console.log({singleCourse});
    
//     const courses = await getDocs(query(collection(db, "Courses"), orderBy("dateTime", 'desc')))
//     console.log("docs", courses.docs.length)

//     const data = [];
//     courses.docs.forEach((doc) => {
//         data.push(doc.data()); // Include document ID with the data
//     });
//     const fileName = `data.json`;
//     fs.writeFileSync(fileName, JSON.stringify(data, null, 2)); // Save with 2-space indentation

//     courses.docs.forEach(e => {
//         try {
//             console.log(e.data().title);
            
//             // Create a new course instance
//             const newCourse = new CourseModel(
//                 e.data()
//                 // {
//                 //     courseId: "C001",
//                 //     author: "John Doe",
//                 //     category: "Technology",
//                 //     courseIds: "T001",
//                 //     noOfRecord: 12,
//                 //     pdfId: "PDF123",
//                 //     title: "Introduction to AI",
//                 //     ustaz: "Jane Smith",
//                 //     image: "https://example.com/course-image.jpg",
//                 //     totalDuration: 120,
//                 //     audioSizes: "50MB",
//                 //     isCompleted: 0,
//                 //     dateTime: new Date().toISOString(),
//                 //     isDeleted: false,
//                 //     isBeginner: true,
//                 // }
//             );
    
//             // Save the document to the database
            
//             newCourse.save().then((d)=>{
//                 console.log(newCourse.title, "is uploaded.");
//             })
           
            
            
//         } catch (error) {
//             console.error("Error uploading course: ", error);
//         }
//     });
//     console.log("len", courses.docs.length);
    
   
// }