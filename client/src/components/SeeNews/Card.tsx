import Image from 'next/image';

interface CardPropsInterface {
  image?: string | null;
  name?: string;
  desc?: string;
  createdAt?: string;
  who?: string;
}

export function Card({ 
  image,
  name,
  desc,
  createdAt,
  who
}: CardPropsInterface){

  return (
    <div className="flex max-w-[85vw] max-h-[8rem] gap-3 hover:bg-primaryColor-880 rounded-l-sm rounded-r-md border-2 border-primaryColor-600 duration-200 cursor-pointer">
      <Image
        src={image ? image : "https://images.unsplash.com/photo-1601226894292-90cb790557d2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80"}
        className="object-cover"
        width={150}
        height={124}
      />
      <div id="text" className="place-self-center gap-2 text-zinc-700 p-2 w-[75%]">
        <h1 className="word-break">
          {name}
        </h1>
        <p className="word-break text-xs laptop:text-base text-zinc-700">
          {desc}
        </p>
        <div id="info" className="flex justify-between text-zinc-700">
          <p className="word-break text-xs laptop:text-base">
            {createdAt}
          </p>
          <p className="word-break text-xs laptop:text-base text-zinc-700">
            {who}
          </p>
        </div>
      </div>
      <div className="bg-primaryColor-600 "></div>
    </div>
  )
}