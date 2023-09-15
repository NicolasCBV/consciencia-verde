import { Article, Tag } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";
import { Input } from "../common/Input";
import { ICreatePostForm } from "./CreateNewsMainFlow";

interface IProps {
  form: ICreatePostForm;
  setForm: Dispatch<SetStateAction<ICreatePostForm>>;
}

export function PostForm({ form, setForm }: IProps) {
	return (
		<div className="grid text-center gap-4 tablet:flex tablet:justify-between tablet:w-full">
			<div className="grid tablet:text-start gap-2">
				<label htmlFor="post-name" className="text-xl">
					Nome
				</label>
				<Input
					isActiveClasses="bg-green-500"
					divClasses="border-green-600 border-[1px]"
					type="text"
					name="name"
					minLength={4}
					maxLength={29}
					value={form.name}
					onChange={(event) => {
						setForm((item) => ({
							...item,
							name: event.target.value
						}));
					}}
					icon={{ content: Tag }}
					placeholder="Insira um nome"
				/>
			</div>

			<div className="grid tablet:text-end gap-2">
				<label htmlFor="post-description" className="text-xl">
					Descrição
				</label>
				<Input
					id="post-description"
					isActiveClasses="bg-green-500"
					divClasses="border-green-600 border-[1px]"
					type="text"
					name="description"
					minLength={4}
					maxLength={49}
					value={form.description}
					onChange={(event) => {
						setForm((item) => ({
							...item,
							description: event.target.value
						}));
					}}
					icon={{ content: Article }}
					placeholder="Insira uma descrição" 
				/>
			</div>
		</div>
	);
}
