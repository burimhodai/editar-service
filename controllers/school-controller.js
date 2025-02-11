const school = require("../models/School")
const jwt = require("jsonwebtoken")

module.exports = {
    
    loginSchool: async (req,res) => {
        const exists = await school.findOne({email:req.body.email})

        if (!exists) {
            return res.status(403).json({message: "User doesn't exist"})
        }

        const validPassword = exists.password == req.body.password
        if (!validPassword) {
            return res.status(401).json({message:"Invalid Password"})
        }

        exist.password = undefined
        const token = jwt.sign({exists}, "pl23kl123lamsdfejkjrk3@3lakslk0dl3erksa;")
        
        return res.status(200).json({message: "Login successful", data:token})
    },

    createSchool:async(req,res)=>{
        try {

            const exists = await school.findOne({email:req.body.email})

            if (exists) {
                return res.status(403).json({message:"Already Exists"})
            }

            const newSchool = new school({
              name: req.body.name,
              location: req.body.location,
              email: req.body.email,
              password: req.body.password,
              logo: req.body.logo,
            });
      
            await newSchool.save();
            return res.status(201).json({message:"Success"});
          } catch (error) {
            console.error("Error creating school:", error);
            return res.status(500).json({ error: "Internal Server Error" });
          }
    },

    getSchoolbyID: async (req,res) => {
        const getSchoolbyID = await school.findById(req.params.id).select("-password")
        return res.status(200).json({data:getSchoolbyID})
    },

    deleteSchool: async (req,res) => {
        const deleteSchool = await school.findByIdAndDelete(req.params.id)
        if (!deleteSchool) {
            return res.status(404).json({message:"Account doesn't exist"})
        }
        return res.status(200).json({message:"Account successfully deleted"})
    }
}