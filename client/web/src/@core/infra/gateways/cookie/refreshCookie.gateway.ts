import { adapterIds } from "@/@core/adapters/adapterIds";
import { CookieAdapter } from "@/@core/adapters/cookie";
import { AbstractCookieGateway } from "@/@core/domain/gateways/cookie.gateway";
import { inject, injectable } from "inversify";

@injectable()
export class RefreshCookieGateway implements AbstractCookieGateway.RefreshCookieGateway {
	constructor(
		@inject(adapterIds.cookie)
		private readonly cookieAdapter: CookieAdapter
	) {}

	makeRefreshCookie(input: string): string {
		const cookie = this.cookieAdapter.parse({ cookie: input });
		return this.cookieAdapter.make({ 
			name: "refresh-cookie",
			value: cookie["refresh-cookie"],
			options: {
				priority: "high",
				maxAge: parseInt(cookie["Max-Age"]),
				httpOnly: true,
				secure: process.env.NODE_ENV === "production"
					? true
					: false,
				domain: process.env.NEXT_PUBLIC_DOMAIN ?? undefined,
				path: "/",
				expires: new Date(cookie["Expires"]),
				sameSite: "strict"
			}
		});
	}
}
