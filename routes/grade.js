const router = require("express").Router();
const gradeController = require("../controllers/grade-controller");

router.post("/create/", gradeController.createGrade);
router.get("/getStudentGrades/:id", gradeController.getStudentGrades);
router.post("/update/", gradeController.updateGrade);

module.exports = router;
