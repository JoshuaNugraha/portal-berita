const bcrypt = require("bcryptjs");

const db = require("../models");
const jwt = require("jsonwebtoken");
const Users = db.users;
const Roles = db.roles;
const UserRoles = db.userRoles;
// const JWT_SECRET = "3b4127942hklwezx782592jlkkk24254422001rfg22";
const JWT_SECRET = process.env.JWT_KEY;

exports.login = async (req, res) => {
  console.log(`JWT_SECRET ${JWT_SECRET}`);

  const { email, password } = req.body;
  try {
    const user = await Users.findOne({
      where: { email },
      include: [
        { model: Roles, attribute: ["role_name"], through: { attributes: [] } },
      ],
    });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    const cekPass = await bcrypt.compare(password, user.password);
    if (!cekPass) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.Roles[0].role_name, email: user.email },
      JWT_SECRET
      // {
      //   expiresIn: "1d",
      // }
    );
    return res.status(200).json({
      message: "Berhasil login",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.Roles[0].role_name,
      },
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
