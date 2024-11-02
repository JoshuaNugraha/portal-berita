module.exports = {
  host: process.env.DB_HOST_DEV,
  username: process.env.DB_USER_DEV,
  password: process.env.DB_PASS_DEV,
  database: process.env.DB_NAME_DEV,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
