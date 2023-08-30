import { IPostObject } from "@/@core/infra/mappers/post"
import { Card } from "./Card";
import { v4 as uuid } from "uuid";
import { PagesHandler } from "./Pages";
import { IPagination, ISearchArgs } from "@/pages/news";

interface IProps {
  pages?: IPagination;
  search: (input: ISearchArgs) => void;
  posts: {
    id: string;
    post: IPostObject;
  }[];
}

export function NewsList({ pages, search, posts }: IProps) {
  return (
    <div id="post-container" className="not-prose w-[80vw] max-w-[20rem] min-h-[50vh]">
      <ul className="grid gap-8 border-t-[1px] border-slate-900 place-content-center py-8">
        {
          posts.map((item) => {
            return (
              <Card 
                id={item.id} 
                post={item.post} 
                key={`${uuid()}-card`}
              />
            )
          })
        }
      </ul>

      {
        pages && pages.quantity > 0 &&
          <PagesHandler 
            search={search} 
            pages={pages}
          /> 
      }
    </div>
  )
}
