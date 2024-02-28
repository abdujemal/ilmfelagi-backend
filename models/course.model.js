const mongoose = require('mongoose')

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
        type: String
    },
}, { collection: 'Courses' })

module.exports = mongoose.model("Courses", courseModel);