const express = require('express');
const mongoose = require('mongoose');
const courseRouter = require('./courseRouter'); 

const app = express();

app.use(express.json());

const uri = "mongodb+srv://ahmedmuhammeed331_db_user:7br92DdGeLPLTnK9@amin.9ob1rht.mongodb.net/lms_project?appName=amin";

mongoose.connect(uri)
  .then(() => console.log("Connected to MongoDB Atlas!"))
  .catch(err => console.error("Error connecting to MongoDB:", err));

app.use('/courses', courseRouter);

app.listen(3000, () => {
  console.log("Server is running. Test it at http://localhost:3000/courses");
});