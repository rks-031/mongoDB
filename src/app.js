const express = require("express");
require("./db/conn");
const Student = require("./models/students.js");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
// app.get("/", (req, res) => {
//   res.send("hello from the other side by rajnish.");
// });

// create a new student

// app.post("/students", (req, res) => {
//   console.log(req.body);
//   const user = new Student(req.body);
//   user
//     .save()
//     .then(() => {
//       res.status(201).send(user);
//     })
//     .catch((err) => {
//       res.status(400).send(err);
//     });
//   // res.send("hello from the other side.");
// });

app.post("/students", async (req, res) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

//read the data of registers students
app.get("/students", async (req, res) => {
  try {
    const studentData = await Student.find();
    res.send(studentData);
  } catch (err) {
    res.send(err);
  }
});

// app.get("/students/:id", async (req, res) => {
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

app.get("/students/:name", async (req, res) => {
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

app.delete("/students/:id", async (req, res) => {
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

app.listen(port, () => {
  console.log(`connection is set up at port no ${port}`);
});
