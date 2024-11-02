module.exports = (sequelize, Sequelize) => {
  const Categories = sequelize.define(
    "Categories",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      categoryName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "categories",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  // sequelize.sync();
  return Categories;
};
