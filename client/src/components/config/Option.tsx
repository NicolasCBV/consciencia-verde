import { IOption } from "./Menu";

interface IProps {
  item: IOption;
}

export function Option({ item }: IProps) {
  return (
    <li>
      <button onClick={item.action.func} className="flex place-items-center text-start w-[80vw] max-w-[35rem] h-[40vh] max-h-[5.25rem] rounded-md border-[1px] border-primaryColor-640 hover:bg-zinc-300 duration-200 cursor-pointer">
        <i className="circle m-2 p-2 bg-zinc-800 text-white">
          {item.icon}
        </i>

        <span className="bg-zinc-200 w-[1px] h-full"/>

        <div className="ml-4 flex flex-col">
          <h2 className="text-xl">
            {item.name}
          </h2>
          <p>{item.description}</p>
        </div>
      </button>
    </li>
  );
}
