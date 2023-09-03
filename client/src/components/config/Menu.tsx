import { Dispatch, ReactNode, SetStateAction } from "react";
import { v4 as uuid } from "uuid";
import { Newspaper, Pencil, SignOut, Trash } from "phosphor-react";
import { Option } from "./Option";
import { useRouter } from "next/router";
import { IDisponibleStages } from "@/pages/config";
import Link from "next/link";

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
    <ul className="w-[80vw] max-w-[35rem] grid gap-4 justify-items-center desktop:grid-cols-2 desktop:max-w-[55rem]"> 
      {
        Object.values(options).map((value: IOption) => {
          return <Option key={uuid()} item={value}/>;
        })
      }
    </ul>
  )
}
