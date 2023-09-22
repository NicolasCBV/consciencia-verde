import { Editor } from "@tiptap/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MenuOption } from "./MenuOption";
import { 
	Gear, 
	ListBullets, 
	ListNumbers, 
	Quotes, 
	TextAa, 
	TextHOne, 
	TextHThree, 
	TextHTwo 
} from "phosphor-react";

interface IProps {
  editor: Editor;
}

export function OptionsMenu({ editor }: IProps) {
	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button className="h-[8vh] max-h-[2rem] fixed z-[2] left-[85%] outline-none">
					<Gear 
						className="bg-green-500 circle p-2"
						width={40}
						height={40}
					/> 
				</button>  
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content className="py-2 mt-4 mr-2 px-1 max-w-[26rem] bg-zinc-700 shadow-xl border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex flex-col">
					<DropdownMenu.Item className="outline-none">          
						<MenuOption 
							name="Texto"
							description="Comece a escrever textos."
							icon={TextAa}
							onClick={() => {
								editor.chain().setParagraph().run();
							}}
						/>
					</DropdownMenu.Item>

					<DropdownMenu.Item className="outline-none">
						<MenuOption
							name="Título 1"
							description="Catégoria de título 1."
							icon={TextHOne}
							onClick={() => {
								editor.chain().setHeading({level: 1}).run();
							}}
						/>
					</DropdownMenu.Item>

					<DropdownMenu.Item className="outline-none">
						<MenuOption
							name="Título 2"
							description="Catégoria de título 2."
							icon={TextHTwo}
							onClick={() => {
								editor.chain().setHeading({ level: 2 }).run();
							}}
						/>
					</DropdownMenu.Item>

					<DropdownMenu.Item className="outline-none">
						<MenuOption
							name="Título 3"
							description="Catégoria de título 3."
							icon={TextHThree}
							onClick={() => {
								editor.chain().focus().toggleHeading({level: 3}).run();
							}}
						/>
					</DropdownMenu.Item>

					<DropdownMenu.Item className="outline-none">
						<MenuOption
							name="Lista ordenada"
							description="Adicionar lista ordenada."
							icon={ListNumbers}
							onClick={() => {
								editor.chain().focus().toggleOrderedList().run();
							}}
						/>
					</DropdownMenu.Item>

					<DropdownMenu.Item className="outline-none">
						<MenuOption
							name="Lista de marcadores"
							description="Adicionar lista de marcadores."
							icon={ListBullets}
							onClick={() => {
								editor.chain().focus().toggleBulletList().run();
							}}
						/>
					</DropdownMenu.Item> 

					<DropdownMenu.Item className="outline-none">
						<MenuOption
							name="Citação"
							description="Adicionar uma citação."
							icon={Quotes}
							onClick={() => {
								editor.chain().focus().toggleBlockquote().run();
							}}
						/>
					</DropdownMenu.Item>

				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}
