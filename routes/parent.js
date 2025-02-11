const router = require("express").Router();
const parentController = require("../controllers/parent-controller");

router.post("/create", parentController.createParent);
router.post("/login", parentController.loginParent);
router.post("/delete/:id", parentController.deleteParent);
router.get("/:id", parentController.getParentbyID);
// router.put("/edit", schoolController.editSchool);

module.exports = router;
