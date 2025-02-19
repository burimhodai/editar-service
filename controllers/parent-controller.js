const { server_error, error_404, ok } = require("../helpers/responses");
const parent = require("../models/Parent");
const child = require("../models/Student");
const jwt = require("jsonwebtoken");

module.exports = {
  getAllParents: async (req, res) => {
    const getAll = await parent.find();
    return ok(res, "", getAll);
  },

  loginParent: async (req, res) => {
    const exists = await parent.findOne({ email: req.body.email });

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

      const data = {
        parent: newParent._id,
      };

      await child.findOneAndUpdate(
        {
          birthNumber: req.body.birthNumber,
        },
        data
      );

      await parent.findByIdAndUpdate(newParent._id, {
        $push: {
          children: existsBirthNumber._id,
        },
      });

      return res.status(201).json({ message: "Parent created successfully" });
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
      error_404(res, "Account was not found");
    }
    ok(res, "Deleted Successfully");
  },

  editParent: async (req, res) => {
    try {
      const findParentbyID = await parent.findById(req.params.id);

      const data = {
        name: req.body.name || findParentbyID.name,
        email: req.body.email || findParentbyID.email,
        password: req.body.password || findParentbyID.password,
      };

      await parent.findByIdAndUpdate(findParentbyID._id, data);
    } catch (error) {
      server_error(res);
    }
  },
};
