import { Application } from "@/@core/application/container";
import { PostMapper } from "@/@core/infra/mappers/post";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { Input } from "@/components/common/Input";
import { NewsList } from "@/components/news/NewsList";
import { NotFound } from "@/components/news/NotFound";
import { 
  GetServerSidePropsContext, 
  InferGetServerSidePropsType 
} from "next";
import { MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";

function News ({
  postsContent
}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const [searchPost, setSearchPost] = useState("");
  const [ postsContentDinamic, setPostsContentDinamic ] = useState(postsContent);

  async function handleSearch(input: string) {
    const content = await Application
      .postFlow
      .search
      .exec({
        query: {
          name: input,
          content: input,
          description:input
        }  
      });
  
    const posts = content.map((item) => {
      return {
        id: item.id,
        post: PostMapper.toObject(item.post)
      }
    })
 
    setPostsContentDinamic(posts);
  }

  useEffect(() => {
    if(searchPost.length <= 0)
      setPostsContentDinamic(postsContent)
  }, [searchPost])

  return (
    <div className="grid w-screen min-h-screen relative ">
      <Header/>
      <main className="grid place-self-center place-content-center content-start w-screen min-h-screen py-24 gap-8 prose prose-slate">
        <Input 
          divClasses="border-primaryColor-600 border-[1px] place-self-center" 
          isActiveClasses="bg-primaryColor-750"
          type="text"
          name="name"
          minLength={1}
          value={searchPost}
          onChange={(event) => {
            setSearchPost(event.target.value);
          }}
          placeholder="Pesquisar por post"
          icon={{
            content: MagnifyingGlass,
            onClick: () => {
              handleSearch(searchPost);
            }
          }}
        />

        {
          postsContentDinamic.length > 0
            ? <NewsList posts={postsContentDinamic}/> 
            : <NotFound/>
        }

      </main>
      <Footer/>
    </div>
  )
}

export default News;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  try {
    const content = await Application
      .postFlow
      .pagination
      .exec({
        date: new Date(0),
        number: 10
      })

    return {
      props: {
        postsContent: content.map((item) => {
          return {
            id: item.id,
            post: PostMapper.toObject(item.post)
          }
        })
      }
    }
  } catch(err) {
    return {
      redirect: {
        permanent: true,
        destination: "/"
      }
    }
  }
}

