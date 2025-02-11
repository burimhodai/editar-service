const parent = require("../models/Parent");
const child = require("../models/Student");
const jwt = require("jsonwebtoken");

module.exports = {
  loginParent: async (req, res) => {
    const exists = await parent.findOne({ email: req.body.email });

    if (!exists) {
      return res.status(403).json({ message: "User doesn't exist" });
    }

    const validPassword = exists.password == req.body.password;
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    exist.password = undefined;
    const token = jwt.sign(
      { exists },
      "pl23kl123lamsdfejkjrk3@3lakslk0dl3erksa;"
    );
    return res.status(200).json({ message: "Login successful", data: token });
  },

  createParent: async (req, res) => {
    try {
      const existsBirthNumber = await child.findOne({
        birthNumber: req.body.birthNumber,
      });

      if (!existsBirthNumber) {
        return res
          .status(403)
          .json({ message: "The birth number is not a registered student." });
      }

      const newParent = new parent({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });

      await newParent.save();
      return res.status(201).json({ message: "Account created successfully" });
    } catch (error) {
      console.error("Error creating account:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },

  getParentbyID: async (req, res) => {
    const getParent = await parent
      .findById(req.params.id)
      .select("-password")
      .populate({ path: "children" });
    return res.status(200).json({ data: getParent });
  },

  deleteParent: async (req, res) => {
    const deleteParent = await parent.findByIdAndDelete(req.params.id);
    if (!deleteParent) {
      return res.status(404).json({ message: "Parent account doesn't exist" });
    }
    return res
      .status(200)
      .json({ message: "Parent account deleted successfully" });
  },
};
