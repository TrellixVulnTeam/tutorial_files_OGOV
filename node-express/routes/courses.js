const {Router} = require('express')
const Course = require('../models/course')
const router = Router()


router.get('/', async (req, res) => {
    const courses = await Course.find()
        .populate('userId', 'email name')
        .lean()
    res.render('courses', {
        title: 'Courses', 
        isCourses: true,
        courses
    })
})

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/')
    }

    const course = await Course.findById(req.params.id).lean()

    res.render('courses-edit', {
        title: `Edit ${course.title}`,
        course
    })
})

router.post('/edit', async (req, res) => {
    const {id} = req.body
    delete req.body.id
    await Course.findOneAndUpdate(id, req.body).lean()
    res.redirect('/courses')
})

router.post('/remove/:id', async (req, res) => {
    try {
        await Course.deleteOne({_id: req.params.id})
        res.redirect('/courses')
    } catch (e) {
        console.log(e)
    }
})

router.get('/:id', async (req, res) => {
    const course = await Course.findById(req.params.id).lean()
    res.render('course', {
        layout: 'empty',
        title: `Course ${course.title}`,
        course
    })
})

module.exports = router