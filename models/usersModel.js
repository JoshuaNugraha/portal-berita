module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define(
    "Users",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    { tableName: "users" }
  );
  // sequelize.sync();
  return Users;
};
