import { X } from "phosphor-react"
import { useRouter } from "next/router"
import { useTransition, animated } from "react-spring"

interface Props {
  warnModalStatus: boolean;
  setWarnModalStatus: (data: boolean) => void;
  children: React.ReactNode;
  setNextModal?: (data: boolean) => void;
  nextModal?: boolean;
  disableX?: boolean;
}

export function WarnModal({ 
  warnModalStatus, 
  setWarnModalStatus,
  children,
  setNextModal,
  nextModal,
  disableX
}: Props) {
  const router = useRouter()
  
  const transitionModal = useTransition(warnModalStatus, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    }
  })

  return (
    <div
      id="background"
      className="bg-[rgb(0,0,0,0.5)] w-[100vw] h-[100vh] grid place-self-center fixed z-50"
    >
      {
        transitionModal((style, item) => {
          return item && (
            <animated.div
              style={style}
              id="content"
              className={`py-4 px-5 bg-zinc-100 flex flex-col gap-2 place-self-center text-center max-w-[30rem] h-auto rounded-3xl align-center m-2`}
            >
              
              { disableX && 
                <X
                  height={"30"}
                  width={"30"}
                  className="relative top-[2.5rem] text-zinc-900 hover:cursor-pointer hover:text-zinc-700 duration-200"
                  onClick={() => {
                    if(nextModal !== undefined && setNextModal){
                      setWarnModalStatus(false);
                      return setNextModal(true);
                    }
                    return setWarnModalStatus(false)
                  }}
                />
              }
             { children }
            </animated.div>
          )
        })
      }
      
    </div>
  )
}