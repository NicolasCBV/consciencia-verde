import { BubbleMenu } from "@tiptap/react";
import { Editor } from "@tiptap/react";
import { 
	TextBolder, 
	TextHOne, 
	TextHThree, 
	TextHTwo, 
	TextItalic, 
	TextStrikethrough 
} from "phosphor-react";
import { BubbleButton } from "./BubbleButton";

interface IProps {
  editor: Editor;
}

export function BubbleOptionsMenu({ editor }: IProps) {
	return (
		<BubbleMenu 
			className="max-w-[26rem] bg-zinc-700 shadow-xl border-zinc-600 shadow-black/20 rounded-lg overflow-hidden flex items-center divide-x divide-zinc-600" 
			editor={editor}
		>
			<BubbleButton
				data-active={editor.isActive("heading", { level: 1 })}
				onClick={() => {
					editor
						.chain()
						.focus()
						.toggleHeading({ level: 1 })
						.run();
				}}
			>
				<TextHOne width={35}/>
			</BubbleButton>

			<BubbleButton
				data-active={editor.isActive("heading", { level: 2 })}
				onClick={() => {
					editor
						.chain()
						.focus()
						.toggleHeading({ level: 2 })
						.run();
				}}
			>
				<TextHTwo width={35}/>
			</BubbleButton>

			<BubbleButton
				data-active={editor.isActive("heading", { level: 3 })}
				onClick={() => {
					editor
						.chain()
						.focus()
						.toggleHeading({ level: 3 })
						.run();
				}}
			>
				<TextHThree width={35}/>
			</BubbleButton>

			<BubbleButton
				data-active={editor.isActive("bold")}
				onClick={() => editor.chain().focus().toggleBold().run()}
			>
				<TextBolder width={35}/>
			</BubbleButton>

			<BubbleButton
				data-active={editor.isActive("italic")}
				onClick={() => editor.chain().focus().toggleItalic().run()}
			>
				<TextItalic width={35}/>
			</BubbleButton>

			<BubbleButton
				data-active={editor.isActive("strike")}
				onClick={() => editor.chain().focus().toggleStrike().run()}
			>
				<TextStrikethrough width={35}/>
			</BubbleButton>
		</BubbleMenu>
	);
}
