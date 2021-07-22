import express from "express";
import cors from "cors";
import winston from "winston";
import basicAuth from "express-basic-auth";
import clientRouter from "./routes/client.route.js";
import authorRouter from "./routes/author.route.js";
import bookRouter from "./routes/book.route.js";
import bookInfoRouter from "./routes/bookInfo.route.js";
import saleRouter from "./routes/sale.route.js";

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level} ${message}`;
});

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
        const userMatches = basicAuth.safeCompare(username, 'admin'); 
        const pwdMatches = basicAuth.safeCompare(password, 'admin');  

        const user2Matches = basicAuth.safeCompare(username, 'tonio'); 
        const pwd2Matches = basicAuth.safeCompare(password, '1234');  

        return userMatches && pwdMatches || user2Matches && pwd2Matches;
      }
  })
);

app.use("/client", authorize('admin'), clientRouter);
app.use("/author", authorRouter);
app.use("/book", authorize('admin','vendedor'), bookRouter);
app.use("/sale", saleRouter);
app.use("/bookInfo", bookInfoRouter);

app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

function authorize(...allowed){

  return (req, res, next) => {
    if(req.auth.user){
      const role = getRole(req.auth.user);
      if( isAllowed(role, allowed) ){
        return next();
        
      }
      res.status(401).send('Role not allowed');
    }
    res.status(401).send('User not found!');
  }
}

function isAllowed (role, allowed){
  return (allowed.indexOf(role) > -1);
} 


function getRole(username){
  if(username ==='admin'){
    return 'admin';
  }
  if(username ==='tonio'){
    return 'vendedor';
  }
  return 'no role';
}
app.listen(3000, () => console.log("API Bookstore Started ! ! !"));

