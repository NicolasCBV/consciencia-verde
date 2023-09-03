import Link from "next/link";
import { IOption } from "./Menu";

interface IProps {
  item: IOption;
}

function OptionWithLink({ item }: IProps) {
  return (
    <li>
      <Link href={item!.action!.href!}>
        <button onClick={item.action.func} className="flex py-2 place-items-center text-start w-[80vw] max-w-[35rem] h-[6rem] rounded-md border-[1px] border-primaryColor-640 hover:bg-zinc-300 duration-200 cursor-pointer desktop:w-[25rem] micro:flex-col">
          <i className="circle m-2 p-2 bg-zinc-800 text-white">
            {item.icon}
          </i>

          <span className="bg-zinc-200 w-[1px] h-full"/>

          <div className="ml-4 flex flex-col gap-2">
            <h2 className="text-xl font-bold">
              {item.name}
            </h2>
            <p>{item.description}</p>
          </div>
        </button>
      </Link>
    </li>
  )
}

export function Option({ item }: IProps) {
  if(item.action.href)
    return (
      <OptionWithLink
        item={{
          ...item,
          action: {
            func: item.action.func,
            href: item!.action!.href!
          }
        }}
      />
    )

  return (
    <li>
      <button onClick={item.action.func} className="flex py-2 place-items-center text-start w-[80vw] max-w-[35rem] h-[6rem] rounded-md border-[1px] border-primaryColor-640 hover:bg-zinc-300 duration-200 cursor-pointer desktop:w-[25rem] micro:flex-col">
        <i className="circle m-2 p-2 bg-zinc-800 text-white">
          {item.icon}
        </i>

        <span className="bg-zinc-200 w-[1px] h-full"/>

        <div className="ml-4 flex flex-col gap-2">
          <h2 className="text-xl font-bold">
            {item.name}
          </h2>
          <p>{item.description}</p>
        </div>
      </button>
    </li>
  );
}
