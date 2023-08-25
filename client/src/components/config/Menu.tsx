import { Dispatch, ReactNode, SetStateAction } from "react";
import { Button } from "../common/Button";
import { v4 as uuid } from "uuid";
import { Newspaper, Pencil, SignOut, Trash } from "phosphor-react";
import { Option } from "./Option";
import { useRouter } from "next/router";
import { IDisponibleStages } from "@/pages/config";

interface IProps {
  setStages: Dispatch<SetStateAction<IDisponibleStages>>;
}

export interface IOption {
  name: string;
  description: string;
  state: boolean;
  icon: ReactNode;
  action: {
    func?: () => void;
    href?: string;
  };
}

export default function Menu({ setStages }: IProps) {
  const router = useRouter();

  const height = 30;
  const width = 30;

  const options = {
    makeDrafts: {
      name: "Criar um post",
      description: "Que tal criar um novo post?!",
      state: false,
      icon: <Pencil width={width} height={height}/>,
      action: {
        href: "/create-news"
      }
    },
    news: {
      name: "Posts e notícias",
      description: "Vamos ver o que você já fez?",
      state: false,
      icon: <Newspaper width={width} height={height}/>,
      action: {
        href: "/news"
      }
    },
    logout: {
      name: "Sair",
      description: "Desconectar da conta.",
      state: false,
      icon: <SignOut width={width} height={height}/>,
      action: {
        func: () => {
          router.push("/login");
        }
      }
    },
    deleteUser: {
      name: "Deletar conta",
      description: "Deletar a sua conta.",
      state: false,
      icon: <Trash width={width} height={height}/>,
      action: {
        func: () => {
          setStages(() => ({
            isEditing: false,
            isDeleting: true
          }));
        }
      }
    }
  };

  return (
    <ul className="grid tablet:grid-cols-2 gap-4"> 
      <Button
        name="Editar"
        onClick={() => {
          setStages(() => ({
            isEditing: true,
            isDeleting: false
          }))
        }}
      />

      {
        Object.values(options).map((value: IOption) => {
          const id = uuid();
          
          if(value.action.href)
            return (
                <li key={id}>
                  <a href={value.action.href}>
                    <button onClick={value.action.func} className="flex place-items-center text-start w-[80vw] max-w-[35rem] h-[40vh] max-h-[5.25rem] rounded-md border-[1px] border-primaryColor-640 hover:bg-zinc-300 duration-200 cursor-pointer">
                      <i className="circle m-2 p-2 bg-zinc-800 text-white">
                        {value.icon}
                      </i>

                      <span className="bg-zinc-200 w-[1px] h-full"/>

                      <div className="ml-4 flex flex-col">
                        <h2 className="text-xl">
                          {value.name}
                        </h2>
                        <p>{value.description}</p>
                      </div>
                    </button>
                  </a>
                </li>
            );

          return <Option key={id} item={value}/>;
        })
      }
    </ul>
  )
}
