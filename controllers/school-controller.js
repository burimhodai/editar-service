const { ok, server_error, error_404 } = require("../helpers/responses");
const school = require("../models/School");
const jwt = require("jsonwebtoken");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Parent = require("../models/Parent");
const Subject = require("../models/Subject");

module.exports = {
  schoolOverview: async (req, res) => {
    try {
      console.log(req.params);
      const parentID = await Student.find({ school: req.params.id }).select(
        "parent"
      );

      let parents = [];

      for (const id of parentID) {
        console.log(id);
        parents.push(await Parent.findById(id.parent));
      }

      console.log({ parents: parents.filter(Boolean) });

      const studentsNumber = await Student.countDocuments({
        school: req.params.id,
      });
      const teachersNumber = await Teacher.countDocuments({
        school: req.params.id,
      });
      const parentsNumber = parents.filter(Boolean).length;
      const subjectsNumber = await Subject.countDocuments({
        school: req.params.id,
      });

      console.log({
        studentsNumber,
        teachersNumber,
        parentsNumber,
        subjectsNumber,
      });
      ok(res, "", {
        studentsNumber,
        teachersNumber,
        parentsNumber,
        subjectsNumber,
      });
    } catch (error) {
      server_error(res, error.message);
    }
  },

  loginSchool: async (req, res) => {
    const exists = await school.findOne({ email: req.body.email });

    if (!exists) {
      return res.status(403).json({ message: "User doesn't exist" });
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

  createSchool: async (req, res) => {
    try {
      const exists = await school.findOne({ email: req.body.email });

      if (exists) {
        return res.status(403).json({ message: "Already Exists" });
      }

      const newSchool = new school({
        name: req.body.name,
        location: req.body.location,
        email: req.body.email,
        password: req.body.password,
        logo: req.body.logo,
      });

      await newSchool.save();
      return res.status(201).json({ message: "Success" });
    } catch (error) {
      console.error("Error creating school:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  },

  getSchoolbyID: async (req, res) => {
    const getSchoolbyID = await school
      .findById(req.params.id)
      .select("-password");
    return res.status(200).json({ data: getSchoolbyID });
  },

  deleteSchool: async (req, res) => {
    const deleteSchool = await school.findByIdAndDelete(req.params.id);
    if (!deleteSchool) {
      return res.status(404).json({ message: "Account doesn't exist" });
    }
    return res.status(200).json({ message: "Account successfully deleted" });
  },

  getAllSchools: async (req, res) => {
    try {
      const findAllSchools = await school
        .find()
        .populate({ path: "teachers", select: "-password" });
      return ok(res, "", findAllSchools);
    } catch (error) {
      return error_404(res);
    }
  },

  editSchool: async (req, res) => {
    try {
      const findSchoolbyID = await school.findById(req.params.id);

      const data = {
        name: req.body.name || findSchoolbyID.name,
        location: req.body.location || findSchoolbyID.location,
        email: req.body.email || findSchoolbyID.email,
        password: req.body.password || findSchoolbyID.password,
        logo: req.body.logo || findSchoolbyID.logo,
      };
      await school.findByIdAndUpdate(findSchoolbyID._id, data);
      console.log(data);
      return ok(res);
    } catch (error) {
      return server_error(res);
    }
  },
};
