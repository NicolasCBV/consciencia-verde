import { IPostObject } from "@/@core/infra/mappers/post"
import Image from "next/image";
import Link from "next/link";
import { Camera } from "phosphor-react";
import { v4 as uuid } from "uuid";

interface IProps {
  id: string;
  post: IPostObject;
}

export function Card({ post, id }: IProps) {
  return (
    <li className="grid">
      <Link 
        className="flex flex-col justify-start w-[80vw] max-w-[18rem] h-[21rem] border-[1px] border-slate-900/20 rounded-r-lg prose prose-slate hover:bg-slate-200 duration-200 cursor-pointer micro:w-screen micro:w-screen micro:h-auto" 
        href={`post/${id}`}
      >
        {
          !post.image.URI
            ? <Camera
                width={100}
                height={100}
                weight="thin"
                className="grid h-[11.5rem] w-full object-cover relative object-fit place-self-center place-content-center self-start"
              />
            : <Image
                key={`${uuid()}-image`}
                className="grid h-[11.5rem] w-full object-cover relative object-fit place-self-center self-start"  
                width={100}
                height={100}
                src={post.image.URI}
                alt="Imagem do post."
              />
        }

        <div id="post-text" className="grid w-full gap-2 place-self-start justify-start p-4 text-start break-all">
          <h1 className="font-bold text-xl mini:text-[1rem]">
            {post.name}
          </h1>
          <p>
            {post.description}
          </p>
        </div>
      </Link>
    </li>
  )
}
