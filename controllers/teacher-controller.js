const teacher = require ("../models/Teacher")
const jwt = require("jsonwebtoken")

module.exports = {

    loginTeacher: async (req,res) => {
        const exists = await teacher.findOne({email:req.body.email})

        if (!exists) {
            return res.status(404).json({message: "Teacher account not found"})
        }

        const validPassword = exists.password == req.body.password
        if (!validPassword) {
            return res.status(403).json({message: "Invalid password"})
        }
        
        exists.password = undefined
        const token = jwt.sign({exists}, "pl23kl123lamsdfejkjrk3@3lakslk0dl3erksa;")

        return res.status(200).json({message: "Login successful", data:token})
    },

    createTeacher: async (req,res) => {
        
        try {
            const exists = await teacher.findOne({email:req.body.email})
        
         if (exists) {
            return res.status(403).json({message: "This email is already being used"})
         }

        const newTeacher = new teacher({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            headTeacher: req.body.headTeacher,
            school: req.body.school_id
        })

        await newTeacher.save()
        return res.status(201).json({message:"Success"});

        } catch (error) {
            console.error("Error creating teacher:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
    
    getTeacherbyID: async (req,res) => {
        const getTeacher = await teacher.findById(req.params.id)
        .select("-password")
        .populate({path:"school", select:"-password"})
        .populate({path:"subject"})
        return res.status(200).json({data:getTeacher})
    },

    deleteTeacher: async (req,res) => {
        const deleteTeacher = await teacher.findByIdAndDelete(req.params.id)
        if (!deleteTeacher) {
            return res.status(404).json({message:"Account doesn't exist"})
        }
        return res.status(200).json({message:"Account successfully deleted"})

    },

    editTeacher: async (req,res) => {
        
    }

}