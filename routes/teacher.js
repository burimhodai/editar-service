const router = require("express").Router();
const teacherController = require("../controllers/teacher-controller");

router.post("/create", teacherController.createTeacher);
router.post("/login", teacherController.loginTeacher);
router.post("/delete/:id", teacherController.deleteTeacher);
router.get("/:id", teacherController.getTeacherbyID);
router.put("/edit", teacherController.editTeacher);

module.exports = router;
