const dbConfig = require("../config/database");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorAlias: false,
    timezone: "+08:00",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);
const db = {};
db.users = require("./usersModel")(sequelize, Sequelize);
db.roles = require("./roleModel")(sequelize, Sequelize);
db.userRoles = require("./userRoleModel")(sequelize, Sequelize);
db.categories = require("./categoriesModel")(sequelize, Sequelize);
db.news = require("./newsModel")(sequelize, Sequelize);

db.users.belongsToMany(db.roles, {
  through: db.userRoles,
  foreignKey: "id_user",
});
db.roles.belongsToMany(db.users, {
  through: db.userRoles,
  foreignKey: "id_role",
});
db.news.belongsTo(db.categories, { foreignKey: "id_category" });
db.categories.hasMany(db.news, { foreignKey: "id_category" });

module.exports = db;
