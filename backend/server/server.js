import express from "express";
import morgan from "morgan";
import session from "express-session";
import ViteExpress from "vite-express";

const app = express()

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: "hello",
    saveUninitialized: false,
    resave: false,
  })
);

import { handlerFunctions } from "./controller.js";

app.get("/api/session-check", handlerFunctions.sessionCheck);
app.post("/api/login", handlerFunctions.login);
app.get("/api/logout", handlerFunctions.logout);
app.post("/api/register", handlerFunctions.register);

ViteExpress.listen(app, 9999, () =>
  console.log(`Listening at http://localhost:9999`)
);