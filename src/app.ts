import express, { json } from "express";
import "express-async-errors";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import router from "./routers/index.js";

const app = express();
app.use(json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    app.use(helmet());
}

app.use(router);

export default app;
