// seeders/20240101000001-seed-users.js
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("password", 10);

    await queryInterface.bulkInsert("users", [
      {
        email: "admin@example.com",
        password: hashedPassword,
        name: "Nama",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", { email: "user@example.com" }, {});
  },
};
