import { Server, createServer } from "http";
import express from "express";
import { logger } from "@src/config/logger";
import { storageIds } from "../storages/ids";
import { inject, injectable } from "inversify";
import { CacheManager } from "../storages/cache/manager";

export const serverIds = {
	server: Symbol.for("Server")
};

@injectable()
export class CustomServer {
	private readonly server: Server;
	private readonly _expressApp: express.Express;

	constructor(
    @inject(storageIds.cache.manager)
    private readonly cache: CacheManager
	) {
		this._expressApp = express();
		this.server = createServer(this._expressApp);

		if(process.env.NODE_ENV !== "test")
			logger.info("Http server conected.");
	}

	get http(): Server {
		return this.server;
	}

	get expressApp() {
		return this._expressApp;
	}

	async stopInSilence() {
		this.server.close();
		await this.cache.close();
	}

	async stop() {
		this.server.close();

		if(process.env.NODE_ENV === "test")
			return;

		logger.info("Http server closed.");
    
		await this.cache.close()
			.then(() => logger.info("Cache database closed."));

		logger.info("\nEverything was closed gracefully!");
	}
}
