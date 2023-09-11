import { IFormCreateNews } from "@/pages/editor/[[...postId]]";
import { Editor, EditorContent } from "@tiptap/react";
import { Envelope, NewspaperClipping, Trash } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../common/Button";
import { ImageUpdate } from "../common/ImageUpdate";
import { BubbleOptionsMenu } from "./BubbleOptionsMenu";
import { OptionsMenu } from "./Menu";
import { PostForm } from "./PostForm";

interface IProps {
  isError: boolean;
  isLoading: boolean;
  editor: Editor;
  postId?: string;
  currentForm?: ICreatePostForm;
  image: IFormCreateNews;
  setImage: Dispatch<SetStateAction<IFormCreateNews>>;
  handleSubmit: (form: ICreatePostForm) => void;
  handleDeletion: (id: string) => void;
}

export interface ICreatePostForm {
  name: string;
  description: string;
}

export function CreateNewsMainFlow({ 
	isError,
	editor,
	postId,
	currentForm,
	image,
	setImage,
	isLoading,
	handleSubmit,
	handleDeletion
}: IProps) {
	const [ form, setForm ] = useState({
		name: currentForm?.name ?? "",
		description: currentForm?.description ?? ""
	});

	return (
		<>
			<OptionsMenu editor={editor} />
			<ImageUpdate
				icon={NewspaperClipping}
				image={image.URI}
				action={({ image, file }) => {
					setImage({ URI: image, file });
				}}
			/>
			<PostForm form={form} setForm={setForm} /> 

			<div>
				<EditorContent editor={editor} />
				<BubbleOptionsMenu editor={editor} />
			</div>

			<div className={`flex ${
				postId 
					? "justify-between w-full"
					: ""
			}`}>
				<Button
					disabled={
						isError ||
						isLoading ||
						((!image.URI || !image.file) && !currentForm) ||
						!form.name && form.name.length < 4 ||
						!form.description && form.description.length < 4
					}
					name="Enviar"
					onClick={() => handleSubmit(form)}
					iconData={{
						Icon: Envelope,
						pos: "right",
						loading: isLoading
					}}
				/>

				{
					postId &&
						<Button
							disabled={isError || isLoading}
							onClick={() => {
								handleDeletion(postId);
							}}
							className="h-[8vh] max-h-[2rem] px-3 border-[2px] border-red-500 rounded-md bg-transparent hover:bg-red-300 text-slate-900"
							name="Deletar"
							iconData={{
								pos: "right",
								Icon: Trash,
								loading: isLoading
							}}
						/>
				}
			</div>
		</>
	);
}
