import { AbstractImageGateway } from "@/@core/domain/gateways/image.gateway";
import { ImageGatewayTypes } from "@/@core/domain/gateways/types/image.gateway-types";
import { HttpError } from "@/@core/errors/HttpError";
import formidable from 'formidable';
import { IncomingMessage } from "http";
import { injectable } from "inversify";
import { Writable } from "stream";

@injectable()
export class ImageGateway implements AbstractImageGateway {
	private readonly formidableConfig: formidable.Options = {
		keepExtensions: true,
		maxFileSize: 4 * 1024 * 1024,
		maxFieldsSize: 4 * 1024 * 1024,
		maxFields: 1,
		allowEmptyFiles: false,
		multiples: false
	};

	private async formidablePromise(
		req: IncomingMessage,
		opts?: Parameters<typeof formidable>[0]
	): Promise<{
		fields: formidable.Fields; 
		files: formidable.Files;
	}> {
		return new Promise((accept, reject) => {
			const form = formidable(opts);

			form.parse(req, (err, fields, files) => {
				if(err)
					return reject(err);
				return accept({ fields, files });
			})
		})
	}

	private fileConsumer<T = unknown>(acc: T[]) {
		const writable = new Writable({
			write: (chunk, _enc, next) => {
				acc.push(chunk);
				next();
			}
		});
		return writable;
	}

	async process(
		input: ImageGatewayTypes.IPropsProcessImage
	): Promise<ImageGatewayTypes.IProcessImage> {
		const chunks: never[] = [];

		const { files } = await this.formidablePromise(input.request, {
			...this.formidableConfig,
			fileWriteStreamHandler: () => this.fileConsumer(chunks)
		});

		const { file } = files;

		if(!file || !file[0] || !file[0].mimetype || !file[0].originalFilename)
			throw new HttpError({
				name: "Bad Request",
				message: "File doesn't exist",
				code: 400
			});

		return { 
			buffer: Buffer.concat(chunks),
			mimeType: file[0].mimetype,
			name: file[0].originalFilename
		}
	}	
} 
