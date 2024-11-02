const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminController");
const { body } = require("express-validator");
const jwt = require("jsonwebtoken");

// middleware JWT
const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token." });
    }
    if (decoded.role !== "admin" || decoded.role !== "Admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }
    req.user = decoded;
    next();
  });
};

// user
router.post("/register", verifyJWT, admin.register);
router.post("/addrole", verifyJWT, admin.addRole);

//news
const validateNews = [
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("id_category").notEmpty().withMessage("Category ID is required"),
];
router.post("/addNews", verifyJWT, validateNews, admin.addNews);

const validateEditNews = [
  body("title").exists().withMessage("Title is required"),
  body("content").exists().withMessage("Content is required"),
  body("author").exists().withMessage("Author is required"),
  body("id_category").exists().withMessage("Category ID is required"),
];
router.put("/editNews/:id", verifyJWT, validateEditNews, admin.editNews);

router.delete("/deleteNews/:id", verifyJWT, admin.deleteNews);

//categories
const validateCat = [body("name").notEmpty().withMessage("Name is required")];
router.post("/addCategory", verifyJWT, validateCat, admin.addCategory);
router.put("/editCategory", verifyJWT, validateCat, admin.editCategory);
router.delete("/deleteCategory/:id", verifyJWT, admin.deleteCategory);

module.exports = router;
