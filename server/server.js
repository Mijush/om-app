const jsonServer = require("json-server");
// const bodyParser = require("body-parser");
const server = jsonServer.create();
const router = jsonServer.router("./api.json");
// const middlewares = jsonServer.defaults();
const movieAPIrouter = require("./movieAPI/movieAPI.routes");

const PORT = process.env.PORT || 3000;

server.use(jsonServer.defaults());
// server.use(bodyParser.urlencoded({ extended: true }));
// server.use(bodyParser.json());
// server.use(middlewares);

// server.use(jsonServer.bodyParser);

server.use("/api", movieAPIrouter);

server.use("/api", router);

server.listen(PORT, () => {
  console.log("JSON Server is running");
});
