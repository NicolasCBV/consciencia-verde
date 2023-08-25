import { CircleNotch } from "phosphor-react";
import { ComponentProps, ElementType } from "react"

interface ButtonPropsInterface extends ComponentProps<"button"> {
  name: string;
  iconData?: {
    Icon: ElementType;
    pos: "left" | "right";
    loading: boolean;
  };
}

export function Button({ 
  name,
  iconData,
  ...props
}: ButtonPropsInterface) {
  return (
    <button
     className={`flex gap-[4px] bg-green-600 hover:bg-green-500 items-center place-self-center ${iconData ? "pl-3 pr-2" : "px-3"} py-1  rounded-md h-[8vh] max-h-[2rem] duration-200 text-white ${props.disabled ? "opacity-40" : "opacity-100"} ${props.className ?? ""}`}
     {...props}
    >
      {
        iconData?.pos === "left"
          ? <>
            {
              iconData.loading ?
                <CircleNotch 
                  width={35} 
                  className="animate-spin" 
                  weight="bold"
                />
                : <iconData.Icon width={35} weight="bold"/>
            }
            {name}
          </>
          : iconData?.pos === "right" ? <>
            {name}
            {
              iconData.loading ?
                <CircleNotch 
                  width={35} 
                  className="animate-spin" 
                  weight="bold"
                />
                : <iconData.Icon width={35} weight="bold"/>
            }
          </>
            : <>{name}</>
      }
    </button>
  )
}
