const mongoose = require('mongoose');


const jobPostSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    companyName: { type: String, required: true },
    logoURL: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    salary: {
        type: String,
        required: true,
    },
    jobtype: {
        type: String,
        enum: ['Full-time', 'Part-time'],
        required: true,
    },
    remote: { type: String, enum: ['Remote', 'Office'], required: true },
    location: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    about: {
        type: String,
        required: true,  
    },
    skillsRequired: {
        type: [String], 
        required: true
    },
    recruiterName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});



module.exports = mongoose.model('JLists', jobPostSchema);