const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const logger = require("koa-logger");
const helmet = require("koa-helmet");
const http = require("http");

const app = new Koa();

app
  .use(logger())
  .use(bodyParser())
  .use(helmet());

const server = http.createServer(app.callback());
server.listen(3000);
