import { Application } from "@/@core/application/container";
import { PostMapper } from "@/@core/infra/mappers/post";
import { Button } from "@/components/common/Button";
import { Footer } from "@/components/common/Footer";
import { Header } from "@/components/common/Header";
import { Input } from "@/components/common/Input";
import { NotificationBalloon } from "@/components/common/NotificationBalloon";
import { NewsList } from "@/components/news/NewsList";
import { NotFound } from "@/components/news/NotFound";
import { SearchBar } from "@/components/news/SearchBar";
import { InferGetServerSidePropsType } from "next";
import { CircleNotch, MagnifyingGlass, Prohibit, XCircle } from "phosphor-react";
import { useEffect, useState } from "react";

export interface IPagination {
  query: string;
  quantity: number;
  actualPage: number;
}

export interface ISearchArgs {
  query: string;
  page: number;
}

function News ({
  postsContent
}: InferGetServerSidePropsType<
  typeof getServerSideProps
>) {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState(false);
  const [searchPost, setSearchPost] = useState("");
  const [ pages, setPages ] = useState<IPagination | undefined>();
  const [ postsContentDinamic, setPostsContentDinamic ] = useState(postsContent);

  async function handleSearch(input: ISearchArgs) {
    setIsLoading(true);

    if(input.page === pages?.actualPage) {
      setIsLoading(false)
      return
    }

    try {
      const { pages: quantity, posts: rawPosts } = await Application
        .postFlow
        .search
        .exec(input)
    
      const posts = rawPosts.map((item) => {
        return {
          id: item.id,
          post: PostMapper.toObject(item.post)
        }
      })
   
      setPages({ 
        quantity, 
        query: input.query,
        actualPage: input.page
      });
      setPostsContentDinamic(posts);
    } catch(err) {
      setError(true)
    }

    setIsLoading(false);
    window.scrollTo({
      top: 0,
      behavior: "smooth" 
    });
  }
  useEffect(() => {
    if(searchPost.length <= 0) {
      setPostsContentDinamic(postsContent)
      setPages(undefined)
    }
  }, [searchPost])

  return (
    <div className="grid w-screen min-h-screen relative ">
      <Header/>
      <NotificationBalloon
        activate={error}
        setActivate={setError}
        title={"Error no processamento"}
        type="error"
        text={"Não foi possível enviar os dados"}
        className="mt-20"
      />
      <main className="grid place-self-center place-content-center content-start w-screen min-h-screen py-24 gap-8 prose prose-slate">
        <SearchBar 
          query={searchPost} 
          setQuery={setSearchPost}
          search={handleSearch}
          isLoading={isLoading}
        /> 

        {
          !pages && !isLoading &&
            <h1 className="text-slate-800 text-xl place-self-center mb-0">
              Mais recentes
            </h1>
        }
        {
          isLoading 
            ? <CircleNotch
                width={150}
                height={150}
                className="place-self-center animate-spin" 
              />
            : postsContentDinamic.length > 0
              ? <NewsList
                  search={handleSearch}
                  posts={postsContentDinamic} 
                  pages={pages}
                /> 
              : <NotFound/>
        }
      </main>
      <Footer/>
    </div>
  )
}

export default News;

export async function getServerSideProps() {
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

