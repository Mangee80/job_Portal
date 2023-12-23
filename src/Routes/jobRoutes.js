const express = require('express');
const JobPost = require('../Models/jobLists');
const requireAuth = require('../Middlewares/requireAuth');

const router = express.Router();


//Create a job post API
router.post('/job-posts', requireAuth,async (req, res) => {
    const {
        companyName,
        logoURL, position, salary, jobtype,
        remote, location, description,
        about, skills, createdAt
    } = req.body;
    const recruiterName = req.body.name;

    let skillsArray = skills;
    if(typeof skills === 'string') {
        skillsArray = skills.split(',').map(skill => skill.trim());
    }

    try {
        const jobPost =new JobPost({
            companyName,
            logoURL, position, salary, jobtype,
            remote, location, description,
            about, skillsRequired: skillsArray,
            recruiterName
        });
        await jobPost.save();

        return res.json({message: 'Job Post created successfully', name: recruiterName });
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Internal Server Error'});
    }
});




//Edit Job Post API
router.put('/job-posts/:id', requireAuth,async (req, res) => {
    const jobId = req.params.id;
    const { companyName, jobtype, skillsRequired } = req.body;
    const recruiterName = req.body.name;

    try {
        const jobPost = await JobPost.findById(jobId);

        if (!jobPost) {
            return res.status(500).json({message: 'Job Post not found'});
        }


        jobPost.companyName = companyName;
        jobPost.jobtype = jobtype;
        jobPost.skillsRequired = skillsRequired;
        jobPost.recruiterName = recruiterName;

        await jobPost.save();

        return res.json({message: 'Job Post updated successfully' });
    } catch {
        console.log(err);
        return res.status(500).json({message: 'Internal Server Error'});
    }
});



//Get Job Posts with Filters API
router.get('/job-posts', async (req, res) => {
    const { jobtype, skillsRequired } =req.query;

    try {
        let query = {};

        if(jobtype) {
            query.jobtype = jobtype;
        }

        if (skillsRequired) {
            query.skillsRequired = { $in: skillsRequired.split('&') };
        }

        const jobPosts = await JobPost.find(query).sort({ createdAt: -1 });

        return res.json({ jobPosts });
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Internal Server Error'});
    }
});

//Get Job Post Detail API
router.get('/job-posts/:id', requireAuth,async (req, res) => {
    const jobId = req.params.id;

    try {
        const jobPost = await JobPost.findById(jobId);

        if (!jobPost) {
            return res.status(500).json({message: 'Job Post not found'});
        }

        return res.json({ jobPost });
    } catch (err) {
        console.log(err);
        return res.status(500).json({message: 'Internal Server Error'});
    }
});




module.exports = router;




