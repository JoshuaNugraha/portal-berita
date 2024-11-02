const express = require("express");
const router = express.Router();
const users = require("../controllers/usersController");

router.get("/listCategory", users.listCategory);
router.get("/listNews", users.listNews);
router.get("/newsDetail/:slug", users.newsDetail);
router.post("/cariNews", users.cariNews);

module.exports = router;
