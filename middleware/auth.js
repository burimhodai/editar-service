const {
  server_error,
  ok,
  error_404,
  unauthorized,
} = require("../helpers/responses");
const Parent = require("../models/Parent");
const Teacher = require("../models/Teacher");
const jwt = require("jsonwebtoken");

module.exports = {
  createAccessTokenTeacher: async (req, res) => {
    try {
      const exists = await Teacher.findOne({ email: req.body.email });

      if (!exists) {
        return res.status(404).json({ message: "Teacher account not found" });
      }

      exists.password = undefined;
      const token = jwt.sign(
        { exists },
        "pl23kl123lamsdfejkjrk3@3lakslk0dl3erksa;",
        { expiresIn: "1d" }
      );
      ok(res, "", token);
    } catch (error) {
      server_error(res);
    }
  },

  createRefreshTokenTeacher: async (req, res) => {
    try {
      const headers = req.headers.authorization || req.headers["Authorization"];

      if (!headers) {
        error_404(res);
      }

      const token = headers.split(" ")[1];
      const decoded = jwt.verify(
        token,
        "pl23kl123lamsdfejkjrk3@3lakslk0dl3erksa;"
      );

      console.log(decoded);
      const id = decoded.exists._id;

      const teacher = await Teacher.findById(id);

      if (!teacher) {
        unauthorized(res);
      }

      teacher.password = undefined;

      const refreshToken = jwt.sign(
        { teacher },
        "pl23kl123lamsdfejkjrk3@3lakslk0dl3erksa;",
        { expiresIn: "1d" }
      );
      ok(res, "", refreshToken);
    } catch (error) {
      console.log(error);
      server_error(res);
    }
  },
  ////Teacher

  createAccessTokenParent: async (req, res) => {
    try {
      const exists = await Parent.findOne({ email: req.body.email });

      if (!exists) {
        return res.status(404).json({ message: "Teacher account not found" });
      }

      exists.password = undefined;
      const token = jwt.sign(
        { exists },
        "pl23kl123lamsdfejkjrk3@3lakslk0dl3erksa;",
        { expiresIn: "1d" }
      );
      ok(res, "", token);
    } catch (error) {
      server_error(res);
    }
  },

  createRefreshTokenParent: async (req, res) => {
    try {
      const headers = req.headers.authorization || req.headers["Authorization"];

      if (!headers) {
        error_404(res);
      }

      const token = headers.split(" ")[1];
      const decoded = jwt.verify(
        token,
        "pl23kl123lamsdfejkjrk3@3lakslk0dl3erksa;"
      );

      const id = decoded.exists._id;

      const parent = await Parent.findById(id);

      if (!parent) {
        unauthorized(res);
      }

      parent.password = undefined;

      const refreshToken = jwt.sign(
        { parent },
        "pl23kl123lamsdfejkjrk3@3lakslk0dl3erksa;",
        { expiresIn: "1d" }
      );
      ok(res, "", refreshToken);
    } catch (error) {
      server_error(res);
    }
  },
  ////Parent

  createAccessTokenStudent: async (req, res) => {
    try {
      const exists = await Student.findOne({ email: req.body.email });

      if (!exists) {
        return res.status(404).json({ message: "Teacher account not found" });
      }

      exists.password = undefined;
      const token = jwt.sign(
        { exists },
        "pl23kl123lamsdfejkjrk3@3lakslk0dl3erksa;",
        { expiresIn: "1d" }
      );
      ok(res, "", token);
    } catch (error) {
      server_error(res);
    }
  },

  createRefreshTokenStudent: async (req, res) => {
    try {
      const headers = req.headers.authorization || req.headers["Authorization"];

      if (!headers) {
        error_404(res);
      }

      const token = headers.split(" ")[1];
      const decoded = jwt.verify(
        token,
        "pl23kl123lamsdfejkjrk3@3lakslk0dl3erksa;"
      );

      const id = decoded.exists._id;

      const student = await Student.findById(id);

      if (!student) {
        unauthorized(res);
      }

      student.password = undefined;

      const refreshToken = jwt.sign(
        { student },
        "pl23kl123lamsdfejkjrk3@3lakslk0dl3erksa;",
        { expiresIn: "1d" }
      );
      ok(res, "", refreshToken);
    } catch (error) {
      server_error(res);
    }
  },

  ////Student

  createAccessTokenSchool: async (req, res) => {
    try {
      const exists = await School.findOne({ email: req.body.email });

      if (!exists) {
        return res.status(404).json({ message: "Teacher account not found" });
      }

      exists.password = undefined;
      const token = jwt.sign(
        { exists },
        "pl23kl123lamsdfejkjrk3@3lakslk0dl3erksa;",
        { expiresIn: "1d" }
      );
      ok(res, "", token);
    } catch (error) {
      server_error(res);
    }
  },

  createRefreshTokenSchool: async (req, res) => {
    try {
      const headers = req.headers.authorization || req.headers["Authorization"];

      if (!headers) {
        error_404(res);
      }

      const token = headers.split(" ")[1];
      const decoded = jwt.verify(
        token,
        "pl23kl123lamsdfejkjrk3@3lakslk0dl3erksa;"
      );

      const id = decoded.exists._id;

      const School = await School.findById(id);

      if (!School) {
        unauthorized(res);
      }

      School.password = undefined;

      const refreshToken = jwt.sign(
        { School },
        "pl23kl123lamsdfejkjrk3@3lakslk0dl3erksa;",
        { expiresIn: "1d" }
      );
      ok(res, "", refreshToken);
    } catch (error) {
      server_error(res);
    }
  },
  //school
};
