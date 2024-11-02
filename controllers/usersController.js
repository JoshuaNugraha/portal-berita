const db = require("../models");
const Categories = db.categories;
const News = db.news;
const { Op } = require("sequelize");

exports.listNews = async (req, res) => {
  try {
    const news = await News.findAll({
      attributes: ["id", "title", "author", "slug"],
      include: {
        model: Categories,
        attributes: ["categoryName", "id"],
      },
    });
    return res.status(200).json({ news });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cariNews = async (req, res) => {
  try {
    const title = req.body.title;
    const news = await News.findAll({
      attributes: ["id", "title", "author", "slug"],
      where: { title: { [Op.like]: `%${title}%` } },
      include: {
        model: Categories,
        attributes: ["categoryName"],
      },
    });
    res.status(200).json({ news });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.newsDetail = async (req, res) => {
  try {
    const slug = req.params.slug;
    const news = await News.findOne({
      where: { slug },
      include: { model: Categories, attributes: ["categoryName"] },
    });

    if (!news) {
      return res.status(404).json({ message: "Halaman tidak ada" });
    }
    return res.status(200).json({ news });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// kategori list

exports.listCategory = async (req, res) => {
  try {
    const categories = await Categories.findAll({
      attributes: ["id", "categoryName"],
    });
    return res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
