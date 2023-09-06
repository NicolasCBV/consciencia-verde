import { ComponentProps, ReactNode } from "react"

interface IProps extends ComponentProps<"button"> {
  children: ReactNode
}

export function BubbleButton(props: IProps) {
  return (
    <button className="px-1 py-2 text-zinc-200 text-sm flex items-center font-medium leading-none hover:text-zinc-50 hover:bg-zinc-600 duration-200 data-[active=true]:text-violet-400" {...props} />
  );
}
