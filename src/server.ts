import express from "express";
import helmet from "helmet";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import authRouter from "./users/auth.controller";
import userRouter from "./users/users.controllers";
import fileRouter from "./helpers/fileHandlers";

const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());
server.use(helmet());

server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/files", fileRouter);

server.use("/docs", swaggerUi.serve);

export default server;
