import { 
  useState, 
  CSSProperties
} from "react";

import Link from "next/link";
import { useRouter } from 'next/router';

import { Leaf, List, X } from "phosphor-react";

import { useSpring, animated, useTransition } from "react-spring";
import { useStoreHook } from "../../hooks";

export function Header(){
  const routes = useRouter();
  const token = useStoreHook((res) => res.accessToken);
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);

  const propsStyleHeader: CSSProperties = {
    height: "5vh"
  };
  const [ headerStyle, setHeaderStyle ] = useSpring(() => (propsStyleHeader));

  const transitionMenu = useTransition(isMenuActive, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    reverse: isMenuActive
  });

  return (
    <animated.header 
      id="header"
      style={headerStyle}
      className={"grid grid- grid-rows-[5vh,1fr] items-center pt-4 pb-2 bg-primaryColor-600 fixed w-[100vw] z-[10000]"}
    >
      <div 
        id="menu"
        className={"flex justify-between px-8 py-2 bg-primaryColor-600 w-[100vw] mini:px-2"}
      >
        <Link href="/" className="flex gap-2">
          <h1 className="bigTitle font-bold text-3xl text-white micro:text-xl">
            ConSciência
          </h1>
          <Leaf
            className="text-white"
            weight="bold"
            width={30}
            height={30}
          />
        </Link>
        {
          !isMenuActive
          ? <button
              onClick={()=>{
                setHeaderStyle.start({
                  height: "100vh"
                });
                return setIsMenuActive(true);
              }}
            >
              <List 
                width={30}
                height={30}
                color="white"
              />
            </button>
          : <button
              onClick={()=>{
                setHeaderStyle.start({
                  height: "5vh"
                })
                return setIsMenuActive(false);
              }}
            >
              <X 
                width={30}
                height={30}
                color="white"
              />
            </button>
        }
        
      </div>
      {
        transitionMenu((styles, item) => (
          item && (
            <animated.ul 
              id="list" 
              className={"grid text-white text-xl place-self-center gap-6 text-center"}
              style={styles} 
            >
              <li 
                className="hover:text-slate-500 duration-200"
                onClick={() => {
                  setHeaderStyle.start({
                    height: "5vh"
                  });
                  setIsMenuActive(false);
                  if(routes.asPath === "/")
                    routes.reload();
                }}
              >
                {
                  routes.asPath === "/"
                  ? <p className="hover:cursor-pointer">Home</p>
                  : <Link href="/">Home</Link>
                }
              </li>
              <li 
                className="hover:text-slate-500 duration-200"
                onClick={() => {
                  setHeaderStyle.start({
                    height: "5vh"
                  });
                  setIsMenuActive(false);
                  if(routes.asPath === "/news")
                    routes.reload();
                }}
              >
                {
                  routes.asPath === "/news"
                  ? <p className="hover:cursor-pointer">Notícias</p>
                  : <Link href="/news">Notícias</Link>
                }
              </li>
              {
                token && (
                  <li 
                    className="hover:text-slate-500 duration-200"
                    onClick={() => {
                      setHeaderStyle.start({
                        height: "5vh"
                      });
                      setIsMenuActive(false);
                      if(routes.asPath === "/config")
                        routes.reload();
                    }}
                  >
                    {
                      routes.asPath === "/config"
                      ? <p className="hover:cursor-pointer">Configurações</p>
                      : <Link href="/config">Configurações</Link>
                    }
                  </li>
                )
              }
              <li 
                className="hover:text-slate-500 duration-200"
                onClick={() => {
                  setHeaderStyle.start({
                    height: "5vh"
                  });
                  setIsMenuActive(false);
                  if(routes.asPath === "/login")
                    routes.reload();
                }}
              >
                {
                  routes.asPath === "/login"
                  ? <p className="hover:cursor-pointer">Cadastrar/login</p>
                  : <Link href="/login">Cadastrar/login</Link>
                }
              </li>
            </animated.ul>
          )
        ))
      }
    </animated.header>
  )
}
