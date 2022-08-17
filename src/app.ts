import "express-async-errors";
import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import router from "./routers/index.js";
import handleError from "./middlewares/errorMiddleware.js";
import e2eTestsRouter from "./routers/e2eTestsRouter.js";

const app = express();
app.use(json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    app.use(helmet());
    app.use(e2eTestsRouter);
}

app.use(router);
app.use(handleError);

export default app;
