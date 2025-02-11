const router = require("express").Router();
const schoolController = require("../controllers/school-controller");

router.post("/create", schoolController.createSchool);
router.post("/login", schoolController.loginSchool);
router.post("/delete/:id", schoolController.deleteSchool);
router.get("/:id", schoolController.getSchoolbyID);
router.get("/", schoolController.getAllSchools);
router.post("/edit/:id", schoolController.editSchool);

module.exports = router;
