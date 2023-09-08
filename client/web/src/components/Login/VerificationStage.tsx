import { Input } from "../common/Input";
import { Key, Check, ArrowCircleLeft } from "phosphor-react";
import { useState, Dispatch, SetStateAction, useEffect, FormEvent } from "react";
import { Button } from "../common/Button";
import { useRouter } from "next/router";
import { Application } from "@/@core/application/container";
import { IFormProps } from "@/pages/login";

interface IProps {
  email: string;
  isOnSigin: boolean;
  setIsOnSigin: Dispatch<SetStateAction<boolean>>;
  setVerificationStage: Dispatch<SetStateAction<boolean>>;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
  setForm: Dispatch<SetStateAction<IFormProps>>;
}

export function VerificationStage({
	email,
	isOnSigin,
	setIsOnSigin,
	setVerificationStage,
	setIsError,
	isError,
	setForm
}: IProps) {
	const router = useRouter();
    
	const [ time, setTime ] = useState<number>(30);
	const [code, setCode] = useState<string>("");
	const [isLoading, setIsLoading] = useState({
		sendOTP: false,
		resend: false
	});

	async function handleResubmit() {
		setIsLoading({
			sendOTP: false,
			resend: true
		});

		isOnSigin
			? await Application
				.siginFlow
				.launchOTP
				.exec({ email })
				.catch(() => setIsError(true))
			: await Application
				.loginFlow
				.launchOTP
				.exec({ email })
				.catch(() => setIsError(true));

		setTime(30);
		setIsLoading({
			sendOTP: false,
			resend: false
		});
	}

	async function handleSubmit(event: FormEvent) {
		event.preventDefault();

		setIsLoading({
			sendOTP: true,
			resend: false
		});

		isOnSigin
			? await Application
				.siginFlow
				.validate
				.exec({ email, code })
				.then(() => {
					router.push("/config");
				})
				.catch(() => setIsError(true))
			: await Application
				.loginFlow
				.login
				.exec({ email, code }) 
				.then(() => {
					router.push("/config");
				})
				.catch(() => setIsError(true));

		setIsLoading({
			resend: false,
			sendOTP: false
		});
	}

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			router.reload();
		}, 1000 * 60 * 1.5);

		return () => {
			clearTimeout(timeoutId);
		};
	});

	useEffect(() => {
		if(time > 0) {
			const timerId = setTimeout(() => {
				return setTime((item) => item - 1);
			}, 1000);

			return () => clearTimeout(timerId);
		}
	}, [time]);

	return (
		<>
			{
				time > 0 &&
					<p className="place-self-center w-[70vw] max-w-[20rem] text-center">
						Um email foi enviado para você. Aguarde {time} segundos para reenviar um email novamente.
					</p>
			}
			<form className="flex relative flex-col place-items-center place-self-center bg-primaryColor-550 py-8 px-4 text-center relative rounded-md shadow-2xl duration-200 h-[20rem] w-[70vw] max-w-[20rem] prose prose-slate mini:w-full mini:h-auto">
				<ArrowCircleLeft
					width={20}
					height={20}
					weight="bold"
					className="text-white absolute z-[1] place-self-start hover:text-zinc-300 cursor-pointer duration-200"
					onClick={() => {
						setForm({
							name: "",
							email: "",
							password: ""
						});
						setIsOnSigin(true);
						setVerificationStage(false);
					}}
				/>
				<h1 className="text-2xl text-white m-0 mt-4">
					Verificação
				</h1>
				<p className=" text-white">
					Verifique sua identidade inserindo o código que enviamos em seu email.
				</p>
				<Input
					isActiveClasses="bg-primaryColor-750"
					name="Code"
					maxLength={7}
					minLength={7}
					value={code}
					onChange={(event) => {
						setCode(event.target.value);
					}}
					type="password"
					placeholder="Digite o código"
					icon={{ content: Key }}
				/>
				<div className="flex w-full justify-between mt-2 gap-4 mt-6 mini:mt-4 mini:grid mini:place-content-center">
					<Button
						name="Entrar"
						iconData={{
							Icon: Check,
							pos: "right",
							loading: isLoading.sendOTP
						}}
						type="submit"
						disabled={
							isLoading.resend ||
							isLoading.sendOTP || 
							isError
						}
						onClick={handleSubmit}
					/>

					<Button
						disabled={
							isLoading.resend ||
							isLoading.sendOTP || 
							time > 0 ||
							isError
						}
						type="button"
						name="Reenviar"
						className="not-prose grid text-slate-900 place-self-center w-auto h-[1.2rem] place-content-center rounded-md bg-white/[0] hover:bg-white/[0] hover:text-slate-700 duration-200"
						onClick={handleResubmit}
					/>      
				</div>
			</form>
		</>
	);
}
