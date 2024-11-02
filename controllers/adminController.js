const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone");
dayjs.extend(utc);
dayjs.extend(timezone);
const { validationResult } = require("express-validator");

// models
const db = require("../models");
const Users = db.users;
const Roles = db.roles;
const UserRoles = db.userRoles;
const Categories = db.categories;
const News = db.news;

// users
exports.addRole = async (req, res) => {
  try {
    const role_name = req.body.role_name;
    const cekRole = await Roles.findOne({ where: { role_name: role_name } });
    if (cekRole) {
      return res.status(405).json({ message: "Role sudah ada" });
    }
    const addRole = await Roles.create({ role_name });
    return res.status(200).json({ message: "Berhasil menambah role" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { email, password, name, id_role } = req.body;
    const saltRounds = 10;
    const passCrypted = await bcrypt.hash(password, saltRounds);

    const userRole = await Roles.findOne({ where: { id: id_role } });
    if (!userRole) {
      return res.status(404).json({ message: "Role tidak ditemukan" });
    }
    const newUser = await Users.create({ email, password: passCrypted, name });
    await UserRoles.create({ id_user: newUser.id, id_role: id_role });

    return res.status(200).json({ message: "User berhasil dibuat" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Categories
exports.addCategory = async (req, res) => {
  const validate = validationResult(req);
  if (!validate.isEmpty()) {
    return res.status(400).json({ errors: validate.array() });
  }
  try {
    const name = req.body.name;
    await Categories.create({
      categoryName: name,
    });
    return res.status(500).json({ message: "Berhasil menambah kategori baru" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.editCategory = async (req, res) => {
  const validate = validationResult(req);
  if (!validate.isEmpty()) {
    return res.status(400).json({ errors: validate.array() });
  }
  try {
    const categoryName = req.body.name;
    const id = req.body.id;
    const Category = await Categories.findByPk(id);
    if (!Category) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }
    await Categories.update({ categoryName }, { where: { id } });
    return res.status(200).json({ message: "Berhasil perbarui kategori" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const Category = await Categories.findByPk(id);
    if (!Category) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }
    await Category.destroy();
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// NEWS
exports.addNews = async (req, res) => {
  const validate = validationResult(req);
  if (!validate.isEmpty()) {
    return res.status(400).json({ errors: validate.array() });
  }
  try {
    const { title, content, author, id_category } = req.body;

    const cekCategory = await Categories.findByPk(id_category);
    if (!cekCategory) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }
    const slug = makeSlug(title);
    await News.create({
      title,
      content,
      author,
      id_category,
      slug,
    });
    return res.status(200).json({ message: "Berhasil menambah news" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.editNews = async (req, res) => {
  const validate = validationResult(req);
  if (!validate.isEmpty()) {
    return res.status(400).json({ errors: validate.array() });
  }
  try {
    const { title, content, author, id_category } = req.body;
    const id = req.params.id;

    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: "News tidak ditemukan" });
    }
    const cekCategory = await Categories.findByPk(id_category);
    if (!cekCategory) {
      return res.status(404).json({ message: "Kategori tidak ditemukan" });
    }

    const slug = makeSlug(title);
    await news.update({
      title,
      content,
      author,
      id_category,
      slug,
    });
    return res.status(200).json({ message: "Berhasil mengubah news" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteNews = async (req, res) => {
  try {
    const id = req.params.id;
    const news = await News.findByPk(id);
    if (!news) {
      return res.status(404).json({ message: "News tidak ditemukan" });
    }
    await news.destroy();
    return res.status(200).json({ message: "Berhasil menghapus news" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

function makeSlug(title) {
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return slug;
}
