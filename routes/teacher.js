const router = require("express").Router();
const teacherController = require("../controllers/teacher-controller");
const authMiddleware = require("../middleware/auth");

router.post("/create", teacherController.createTeacher);
router.post("/login", teacherController.loginTeacher);
router.post("/delete/:id", teacherController.deleteTeacher);
// router.get("/:id", teacherController.getTeacherbyID);
router.post("/edit/:id", teacherController.editTeacher);
router.get("/:id", teacherController.getAllTeachers);
router.get("/school/:id", teacherController.getTeachersbySchoolID);
router.post("/createAccessToken/", authMiddleware.createAccessTokenTeacher);
router.post("/createRefreshToken/", authMiddleware.createRefreshTokenTeacher);

module.exports = router;
