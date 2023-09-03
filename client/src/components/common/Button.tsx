import Link from "next/link";
import { CircleNotch } from "phosphor-react";
import { ComponentProps, ElementType } from "react"

interface ButtonPropsInterface extends ComponentProps<"button"> {
  name: string;
  href?: string;
  iconData?: {
    Icon: ElementType;
    pos: "left" | "right";
    loading?: boolean;
  };
}

interface IContentProps {
  data: Omit<ButtonPropsInterface, "href">;
}

function Content({ data }: IContentProps) {
  return (
    <>
      {
        data.iconData?.pos === "left"
          ? <>
            {
              data.iconData.loading ?
                <CircleNotch 
                  width={35} 
                  className="animate-spin" 
                  weight="bold"
                />
                : <data.iconData.Icon width={35} weight="bold"/>
            }
            {data.name}
          </>
          : data.iconData?.pos === "right" ? <>
            {data.name}
            {
              data.iconData.loading ?
                <CircleNotch 
                  width={35} 
                  className="animate-spin" 
                  weight="bold"
                />
                : <data.iconData.Icon width={35} weight="bold"/>
            }
          </>
            : <>{data.name}</>
      }
    </>
  )
}

export function Button({
  href,
  iconData,
  ...propsContent
}: ButtonPropsInterface) {
  const { className, ...props } = propsContent;
  return (
    <button
      className={`not-prose flex gap-[2px] bg-green-600 hover:bg-green-500 items-center place-self-center py-1 ${ !href ? "px-2" : ""} rounded-md h-[2rem] duration-200 text-white ${props.disabled ? "opacity-40" : "opacity-100"} ${className ?? ""}`}
      {...props}
    > 
      {
        href
          ? <Link className={`flex w-full max-h-[2re] h-[8vh] items-center place-self-center px-3`} href={href}>
              <Content data={{ iconData, ...props }}/>  
            </Link>
          : <Content data={{ iconData, ...props }}/>  
      }
    </button>
  )
}
