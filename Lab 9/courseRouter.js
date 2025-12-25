const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  instructorName: String,
  price: Number,
  category: String, 
  enrolledStudents: { type: Number, default: 0 }
});


const Course = mongoose.model('Course', courseSchema);


router.post('/', async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    const savedCourse = await newCourse.save();
    res.json(savedCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } // Return the updated document
    );
    res.json(updatedCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;