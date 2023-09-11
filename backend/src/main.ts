import "reflect-metadata";

import * as express from "express";
import { application } from "./app";
import { logger } from "./config/logger";
import { routes } from "./infra/routes";
import cors from "cors";

const port = process.env.PORT ?? 3031;

async function startApplication() {
  process.on("SIGINT", async () => {
    await application.server.stopInSilence();
  });

  application.server.expressApp.set('trust proxy', 3);
  application.server.expressApp.use(cors({
    origin: String(process.env.CLIENT_URL),
    methods: ['DELETE', 'POST', 'PATCH', 'GET'],
    preflightContinue: false,
    credentials: true,
  }));

  application.server.expressApp.use(express.json());
  application.server.expressApp.use(routes);
  application.server.expressApp.use(application.middlewares.error.exec);

  application.server.http.listen(port, () => {
    if(process.env.NODE_ENV !== "test")
      logger.info(`Running server on ${port} port.`);
  })
}

startApplication();

export { startApplication };
