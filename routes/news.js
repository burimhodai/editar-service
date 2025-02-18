const router = require("express").Router();
const newsController = require("../controllers/news-controller");

router.post("/create/", newsController.createNews);
router.get("/:id", newsController.getNews);
router.post("/update/:id", newsController.updateNews);
router.post("/delete/:id", newsController.deleteNews);

module.exports = router;
