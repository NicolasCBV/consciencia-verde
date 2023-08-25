import { Input } from "../common/Input";
import { Key, Check, ArrowCircleLeft } from "phosphor-react";
import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { Button } from "../common/Button";
import { useRouter } from "next/router";
import { Application } from "@/@core/application/container";

interface IProps {
  email: string;
  isOnSigin: boolean;
  setVerificationStage: Dispatch<SetStateAction<boolean>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
}

export function VerificationStage({
  email,
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

    let resValidate, resLogin;
    resValidate = resLogin = 500;

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
    <div className="flex relative flex-col gap-2 place-items-center place-self-center bg-primaryColor-640 py-8 px-4 text-center relative rounded-md shadow-2xl duration-200 h-[28rem] max-h-[23.5rem] w-[70vw] max-w-[20rem]">
      <ArrowCircleLeft
        width={20}
        height={20}
        weight="bold"
        className="text-white absolute z-[1] place-self-start hover:text-zinc-300 cursor-pointer duration-200"
        onClick={() => {
          setVerificationStage(false);
        }}
      />
      <h1 className="text-2xl text-white mb-4">Verificação</h1>
      <p className=" text-white mb-4">
        Verifique sua identidade inserindo o código que enviamos em seu email.
        Caso não tenha recebido nada, cheque a caixa de spam.
      </p>
      <Input
        isActiveClasses="bg-primaryColor-520"
        name="Code"
        maxLength={7}
        minLength={7}
        value={code}
        onChange={(event) => {
          setCode(event.target.value);
        }}
        type="password"
        placeholder="Digite o código"
        icon={Key}
      />
      <div className="grid mt-2 gap-4">
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

        <button 
          className="text-white hover:text-zinc-300 duration-200"
          onClick={handleResubmit}
        >
          Reenviar
        </button>
      </div>
    </div>
  );
}
