module.exports = (sequelize, Sequelize) => {
  const UserRole = sequelize.define(
    "UserRole",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_user: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      id_role: {
        type: Sequelize.INTEGER,
        references: {
          model: "Role",
          key: "id",
        },
      },
    },
    { tableName: "user_roles" }
  );
  //   sequelize.sync();
  return UserRole;
};
