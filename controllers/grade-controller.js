const {
  server_error,
  created,
  ok,
  bad_request,
} = require("../helpers/responses");
const Grade = require("../models/Grade");

module.exports = {
  createGrade: async (req, res) => {
    try {
      const createdGrade = await new Grade(req.body);

      await createdGrade.save();
      created(res, "", createdGrade);
    } catch (error) {
      server_error(res);
    }
  },

  getStudentGrades: async (req, res) => {
    try {
      const grades = await Grade.find({ student: req.params.id });
      ok(res, "", grades);
    } catch (error) {
      server_error(res);
    }
  },

  updateGrade: async (req, res) => {
    try {
      const { id, grade } = req.body;

      if (!id || grade === undefined) {
        return bad_request(res, "Grade ID and new grade value are required.");
      }

      const updatedGrade = await Grade.findByIdAndUpdate(id, { grade });

      if (!updatedGrade) {
        return not_found(res, "Grade not found.");
      }

      ok(res, "Grade updated successfully", updatedGrade);
    } catch (error) {
      server_error(res, error.message);
    }
  },
};
