import { IFormProps } from "@/pages/login";
import { CSSProperties, Dispatch, SetStateAction } from "react";
import { animated } from "react-spring";
import { Input } from "../common/Input";
import { Envelope, Key, User as UserIcon } from "phosphor-react";


interface IProps {
  form: IFormProps;
  setForm: Dispatch<SetStateAction<IFormProps>>;
  style: CSSProperties
}

export function FormInputs({
	form,
	setForm,
	style
}: IProps) {
	return (
		<>
			<animated.div style={style}>
				<Input
					isActiveClasses="bg-primaryColor-750"
					type="text"
					name="name"
					minLength={2}
					maxLength={64}
					value={form.name}
					onChange={(event) => {
						setForm({
							name: event.target.value,
							email: form.email,
							password: form.password,
						});
					}}
					placeholder="Insira seu nome"
					icon={{ content: UserIcon}}
				/>
			</animated.div>
			<Input
				isActiveClasses="bg-primaryColor-750"
				type="email"
				name="email"
				maxLength={256}
				minLength={5}
				value={form.email}
				onChange={(event) => {
					setForm({
						name: form.name,
						email: event.target.value,
						password: form.password,
					});
				}}
				placeholder="Insira seu e-mail"
				icon={{ content: Envelope }}
			/>
			<Input
				isActiveClasses="bg-primaryColor-750"
				type="password"
				name="password"
				maxLength={256}
				minLength={6}
				value={form.password}
				onChange={(event) => {
					setForm({
						name: form.name,
						email: form.email,
						password: event.target.value,
					});
				}}
				placeholder="Insira sua senha"
				icon={{ content: Key }}
			/>
		</>
	);
}
