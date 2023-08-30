import { Dispatch, SetStateAction, useEffect } from "react";
import { useTransition, animated } from "react-spring";

interface Props {
  activate: boolean;
  setActivate: Dispatch<SetStateAction<boolean>>;
  title: string;
  text: string;
  type: "warn" | "error";
  className?: string;
}

export function NotificationBalloon ({ 
  activate,
  setActivate,
  title, 
  text,
  type,
  className
}: Props) {
  const transition = useTransition(activate, {
    from: {
      transform: "translateX(100%)" 
    },
    enter: {
      transform: "translateX(0%)" 
    },
    leave: {
      transform: "translateX(100%)" 
    },
    reverse: activate
  });

  useEffect(() => {
    if(activate)
      setTimeout(() => {
        setActivate(false);
      }, 5000);
  }, [ activate ]);


  const mainColors = {
    warn: "rgb(234 179 8)",
    error: "rgb(239 68 68)"
  } 

  return (
      transition((style, item) => {
        return item && (
          <animated.div 
            style={{
              ...style,
              justifySelf: "right"
            }}
            className={`flex fixed ${className} z-[100]`}
          >
            <span 
              style={{ background: mainColors[type] }}
              className={`w-[1rem] max-w-[5vw] rounded-tl-md rounded-bl-md`}
            />
            <div 
              id="text-content"
              className="grid bg-slate-100 shadow-lg py-2 pl-2 pr-4"
            >
              <h1 style={{ color: mainColors[type] }}>
                {title}
              </h1>
              <p>{text}</p>
            </div>
          </animated.div>
        )
      })
  )
}
