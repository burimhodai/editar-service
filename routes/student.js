const router = require("express").Router();
const studentController = require("../controllers/student-controller");
const authMiddleware = require("../middleware/auth");

router.post("/create", studentController.createStudent);
router.post("/login", studentController.loginStudent);
router.post("/delete/:id", studentController.deleteStudent);
router.get("/:id", studentController.getStudentbyID);
router.get("/:birthNumber", studentController.getStudentbyBN);
router.post("/edit/:id", studentController.editStudent);
router.get("/", studentController.getAllStudents);
router.post("/createAccessToken/", authMiddleware.createAccessTokenStudent);
router.post("/createRefreshToken/", authMiddleware.createRefreshTokenStudent);

module.exports = router;
