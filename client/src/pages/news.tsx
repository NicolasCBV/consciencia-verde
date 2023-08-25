import { 
  GetServerSidePropsContext, 
  InferGetServerSidePropsType 
} from "next";

import { GetPosts } from "../../service/shorthandsCalls/posts/GetPosts";

import { Notice } from "../../components/SeeNews/Notice";
import { Footer } from "../../components/common/Footer";
import { Header } from "../../components/common/Header";

export interface ResDataInterface {
    id: string;
    name: string;
    content: string;
    imageUrl: string | null;
    description: string;
    creatorId: string;
    createdAt: string;
    updatedAt: string;
};

function News ({ post }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Header/>
        <main className="grid h-[100vh] gap-[50vh]">
          <Notice dataApi={post.content.data}/>
          <Footer/> 
        </main>
    </div>
  )
}

export default News;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const post = await GetPosts();
  
  return {
    props: {
      post
    }
  }
}
