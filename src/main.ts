import { config } from "./config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import { sequelize } from "./connections/mysql";
import { userRouter } from "./users/infrastructure/http/user-router";
import "./users/infrastructure/user-repository/user-model";

function bootstrap () {
  const app = express();

  const { port } = config.server;

  app.use(cors());
  app.use(morgan("dev"));
  app.use(helmet());
  app.use(express.json());

  app.use("/users", userRouter);

  app.listen(port, async () => {
    console.log(`[APP] - Starting application on http://localhost:${port}`);

    try {
      await sequelize.sync({ force: false });

      console.log("[APP] - Connection with database established");
    } catch (error) {
      console.error("[APP] - Unable to connect with database", error);
    }
  });
}

bootstrap();
