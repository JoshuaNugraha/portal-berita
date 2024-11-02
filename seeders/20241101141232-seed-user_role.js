// seeders/20240101000002-seed-user_roles.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("user_roles", [
      {
        id_user: 1,
        id_role: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      "user_roles",
      { id_user: 1, id_role: 1 },
      {}
    );
  },
};
