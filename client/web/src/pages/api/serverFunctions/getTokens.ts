import { IUserContainerData } from "@/features/auth/auth.slice";
import { GetServerSidePropsContext } from "next";

export interface ITokens {
	rawToken: string;
	userContainerData: IUserContainerData;
}

export function getTokens(ctx: GetServerSidePropsContext) {
	const auth = ctx.req.headers.authorization;
	if (!auth) throw new Error("Empty access token");

	const userData: IUserContainerData = JSON.parse(
		Buffer.from(auth.split(".")[1], "base64").toString("ascii"),
	);

	return {
		rawToken: auth,
		userContainerData: userData,
	};
}
