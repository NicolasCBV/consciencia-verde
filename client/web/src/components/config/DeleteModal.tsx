import { Application } from "@/@core/application/container";
import { useStoreHook } from "@/hooks";
import { IDisponibleStages } from "@/pages/config";
import { useRouter } from "next/router";
import { ArrowUDownLeft, Trash, Warning } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

interface IProps {
  setError: Dispatch<SetStateAction<boolean>>;
  setStages: Dispatch<SetStateAction<IDisponibleStages>>;
}

export function DeleteModal({ setError, setStages }: IProps) {
	const router = useRouter();
	const auth = useStoreHook(({ accessToken }) => accessToken.rawToken);
	const [ input, setInput ] = useState("");

	async function handleSubmit() {
		if(input !== "Sim, eu compreendo isto")
			return;

		await Application
			.deleteUserFlow
			.delete
			.exec({ access_token: String(auth) })
			.catch(() => setError(true));

		router.push("/login");
	}
  
	return (
		<div className="flex place-self-center place-content-center w-screen z-[2] absolute">
			<div className="grid place-items-center place-self-center border-[1px] border-primaryColor-750 py-8 px-8 text-center relative rounded-md shadow-2xl duration-200 max-h-[37em] w-[80vw] max-w-[25rem] gap-4 prose prose-slate micro:w-screen micro:max-h-screen">
				<h1 className="text-2xl text-red-500 mb-0">
          DELETAR CONTA
				</h1>
				<p className="my-0">
          Você tem certeza de que deseja deletar a sua conta? Ao realizar esta ação, a sua conta se tornará irrecuperável!
				</p>
				<p className="my-0">
          Digite: &quot;Sim, eu compreendo isto&quot;
				</p>
				<Input
					isActiveClasses="bg-red-400"
					divClasses="border-red-500 border-2"
					name="Confirmation"
					placeholder="Insira a frase aqui"
					icon={{ content: Warning }}
					onChange={(event) => {
						setInput(event.target.value);
					}}
					color="primaryColor"
					type="text"
				/>
				<div className="flex w-full justify-between mini:flex-col mini:gap-4">
					<Button
						name="Deletar"
						iconData={{
							pos: "right",
							Icon: Trash
						}}
						disabled={input !== "Sim, eu compreendo isto"}
						className="h-[8vh] max-h-[2rem] px-3 border-[2px] border-red-500 rounded-md bg-transparent hover:bg-red-300 text-slate-900"
						onClick={handleSubmit}
					/>  
					<Button
						name="Voltar"
						color="green"
						iconData={{
							pos: "right",
							Icon: ArrowUDownLeft
						}}
						onClick={() => {
							setStages(() => ({
								isEditing: false,
								isDeleting: false
							}));
						}}
					/>
				</div>
			</div>
		</div>
	);
}
