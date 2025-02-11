const router = require("express").Router();
const subjectController = require("../controllers/subject-controller");

router.post("/create/:id", subjectController.createSubject);
router.post("/assign-teacher/:id", subjectController.assignTeacherToSubject);
router.post("/delete/:id", subjectController.deleteSubject);
router.post("/edit/:id", subjectController.editSubject);
router.get("/:id", subjectController.getSubjectbyID);
router.post("/assign-student/:id", subjectController.assignStudentToSubject);
router.post("/remove-student/:id", subjectController.removeStudentFromSubject);

module.exports = router;
