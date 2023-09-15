import sanitizeHtml from "sanitize-html";

import { Header } from "../../components/common/Header";
import StarterKit from "@tiptap/starter-kit";
import { JSONContent, useEditor } from "@tiptap/react";
import { useEffect, useMemo, useState } from "react";
import { CircleNotch } from "phosphor-react";
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from "next";
import { ITokens } from "../api/serverFunctions/getTokens";
import { useDispatch } from "react-redux";
import { CHANGE_AUTH_TOKEN, IUserContainerData } from "@/features/auth/auth.slice";
import { defaultHTMLText } from "@/components/createNews/defaultHTMLText";
import { Application } from "@/@core/application/container";
import { Post } from "@/@core/domain/entities/post";
import { CreateNewsMainFlow, ICreatePostForm } from "@/components/createNews/CreateNewsMainFlow";
import { NotificationBalloon } from "@/components/common/NotificationBalloon";
import { Footer } from "@/components/common/Footer";
import { useRouter } from "next/router";
import { useStoreHook } from "@/hooks";
import Head from "next/head";
import { IPostObject, PostMapper } from "@/@core/infra/mappers/post";
import { generateHTML } from "@tiptap/html";
import { Replace } from "@/utils/replace";

import { PostError } from "@/@core/errors/PostError";
import { refreshAllTokens } from "../api/serverFunctions/refreshAllTokens";

export interface IFormCreateNews {
  URI: string | null;
  file: File | null;
}

export interface PostDataInterface {
  name: string;
  desc: string;
}

export default function CreateNews({
	post,
	rawToken,
	userContainerData 
}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
	const router = useRouter();
	const [ isLoading, setIsLoading ] = useState(false);

	const accessToken = useStoreHook((item) => {
		return item.accessToken;
	});

	const [ error, setError ] = useState(false);

	const [ image, setImage ] = useState<IFormCreateNews>({
		URI: post?.image.URI ?? null,
		file: null
	});

	const dispatch = useDispatch();

	const output = useMemo(() => {
		if(!post)
			return undefined;

		const dirtyHtml = generateHTML(
			{
				content: post.content,
				type: "doc"
			}, [StarterKit]
		);

		const html = sanitizeHtml(dirtyHtml);
		return html;
	}, [post]);

	const editor = useEditor({
		extensions: [StarterKit],
		content: output ?? defaultHTMLText,
		editorProps: {
			attributes: {
				class: "w-[80vw] max-w-[45rem] border-[1px] border-primaryColor-640 rounded-md p-2 outline-none"
			}
		}
	});

	async function handleSubmit(form: ICreatePostForm) {
		setIsLoading(true);

		const content = editor?.getJSON()?.content?.map((item) => {
			return JSON.stringify(item);
		}) ?? [];

		if(
			!post && (
				!image.URI || 
				!image.file || 
				content.length <= 0
			)
		)
			return;

		const newPost = new Post({
			name: form.name,
			description: form.description,
			image: {
				URI: String(post?.image?.URI ?? image.URI),
				file: image.file
			},
			content
		});
  
		post 
			? await Application
				.postFlow
				.update
				.exec({ 
					access_token: String(accessToken.rawToken),
					post: newPost,
					id: post.id
				})
				.then(() => {
					router.push(`/post/${post.id}`);
				})
				.catch((err) => {
					setError(true);
					if(
						err instanceof PostError && 
						err.message === "Could not upload image"
					)
						router.push(`/post/${err.postId}`);
				})
				.finally(() => {
					setIsLoading(false);
				})
			: await Application
				.postFlow
				.create
				.exec({ 
					access_token: String(accessToken.rawToken), 
					post: newPost 
				})
				.then((data) => {
					router.push(`/post/${data.id}`);
				})
				.catch((err) => {
					setError(true);
					if(
						err instanceof PostError && 
						err.message === "Could not upload image"
					)
						router.push(`/post/${err.postId}`);
				})
				.finally(() => {
					setIsLoading(false);
				});
	}

	async function handleDeletion(id: string) {
		setIsLoading(true);

		await Application
			.postFlow
			.delete
			.exec({ id, access_token: rawToken })
			.then(() => router.push("/news"))
			.catch(() => setError(true))
			.finally(() => setIsLoading(false));
	}

	useEffect(() => {
		if(userContainerData.userData.level <= 0)
			router.push("/login");

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
	}, [dispatch, rawToken, router, userContainerData]);

	return (
		<>
			<Head>
				<title>ConSciência - criar notícia</title>
				<meta
					name="description"
					content="Crie uma notícia para o seu maravilho blog."
				/>
			</Head>
			<div className="grid w-screen min-h-[100vh]">
				<Header/>
				<NotificationBalloon
					activate={error}
					setActivate={setError}
					title={"ERRO:"}
					type="error"
					text={"Erro no processamento"}
					className="mt-20"
				/>
				{
					editor
						? <main className="flex flex-col gap-8 place-self-center">
							<CreateNewsMainFlow
								isError={error}
								isLoading={isLoading}
								editor={editor}
								postId={post?.id}
								currentForm={
									post ? {
										name: post.name,
										description: post.description
									} : undefined
								}
								image={image}
								setImage={setImage}
								handleSubmit={handleSubmit}
								handleDeletion={handleDeletion}
							/> 
						</main>
						: <div className="grid w-screen h-screen place-content-center place-items-center place-self-center prose prose-slate">
							<CircleNotch 
								width={150} 
								height={150} 
								className="animate-spin" 
							/>
							<h1 className="text-2xl">
								Carregando...
							</h1>
						</div>
				}
				<Footer/>
			</div>
		</>
	);
}

export async function getServerSideProps(
	ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<
  ITokens & { 
    post?: Replace<
      IPostObject,
      { content: JSONContent[] }
    > & { id: string }
  }
>> {
	try {
		const { rawToken, userData } = await refreshAllTokens(ctx);	

		const postId = ctx.query?.postId instanceof Array
			? ctx.query?.postId[0]
			: undefined;

		if(typeof postId === "string") {
			const rawPost = await Application
				.postFlow
				.get
				.exec({ id: postId });

			if(!rawPost)
				return {
					props: {
						userContainerData: userData,
						rawToken
					},
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

			return {
				props: { 
					post: {
						...post,
						id: postId,
						name,
						content
					},
					userContainerData: userData,
					rawToken
				},
			};
		}

		return {
			props: { 
				userContainerData: userData,
				rawToken
			},
		};
	} catch (err) {
		return {
			redirect: {
				permanent: false,
				destination: "/login"
			}
		};
	}
}
