import { IUserContainerData } from "@/features/auth/auth.slice";
import { GetServerSidePropsContext } from "next";
import { refreshTokenServerOnly } from "./refreshToken";

export async function refreshAllTokens(ctx: GetServerSidePropsContext) {
	const cookie = ctx.req.headers["cookie"];

	const headers = new Headers();
	await refreshTokenServerOnly({
		cookie: `${cookie}`,
		headers,
	}).then((data) => {
		const tokenData = data.access_token;
		headers.set("authorization", `Bearer ${tokenData}`);
	});

	const refreshCookie = headers.get("set-cookie");
	const accessToken = headers.get("authorization");
	if (!refreshCookie || !accessToken) throw new Error("Auth content empty");

	const userData: IUserContainerData = JSON.parse(
		Buffer.from(accessToken.split(".")[1], "base64").toString("ascii"),
	);

	ctx.res.setHeader("set-cookie", refreshCookie);

	return {
		rawToken: accessToken,
		userData,
	};
}
