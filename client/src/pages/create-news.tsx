import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { lowlight } from 'lowlight'
import css from 'highlight.js/lib/languages/css'
import js from 'highlight.js/lib/languages/javascript'
import ts from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'

import { Header } from "../components/common/Header";
import StarterKit from '@tiptap/starter-kit'
import { useEditor } from '@tiptap/react'

import "highlight.js/styles/github.css"
import { useEffect, useState } from 'react'
import { CircleNotch } from 'phosphor-react'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { getTokens, ITokens } from './api/serverFunctions/getTokens'
import { useDispatch } from 'react-redux'
import { CHANGE_AUTH_TOKEN, IUserContainerData } from '@/features/auth/auth.slice'
import { defaultHTMLText } from '@/components/createNews/defaultHTMLText'
import { Application } from '@/@core/application/container'
import { Post } from '@/@core/domain/entities/post'
import { CreateNewsMainFlow, ICreatePostForm } from '@/components/createNews/CreateNewsMainFlow'
import { NotificationBalloon } from '@/components/common/NotificationBalloon'
import { Footer } from '@/components/common/Footer'
import { useRouter } from 'next/router'
import { useStoreHook } from '@/hooks'
import Head from 'next/head'

lowlight.registerLanguage("css", css);
lowlight.registerLanguage("html", html);
lowlight.registerLanguage("javascript", js);
lowlight.registerLanguage("typescript", ts);

export interface IFormCreateNews {
  URI: string | null;
  file: File | null;
}

export interface PostDataInterface {
  name: string;
  desc: string;
}

export default function CreateNews({ 
  rawToken,
  userContainerData 
}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const router = useRouter();
  const [ isLoading, setIsLoading ] = useState(false);

  const accessToken = useStoreHook(({ accessToken }) => accessToken)

  const [ error, setError ] = useState(false);

  const [ image, setImage ] = useState<IFormCreateNews>({
    URI: null,
    file: null
  });

  const dispatch = useDispatch();

  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({
        lowlight
      })
    ],
    content: defaultHTMLText,
    editorProps: {
      attributes: {
        class: "w-[80vw] border-[1px] border-primaryColor-640 rounded-md p-2 outline-none"
      }
    }
  });

  async function handleSubmit(form: ICreatePostForm) {
    setIsLoading(true);

    const content = editor?.getJSON()?.content?.map((item) => {
      return JSON.stringify(item);
    }) ?? []

    if(!image.URI || !image.file || content.length <= 0)
      return;

    const post = new Post({
      name: form.name,
      description: form.description,
      image: {
        URI: image.URI,
        file: image.file
      },
      content
    })
    
    await Application
      .postFlow
      .create
      .exec({ access_token: String(accessToken.rawToken), post })
      .then((data) => {
        router.push(`/post/${data.id}`);
      })
      .catch(() => setError(true))
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
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
      }))
    }, 1000 * 60 * 14);

    return () => {
      clearInterval(eventId);
    }
  },[]);

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
            ? <main className="flex flex-col gap-8 place-self-center align-content-center place-items-center py-24 w-[80vw] min-h-screen prose prose-slate prose-a:text-blue-600">
                <CreateNewsMainFlow
                  isError={error}
                  isLoading={isLoading}
                  editor={editor}
                  image={image}
                  setImage={setImage}
                  handleSubmit={handleSubmit}
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
  )
}

export async function getServerSideProps(
  ctx: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<ITokens>> {
  try {
    const refreshCookie = ctx.req.headers["set-cookie"];

    if(!refreshCookie) 
      throw new Error("Refresh cookie empty");

    const tokens = getTokens(ctx);
    ctx.res.setHeader("Set-Cookie", refreshCookie);

    return {
      props: { ...tokens },
    };
  } catch (err) {
    return {
      redirect: {
        permanent: true,
        destination: "/login"
      }
    }
  }
}
