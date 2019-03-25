const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const helmet = require("koa-helmet");
const http = require("http");
const db = require(__dirname + "/../models");
const cors = require("@koa/cors");
require("dotenv").config();
const Socket = require("socket.io");

const app = new Koa();

app
  .use(logger())
  .use(bodyParser())
  .use(cors())
  .use(helmet());

require("./routes")(app);

const server = http.createServer(app.callback());
const io = new Socket(server);

require("./io")(io, db);

db.sequelize.authenticate().then(() => {
  app.context.db = db;

  const port = process.env.SERVER_PORT || 3001;
  server.listen(port, () => console.log(`✅  The server is running at http://localhost:${port}/`));
});
