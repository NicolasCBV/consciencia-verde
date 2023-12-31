import sanitizeHtml from "sanitize-html";

import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { Header } from "../../components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Application } from "@/@core/application/container";
import { PostMapper } from "@/@core/infra/mappers/post";

import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";

import { useEffect, useMemo } from "react";
import { ContentContainer } from "@/components/post/contentContainer";
import Image from "next/image";
import Head from "next/head";
import { getTokens, ITokens } from "../api/serverFunctions/getTokens";
import { useDispatch } from "react-redux";
import { CHANGE_AUTH_TOKEN, IUserContainerData } from "@/features/auth/auth.slice";
import { Button } from "@/components/common/Button";
import { Camera, PencilCircle } from "phosphor-react";
import { refreshTokenServerOnly } from "../api/serverFunctions/refreshToken";

export default function Post({
	rawToken,
	userContainerData,
	post
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const dispatch = useDispatch();

	const output = useMemo(() => {
		const dirtyHtml = generateHTML(post.content, [
			StarterKit	
		]);

		const html = sanitizeHtml(dirtyHtml);
		return html;
	}, [post.content]);

	useEffect(() => {
		if(!rawToken || !userContainerData)
			return; 

		dispatch(CHANGE_AUTH_TOKEN({
			rawToken,
			userContainerData 
		}));

		const eventId = setInterval(async () => {
			const { access_token } = await Application
				.refreshTokensFlow
				.refresh
				.exec();

			const user: IUserContainerData = JSON.parse(
				Buffer.from(
					access_token.split(".")[1], 
					"base64"
				).toString("ascii")
			);

			dispatch(CHANGE_AUTH_TOKEN({
				rawToken: `Bearer ${access_token}`,
				userContainerData: user
			}));
		}, 1000 * 60 * 14);

		return () => {
			clearInterval(eventId);
		};
	});

	return (
		<>
			<Head>
				<title>ConSciência - postagem</title>
				<meta
					name="description"
					content="Vamos parar para ler uma de nossas notícias."
				/>
			</Head>
			<div className="grid min-h-[100vh]">
				<Header/>
				<main className="grid w-[80vw] max-w-[45rem] place-self-center place-items-center place-content-center pt-24 pb-32">
					<div>
						{
							!post.image.URI
								? <Camera
									width={300}
									height={300}
									weight="thin"
									className="object-cover relative rounded-lg w-[80vw] max-w-[35rem] h-[57vh] max-h-[20rem] object-fit border-2 border-primaryColor-750"
								/>
								: <Image
									className="object-cover relative rounded-lg w-[80vw] max-w-[35rem] h-[57vh] max-h-[20rem] object-fit"
									width={500}
									height={500}
									src={post.image.URI}
									alt="Foto do post."
									priority={true}
								/>
						}
					</div>
          
					<div className="w-[80vw] max-w-[45rem] flex flex-col my-8 prose prose-slate prose-a:text-blue-600 place-self-start place-content-start prose-sm break-all mt-24 mb-16">
						<h1>{post.name}</h1>
						<small>Criado em: {post.createdAt}</small>
						{
							userContainerData 
							&& userContainerData?.userData.level > 0 &&
								<Button
									name="Editar"
									className="self-start mt-8"
									href={`/editor/${post.id}`}
									iconData={{
										pos: "right",
										Icon: PencilCircle
									}}
								/>
						}
					</div>
					<ContentContainer output={output}/>
				</main>
				<Footer/>
			</div>
		</>
	);
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	try {
		const refreshCookie = ctx.req.headers["cookie"];

		let tokens: ITokens | undefined;
		if(refreshCookie) {
			const headers = new Headers();
			await refreshTokenServerOnly({
				cookie: refreshCookie,
				headers
			})
				.then(({ access_token }) => {
					ctx.req.headers.authorization = access_token;
					tokens = getTokens(ctx);
					ctx.res.setHeader("set-cookie", String(
						headers.get("set-cookie")
					));
					return access_token;
				})
				.catch(() => {});
		}

		const postId = String(ctx?.params?.id) ?? "";
		const rawPost = await Application
			.postFlow
			.get
			.exec({ id: postId });

		if(!rawPost)
			return {
				redirect: {
					permanent: false,
					destination: "/news"
				}
			};

		const { 
			content: rawContent, 
			name: rawName, 
			...post 
		} = PostMapper.toObject(rawPost);

		const name = decodeURIComponent(rawName);
		const content = rawContent.map((item) => {
			return JSON.parse(item);
		});

		const json = {
			type: "doc",
			content
		};

		const createdAt = new Date(post.createdAt).toLocaleString();
		const hours = createdAt.split(",")[1];
		const [ month, day, year ] = createdAt.split(",")[0].split("/");
		
		return {
			props: {
				rawToken: tokens ? tokens.rawToken : null,
				userContainerData: tokens ? tokens.userContainerData : null,
				post: {
					...post,
					createdAt: `${day}/${month}/${year} às ${hours}`,
					id: postId,
					name,
					content: json
				}
			}
		};
	} catch(err) {
		return {
			redirect: {
				permanent: false,
				destination: "/news"
			}
		};
	}
};

