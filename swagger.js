const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "API Documentation",
    description: "Portal Berita API",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./app");
});
