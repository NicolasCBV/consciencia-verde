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
        className="flex justify-start gap-4 w-[80vw] max-w-[30rem] min-h-[5rem] border-[1px] border-slate-900 rounded-md prose prose-slate hover:bg-slate-200 duration-200 cursor-pointer" 
        href={`post/${id}`}
      >
        {
          !post.image.URI
            ? <Camera
                width={100}
                height={100}
                weight="thin"
                className="h-full w-1/4 bg-zinc-800 text-white"
              />
            : <Image
                key={`${uuid()}-image`}
                className="h-auto w-1/4 object-cover relative rounded-l-sm object-fit"  
                width={100}
                height={100}
                src={post.image.URI}
                alt="Imagem do post."
              />
        }

      <div id="post-text" className="grid w-full place-self-start justify-start pr-2 py-2 text-start mini:break-all">
          <h1 className="font-bold">
            {post.name}
          </h1>
          <p className="mini:hidden">
            {post.description}
          </p>
        </div>
      </Link>
    </li>
  )
}
