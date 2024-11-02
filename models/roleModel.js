module.exports = (sequelize, Sequelize) => {
  const Role = sequelize.define(
    "Role",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      role_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { tableName: "roles" }
  );
  //   sequelize.sync();
  return Role;
};
