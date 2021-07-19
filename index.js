import express from "express";
import cors from "cors";
import winston from "winston";
import clienteRouter from "./routes/cliente.route.js";

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
app.use("/client", clienteRouter);

app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});
app.listen(3000, () => console.log("API Bookstore Started ! ! !"));
