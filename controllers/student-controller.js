const teacher = require("../models/Teacher");
const school = require("../models/School");
const student = require("../models/Student");
const jwt = require("jsonwebtoken");
const { server_error, ok } = require("../helpers/responses");

module.exports = {
  getAllStudentsbySchoolID: async (req, res) => {
    try {
      const students = await student
        .find({ school: req.query.id })
        .populate({ path: "subjects", select: "name" })
        .populate({ path: "parent", select: "name email" })
        .select("-password");

      return res.status(200).json({ data: students });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Server error", error: error.message });
    }
  },
  createStudent: async (req, res) => {
    try {
      const exists = await student.findOne({ email: req.body.email });
      if (exists) {
        return res.status(403).json({ message: "Already exists" });
      }

      const newStudent = new student({
        name: req.body.name,
        email: req.body.email,
        birthNumber: req.body.birthNumber,
        password: req.body.password,
        gradeLevel: req.body.gradeLevel,
        school: req.body.school,
      });

      await newStudent.save();
      return res.status(201).json({ message: "Student successfully created" });
    } catch (error) {
      console.error("Error creating school:", error);
      return res.status(500).json({ error: "Internal server Error" });
    }
  },

  loginStudent: async (req, res) => {
    const exists = await student.findOne({ email: req.body.email });

    if (!exists) {
      return res.status(403).json({ message: "User doesnt exist" });
    }

    const validPassword = exists.password == req.body.password;
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    exists.password = undefined;
    const token = jwt.sign(
      { exists },
      "pl23kl123lamsdfejkjrk3@3lakslk0dl3erksa;"
    );

    return res.status(200).json({ message: "Login successful", data: token });
  },

  // getStudentbyID: async (req, res) => {
  //   const getStudentbyID = await student
  //     .findById(req.params.id)
  //     .select("-password");
  //   return res.status(200).json({ data: getStudentbyID });
  // },

  deleteStudent: async (req, res) => {
    const deleteStudent = await student.findByIdAndDelete(req.params.id);
    if (!deleteStudent) {
      return res.status(404).json({ message: "Account doesn't exist" });
    }
    return res.status(200).json({ message: "Account successfully deleted" });
  },

  getStudentbyBN: async (req, res) => {
    const getStudentbyBN = await student
      .findOne({ birthNumber: req.params.birthNumber })
      .select("-password");

    return res.status(200).json({ data: getStudentbyBN });
  },

  editStudent: async (req, res) => {
    try {
      const findStudentbyID = await student.findById(req.params.id);

      const data = {
        name: req.body.name || findStudentbyID.name,
        email: req.body.email || findStudentbyID.email,
        birthNumber: req.body.birthNumber || findStudentbyID.birthNumber,
        password: req.body.password || findStudentbyID.password,
        gradeLevel: req.body.gradeLevel || findStudentbyID.gradeLevel,
      };

      await student.findByIdAndUpdate(findStudentbyID._id, data);
      return res.status(200).json({ message: "Changes successfully edited." });
    } catch (error) {
      return server_error(res);
    }
  },
};
