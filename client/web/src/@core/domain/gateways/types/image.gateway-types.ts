import { IncomingMessage } from "http";

export namespace ImageGatewayTypes {
	export interface IProcessImage {
		name: string;
		buffer: Buffer;
		mimeType: string;
	}

	export interface IPropsProcessImage {
		request: IncomingMessage;
	}
}
