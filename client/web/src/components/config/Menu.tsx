import { Dispatch, ReactNode, SetStateAction } from "react";
import { v4 as uuid } from "uuid";
import { Newspaper, Pencil, SignOut, Trash } from "phosphor-react";
import { Option } from "./Option";
import { useRouter } from "next/router";
import { IDisponibleStages } from "@/pages/config";
import { useStoreHook } from "@/hooks";

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
	const auth = useStoreHook((item) => {
		return item.accessToken.userContainerData;
	});

	const height = 30;
	const width = 30;

	const options = [
		{
			name: "Posts e notícias",
			description: auth.userData.level > 0
				? "Vamos ver o que você já criou?"
				: "Vamos ver algumas notícias?",
			state: false,
			icon: <Newspaper width={width} height={height}/>,
			action: {
				href: "/news"
			}
		},
		{
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
		{
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
	];

	if(auth.userData.level > 0)
		options.unshift({
			name: "Criar um post",
			description: "Que tal criar um novo post?!",
			state: false,
			icon: <Pencil width={width} height={height}/>,
			action: {
				href: "/editor"
			}
		});

	return (
		<ul className="w-[80vw] max-w-[35rem] grid gap-4 justify-items-center desktop:grid-cols-2 desktop:max-w-[55rem]"> 
			{
				options.map((value: IOption) => {
					return <Option key={uuid()} item={value}/>;
				})
			}
		</ul>
	);
}
