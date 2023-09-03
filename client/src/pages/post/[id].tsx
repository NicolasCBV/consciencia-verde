import sanitizeHtml from "sanitize-html";

import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

import { Header } from "../../components/common/Header";
import { Footer } from "@/components/common/Footer";
import { Application } from "@/@core/application/container";
import { PostMapper } from "@/@core/infra/mappers/post";

import { generateHTML } from '@tiptap/html'

import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from "@tiptap/extension-heading";
import Code from "@tiptap/extension-code";
import { useMemo } from "react";
import { ContentContainer } from "@/components/post/contentContainer";
import Image from "next/image";
import CodeBlock from "@tiptap/extension-code-block";
import Head from "next/head";

function Post({
  post
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const output = useMemo(() => {
      const dirtyHtml = generateHTML(post.content, [
      Document,
      Paragraph,
      Heading,
      Code,
      CodeBlock,
      Text,
      Bold
    ]);

    const html = sanitizeHtml(dirtyHtml);
    return html;
  }, [post.content])

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
            <Image
              className="object-cover relative rounded-lg w-[80vw] max-w-[35rem] h-[57vh] max-h-[20rem] object-fit"
              width={300}
              height={300}
              src={post.image.URI}
              alt="Foto do post."
            />
          </div>
          
          <div className="grid w-[80vw] max-w-[45rem] flex flex-col my-8 prose prose-slate prose-a:text-blue-600 place-self-start prose-sm break-all mt-24">
            <h1>{post.name}</h1>
            <small>{post.createdAt}</small>
          </div>
          <ContentContainer output={output}/>
        </main>
        <Footer/>
      </div>
    </>
  )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const postId = String(ctx?.params?.id) ?? "";
  const rawPost = await Application
    .postFlow
    .get
    .exec({ id: postId })

  if(!rawPost)
    return {
      redirect: {
        permanent: true,
        destination: "/config"
      }
    }

  const { 
    content: rawContent, 
    name: rawName, 
    ...post 
  } = PostMapper.toObject(rawPost);

  const name = decodeURIComponent(rawName);
  const content = rawContent.map((item) => {
    return JSON.parse(item);
  })

  const json = {
    type: "doc",
    content
  }

  return {
    props: {
      post: {
        ...post,
        name,
        content: json
      }
    }
  }
}

export default Post;
