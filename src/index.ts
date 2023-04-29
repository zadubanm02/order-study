import express, { Express, Request, Response } from "express";
import bodyParser, { urlencoded } from "body-parser";
import dotenv from "dotenv";
import { werehouseRoutes } from "./routes/werehouse.route";
import { requestLogger } from "./logger";

dotenv.config();

const app: Express = express();

// middlewares
app.use(bodyParser.json());
app.use(urlencoded({ extended: true }));
app.use(requestLogger);

// routes
app.use("/products", werehouseRoutes);

const port = process.env.PORT;

// start
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
