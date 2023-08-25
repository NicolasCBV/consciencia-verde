import { serialize, parse } from "cookie";

interface IRefreshTokenServerOnlyResponse {
  access_token: string;
}

interface IProps {
  cookie: string;
  headers: Headers;
}

export async function refreshTokenServerOnly({
  cookie,
  headers
}: IProps): Promise<IRefreshTokenServerOnlyResponse> {
  const serverUrl = process.env.SERVER_URI;
  return await fetch(
    `${serverUrl}/users/refresh-token`, 
    {
      method: "POST",
      credentials: "include",
      headers: {
        cookie
      },
    })
      .then(async (result) => {
        if(
          result.status !== 200 && 
          !result.headers.has("set-cookie")
        )
          throw new Error("Wrong status");

          const cookie = parse(result.headers.get("set-cookie") as string);
          cookie["Domain"] = process.env.NEXT_PUBLIC_DOMAIN as string;

          headers.set(
            "set-cookie", 
            serialize(
              "refresh-cookie", 
              cookie["refresh-cookie"], {
                maxAge: parseInt(cookie["Max-Age"]),
                httpOnly: true,
                secure: process.env.NODE_ENV === "production"
                  ? true
                  : false,
                domain: cookie["Domain"],
                path: cookie["Path"],
                expires: new Date(cookie["Expires"]),
                sameSite: "strict"
              }
            )
          );
        return result.json();
      });
}
