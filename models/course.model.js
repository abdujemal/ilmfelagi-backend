import mongoose from "mongoose";

const courseModel = mongoose.Schema({
    courseId: {
        type: String
    },
    author: {
        type: String
    },
    category: {
        type: String
    },
    courseIds: {
        type: String
    },
    noOfRecord: {
        type: Number
    },
    pdfId: {
        type: String
    },
    title: {
        type: String
    },
    ustaz: {
        type: String
    },
    image: {
        type: String
    },
    totalDuration: {
        type: Number
    },
    audioSizes: {
        type: String
    },
    isCompleted: {
        type: Number
    },
    dateTime: {
        type: String,
        index: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
    isBeginner: {
        type: Boolean,
        default: false,
    }
}, { collection: 'Courses' })

const CourseModel = mongoose.model("Courses", courseModel);

export default CourseModel