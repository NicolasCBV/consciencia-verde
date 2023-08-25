import { useEffect, useState } from "react";
import { ResDataInterface } from "../../pages/news";

import { SearchForPost } from "../../service/shorthandsCalls/posts/SearchForPost";

import { Input } from "../common/Input";
import { Card } from "./Card";
import { NotFound } from "./NotFound";

import { MagnifyingGlass } from "phosphor-react";

interface PropsInterface {
  dataApi: [ResDataInterface] | [];
}

export function Notice({ dataApi }: PropsInterface) {
  const [ isOnSearchMode, setIsOnSearchMode ] = useState<boolean>(false);
  const [ dataOnSearch, setDataOnSearch ] = useState<[ ResDataInterface ] | []>([]);
  const [ inputName, setInputName ] = useState<string>("");

  function makeListWithDataApi(item: ResDataInterface | undefined, index: number){
      return (
        
        <li key={index}>
          <a href={`/notice/post?id=${item?.id}`}>
            {
              item?.id
              ? <Card
                  image={item?.imageUrl}
                  name={item!.name}
                  desc={item!.description}
                  createdAt={item!.createdAt}
                  who={""}
                />
              : <Card/>
            }
          </a>
        </li>
      )
  }

  async function searchForContent(input: string) {
    const posts = await SearchForPost({input});

    if(posts)
      setDataOnSearch(posts.content.data);
    
    setIsOnSearchMode(true);
  }

  useEffect(() => {
    if (dataOnSearch[0])
      return setIsOnSearchMode(true);
  }, [ dataOnSearch ]);

  useEffect(() => {
    if(inputName.length <= 0) {
      setDataOnSearch([]);
      setIsOnSearchMode(false);
    }
  }, [ inputName ]);


  return (
    <div className="grid pt-24 place-self-center">
      <div id="wrapper" className="place-self-center">
        <form>
          <Input
            name="search"
            border={true}
            placeholder="Procurar por..."
            type="text"
            value={inputName}
            onChange={(event) => setInputName(event.target.value)}
            icon={
              <button 
                type="submit"
                onClick={async (event) => {
                  event.preventDefault();
                  if(inputName)
                    await searchForContent(inputName);
                }}
              >
                <MagnifyingGlass
                  className="hover:cursor-pointer"
                  width={35}
                />
              </button>
            }
          />
        </form>
      </div>
      
      {
        !isOnSearchMode
        ? (
          <ul className="grid py-8 pb-24 gap-8">
            {
              dataApi[0]
              ? dataApi.map((item, index) => makeListWithDataApi(item, index))
              : <NotFound/>
            }
          </ul>
        ) 
        : (
          <ul className="grid py-8 pb-24 gap-8">
            {
              dataOnSearch.length > 0
              ? dataOnSearch.map((item, index) => makeListWithDataApi(item, index))
              : <NotFound/>
            }
          </ul>
        )
      }
        
    </div>
  )
}
