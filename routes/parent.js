const router = require("express").Router();
const parentController = require("../controllers/parent-controller");
const authMiddleware = require("../middleware/auth");

router.post("/create", parentController.createParent);
router.post("/login", parentController.loginParent);
router.post("/delete/:id", parentController.deleteParent);
router.get("/:id", parentController.getParentbyID);
router.put("/edit/:id", parentController.editParent);
router.get("/", parentController.getAllParents);
router.post("/createAccessToken/", authMiddleware.createAccessTokenParent);
router.post("/createRefreshToken/", authMiddleware.createRefreshTokenParent);

module.exports = router;
