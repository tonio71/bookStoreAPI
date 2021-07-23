import express from "express";
import cors from "cors";
import winston from "winston";
import basicAuth from "express-basic-auth";
import security from "./security/functions.security.js"
import clientRouter from "./routes/client.route.js";
import authorRouter from "./routes/author.route.js";
import bookRouter from "./routes/book.route.js";
import bookInfoRouter from "./routes/bookInfo.route.js";
import saleRouter from "./routes/sale.route.js";

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message}`;
});

global.userName='';
global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "bookstore-api.log" }),
  ],
  format: combine(
    label({ label: "bookStore-api_sequelize" }),
    timestamp(),
    myFormat
  ),
});

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  basicAuth({ 
      authorizer:(username,password) =>{
        global.userName = username;
        const userMatches = basicAuth.safeCompare(username, 'admin'); 
        const pwdMatches = basicAuth.safeCompare(password, 'admin');  

        const user2Matches = basicAuth.safeCompare(username, 'tonio'); 
        const pwd2Matches = basicAuth.safeCompare(password, '1234');  

        return userMatches && pwdMatches || user2Matches && pwd2Matches;
      }
  })
);

app.use("/client", security.authorize('admin'), clientRouter);
app.use("/author", security.authorize('admin'), authorRouter);
app.use("/book", security.authorize('admin','vendedor'), bookRouter);
app.use("/sale", security.authorize('admin','vendedor'), saleRouter);
app.use("/bookInfo", security.authorize('admin'), bookInfoRouter);

app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default app;
