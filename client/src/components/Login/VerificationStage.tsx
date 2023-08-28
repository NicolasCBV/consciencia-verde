import { Input } from "../common/Input";
import { Key, Check, ArrowCircleLeft } from "phosphor-react";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "../common/Button";
import { useRouter } from "next/router";
import { Application } from "@/@core/application/container";

interface IProps {
  email: string;
  isOnSigin: boolean;
  nextRoute?: string;
  setVerificationStage: Dispatch<SetStateAction<boolean>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
}

export function VerificationStage({
  email,
  nextRoute,
  isOnSigin,
  setVerificationStage,
  setErrorMessage,
  setIsError,
  isError
}: IProps) {
  const router = useRouter();

  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleResubmit() {
    setIsLoading(true);

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

      setIsLoading(false);
  }

  async function handleSubmit() {
    setIsLoading(true);

    isOnSigin
      ? await Application
          .siginFlow
          .validate
          .exec({ email, code })
          .then(() => {
            router.push(nextRoute ?? "/config");
          })
          .catch(() => setIsError(true))
      : await Application
          .loginFlow
          .login
          .exec({ email, code }) 
          .then(() => {
            router.push(nextRoute ?? "/config");
          })
          .catch(() => setIsError(true));

    setIsLoading(false);
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.reload();
    }, 1000 * 60 *2);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <form className="flex relative flex-col place-items-center place-self-center bg-primaryColor-550 py-8 px-4 text-center relative rounded-md shadow-2xl duration-200 h-[20rem] w-[70vw] max-w-[20rem] prose prose-slate mini:w-full mini:h-[24rem]">
      <ArrowCircleLeft
        width={20}
        height={20}
        weight="bold"
        className="text-white absolute z-[1] place-self-start hover:text-zinc-300 cursor-pointer duration-200"
        onClick={() => {
          setVerificationStage(false);
        }}
      />
      <h1 className="text-2xl text-white">Verificação</h1>
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
            loading: isLoading
          }}
          type="submit"
          disabled={isLoading}
          onClick={handleSubmit}
        />

        <Button 
          name="Reenviar"
          className="not-prose grid text-slate-900 place-self-center h-[1.2rem] place-content-center rounded-md hover:border-green-500 hover:bg-none hover:text-slate-700 duration-200"
          onClick={handleResubmit}
        />      
      </div>
    </form>
  );
}
