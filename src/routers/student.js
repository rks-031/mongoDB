const express = require("express");
//create a new router
const router = new express.Router();
const Student = require("../models/students");

//creating a new registration
router.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

//read the data of registers students
router.get("/students", async (req, res) => {
  try {
    const studentData = await Student.find();
    res.send(studentData);
  } catch (err) {
    res.send(err);
  }
});

// router.get("/students/:id", async (req, res) => {
//   try {
//     const _id = req.params.id;
//     const studentData = await Student.findById({ _id });
//     if (!studentData) {
//       return res.status(404).send();
//     } else {
//       res.send(studentData);
//     }
//   } catch (err) {
//     res.send(err);
//   }
// });

router.get("/students/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const studentData = await Student.findOne({ name }); // Find a student by name
    if (!studentData) {
      return res.status(404).send();
    } else {
      res.send(studentData);
    }
  } catch (err) {
    res.send(err);
  }
});

//delete the students by their id

router.delete("/students/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteStudent = await Student.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(404).send();
    } else {
      res.send(deleteStudent);
    }
  } catch (e) {
    res.status(500).set(e);
  }
});

//update the students by their id

router.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const updateStudent = await Student.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(updateStudent);
  } catch (e) {
    res.status(500).send(e);
  }
});

//by name
router.patch("/students/:name", async (req, res) => {
  try {
    const name = req.params.name;
    const updateStudent = await Student.findOneAndUpdate({ name }, req.body, {
      new: true,
      runValidators: true,
    });
    res.send(updateStudent);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
