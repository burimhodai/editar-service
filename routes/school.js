const router = require("express").Router();
const schoolController = require("../controllers/school-controller");
const authMiddleware = require("../middleware/auth");

router.post("/create", schoolController.createSchool);
router.post("/login", schoolController.loginSchool);
router.post("/delete/:id", schoolController.deleteSchool);
router.get("/:id", schoolController.getSchoolbyID);
router.get("/", schoolController.getAllSchools);
router.post("/edit/:id", schoolController.editSchool);
router.post("/createAccessToken/", authMiddleware.createAccessTokenSchool);
router.post("/createRefreshToken/", authMiddleware.createRefreshTokenSchool);

module.exports = router;
