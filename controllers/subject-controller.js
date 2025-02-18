const {
  bad_request,
  created,
  server_error,
  error_404,
  ok,
} = require("../helpers/responses");
const subject = require("../models/Subject");
const student = require("../models/Student");
const Teacher = require("../models/Teacher");

module.exports = {
  getAllSubjects: async (req, res) => {
    const getAll = await subject.find({ school: req.params.id });

    return res.status(200).json({ data: getAll });
  },

  createSubject: async (req, res) => {
    try {
      const exists = await subject.findOne({
        name: req.body.name,
        school: req.params.id,
      });

      if (exists) {
        bad_request(res);
      }

      const newSubject = new subject({
        name: req.body.name,
        teacher: req.body.teacher_id,
        school: req.params.id,
      });

      await newSubject.save();
      created(res, newSubject);
    } catch (error) {
      server_error(res);
    }
  },

  getSubjectbyID: async (req, res) => {
    try {
      const subjectID = await subject
        .findById(req.params.id)
        .populate("teacher", "-password")
        .populate("student", "-password")
        .populate("school", "-password");

      if (!subjectID) {
        error_404(res);
      }

      created(res, "", subjectID);
    } catch (error) {
      server_error(res);
    }
  },

  editSubject: async (req, res) => {
    try {
      const editSubject = await subject.findById(req.params.id);
      const data = {
        name: req.body.name || editSubject.name,
        teacher: req.body.teacher_id || editSubject.teacher,
      };
      await subject.findByIdAndUpdate(editSubject._id, data);
      ok(res);
    } catch (error) {
      server_error(res);
    }
  },

  deleteSubject: async (req, res) => {
    try {
      const delSubject = await subject.findByIdAndDelete(req.params.id);
      if (!delSubject) {
        error_404(res);
      }
      created(res);
    } catch (error) {
      server_error(res);
    }
  },

  assignTeacherToSubject: async (req, res) => {
    try {
      console.log(req.body.id);
      const subjectAssign = await subject.findByIdAndUpdate(req.body.id, {
        teacher: req.params.id,
      });

      if (!subjectAssign) {
        error_404(res);
      }

      const id = req.body.id;
      const isAssigned = await Teacher.findOne().where("subjects").in([id]);

      console.log(isAssigned);
      if (isAssigned) {
        error_404(res, "Subject already assigned");
      }

      const teacherUpdate = await Teacher.findByIdAndUpdate(req.params.id, {
        $push: { subjects: req.body.id },
      });

      // If teacher update fails, send error
      if (!teacherUpdate) {
        return error_404(res);
      }

      ok(res);
    } catch (error) {
      server_error(res);
    }
  },

  assignStudentToSubject: async (req, res) => {
    try {
      const subjectAssign = await subject.findByIdAndUpdate(req.body.id, {
        $push: {
          students: req.params.id,
        },
      });

      if (!subjectAssign) {
        return error_404(res);
      }

      const studentAssign = await student.findByIdAndUpdate(req.params.id, {
        $push: {
          subjects: req.body.id,
        },
      });

      if (!studentAssign) {
        return error_404(res);
      }

      ok(res);
    } catch (error) {
      console.log(error);
      server_error(res);
    }
  },

  removeStudentFromSubject: async (req, res) => {
    try {
      const subjectAssign = await subject.findByIdAndUpdate(req.body.id, {
        $pull: {
          students: req.params.id,
        },
      });

      if (!subjectAssign) {
        error_404(res);
      }
      ok(res);
    } catch (error) {
      server_error(res);
    }
  },
};
