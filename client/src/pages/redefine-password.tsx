import { useEffect, useState } from "react";

import { Header } from "../components/common/Header";
import { Input } from "../components/common/Input";
import { NotificationBalloon } from "../components/common/NotificationBalloon";
import { Button } from "../components/common/Button";

import { Envelope, Check } from "phosphor-react";
import Link from "next/link";
import { Application } from "@/@core/application/container";

function Reset() {
  const [ isError, setIsError ] = useState<boolean>(false);
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ time, setTime ] = useState<number>(0);

  const [ email, setEmail ] = useState<string>("");

  async function handleSubmit() {
    setIsLoading(true);

    await Application
      .forgotPasswordFlow
      .start
      .exec({ email })
      .catch(() => setIsError(true));

    setTime(30);
    setIsLoading(false);
  }

  useEffect(() => {
    if(time > 0) {
      const timerId = setTimeout(() => {
        return setTime((item) => item - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  }, [time])

  return (
    <div className="grid h-screen w-screen">
      <NotificationBalloon 
        activate={isError}
        setActivate={setIsError}
        title="ERRO:"
        text="Verifique os dados inseridos."
        type="error"
        className="mt-16"
      />
      <Header/>
      <main className="flex flex-col gap-2 text-center place-content-center h-screen">
        {
          time > 0 &&
          <p className="place-self-center w-[70vw] max-w-[20rem]">
            Aguarde {time} segundos para reenviar um email novamente.
          </p>
        }
        <form className="grid">
          <div className="grid place-items-center place-self-center bg-primaryColor-640 py-8 px-4 text-center relative rounded-md shadow-2xl duration-200 h-[60vh] max-h-[19.5rem] w-[70vw] max-w-[20rem] mini:h-[18rem] gap-2">
            <h1 
              className="text-2xl text-white mb-4"
            >
             Redefinição de senha 
            </h1>
            <p className="text-white">
              Insira seu email para verificarmos a sua identidade. Ao receber nossa mensagem por ele, não esqueça de verificar a caixa de spam.
            </p>
            <Input
              isActiveClasses="bg-primaryColor-520"
              name="email"
              type="text"
              placeholder="Insira seu email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              minLength={1}
              icon={Envelope}
            />

            <div className="flex w-full justify-between mini:grid mini:gap-2 mini:place-content-center">
              <Button
                name="Enviar"
                type="submit"
                color="green"
                iconData={{
                  Icon: Check,
                  pos: "right",
                  loading: isLoading
                }}
                disabled={
                  isError ||
                  email.length < 5 ||
                  email.length > 256 ||
                  isLoading ||
                  time > 0
                }
                onClick={ handleSubmit }
              />
              <Link href="/login">
                <button
                  type="button"
                  className="flex transition-colors place-items-center place-content-center h-[5vh] w-[18vh] max-w-[8rem] rounded-[5px] gap-2 text-white"
                >
                  Voltar
                </button>   
              </Link>
            </div>
          </div>
        </form>
      </main>
    </div>
  )
}

export default Reset;
