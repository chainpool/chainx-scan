const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const helmet = require("koa-helmet");
const http = require("http");
const db = require(__dirname + "/../models");

const app = new Koa();

app
  .use(logger())
  .use(bodyParser())
  .use(helmet());

require("./routes")(app);

const server = http.createServer(app.callback());
db.sequelize.authenticate().then(() => {
  app.context.db = db;
  server.listen(3000);
});
