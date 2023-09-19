import { useRouter } from "next/router";
import { useState, FormEvent } from "react";

import { Header } from "../components/common/Header";
import { Input } from "../components/common/Input";
import { NotificationBalloon } from "../components/common/NotificationBalloon";
import { Button } from "../components/common/Button";

import { Key, Check, LockKey } from "phosphor-react";
import { Application } from "@/@core/application/container";
import Head from "next/head";

function Reset() {
	const routes = useRouter();

	const [ isError, setIsError ] = useState<boolean>(false);
	const [ isLoading, setIsLoading ] = useState<boolean>(false);

	const [ pass, setPass ] = useState<string>("");
	const [ checkPass, setCheckPass ] = useState<string>("");

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		setIsLoading(true);

		await Application
			.forgotPasswordFlow
			.end
			.exec({
				forgot_token: String(routes.query?.token),
				password: pass
			})
			.then(() => {
				routes.push("/login");
			})
			.catch(() => setIsError(true));

		setIsLoading(false);
	}
	return (
		<>
			<Head>
				<title>ConSciência - esqueceu a senha</title>
				<meta
					name="description"
					content="Não se preocupe, iremos recuperar a sua conta."
				/>
			</Head>
			<div className="grid min-h-screen w-screen">
				<NotificationBalloon 
					activate={isError}
					setActivate={setIsError}
					title="ERRO:"
					text="Verifique os dados inseridos e tenha a certeza de que não se passaram 2 minutos"
					type="error"
					className="mt-16"
				/>
				<Header/>
				<main className="grid h-[100vh]">
					<form className="grid place-items-center place-self-center bg-primaryColor-550 py-8 px-4 text-center relative rounded-md shadow-2xl duration-200 w-[70vw] max-w-[20rem] gap-2 prose prose-slate mini:w-full">
						<h1 
							className="text-2xl text-white mb-4"
						>
                Defina uma nova senha
						</h1>
						<Input
							isActiveClasses="bg-primaryColor-750"
							name="password"
							type="password"
							placeholder="Insira uma nova senha"
							onChange={(event) => setPass(event.target.value)}
							value={pass}
							minLength={1}
							icon={{ content: Key }}
						/>
						<Input
							isActiveClasses="bg-primaryColor-750"
							name="check-password"
							type="password"
							placeholder="Insira novamente a senha"
							onChange={(event) => setCheckPass(event.target.value)}
							value={checkPass}
							minLength={1}
							icon={{ content: LockKey }}
						/>

						<div className="flex justify-between w-full place-content-center mt-4 mini:gap-2 mini:flex-col">
							<Button
								name="Definir"
								type="submit"
								color="green"
								iconData={{
									Icon: Check,
									pos: "right",
									loading: isLoading
								}}
								disabled={
									isError ||
									!pass.length || 
									pass !== checkPass || 
									isLoading
								}
								onClick={handleSubmit}
							/>
							<Button
								href="/login"
								type="button"
								className="not-prose grid text-slate-900 place-self-center h-[1.2rem] place-content-center rounded-md bg-zinc-200/20 hover:bg-zinc-200/40 hover:text-slate-700 duration-200"
								name="Voltar"
							/>  
						</div>
					</form>
				</main>
			</div>
		</>
	);
}

export default Reset;
