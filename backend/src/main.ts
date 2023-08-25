import "reflect-metadata";

import * as express from "express";
import { application } from "./app";
import { logger } from "./config/logger";
import { routes } from "./infra/routes";
import cors from "cors";

const port = process.env.PORT ?? 3031;

export async function startApplication() {
  application.server.expressApp.use(cors({
    origin: String(process.env.CLIENT_URL),
    methods: ['DELETE', 'POST', 'PATCH', 'GET'],
    preflightContinue: false,
    credentials: true,
  }))

  application.server.expressApp.use(express.json({
    limit: "5mb"
  }));
  application.server.expressApp.use(routes);
  application.server.expressApp.use(application.middlewares.error.exec);

  await application.server.initServices().then(() => {
    application.server.http.listen(port, () => {
      if(process.env.NODE_ENV !== "test")
        logger.info(`Running server on ${port} port.`);
    })
  });
}

startApplication();
