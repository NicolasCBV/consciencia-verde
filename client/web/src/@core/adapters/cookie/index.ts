import { serialize, parse as parseCookie } from "cookie";
import { injectable } from "inversify";
import { CookieAdapter, IPropsMakeCookie, IPropsParseCookies } from "../cookie";

@injectable()
export class Cookie implements CookieAdapter {
	make(input: IPropsMakeCookie) {
		const { name, value, options } = input;
		const content = serialize(name, value, options);
		return content;
	}

	parse(input: IPropsParseCookies) {
		return parseCookie(input.cookie, input.options);
	}
}
