
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/studentdb")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const StudentSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    age: { type: Number, required: true }
});

const Student = mongoose.model("Student", StudentSchema);


// GET: Get all students
app.get("/students", async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// POST: Add a student
app.post("/students", async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// PUT: Update a student
app.put("/students/:id", async (req, res) => {
    try {
        const student = await Student.findOneAndUpdate(
            { id: Number(req.params.id) },
            {
                name: req.body.name,
                age: req.body.age
            },
            { new: true, runValidators: true }
        );

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(student);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// DELETE: Delete a student
app.delete("/students/:id", async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({
            id: Number(req.params.id)
        });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json({ message: "Student deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(5210, () => {
    console.log("Server running on port 5210");
});
