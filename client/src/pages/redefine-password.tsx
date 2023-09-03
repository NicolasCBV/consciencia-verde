import { useEffect, useState } from "react";

import { Header } from "../components/common/Header";
import { Input } from "../components/common/Input";
import { NotificationBalloon } from "../components/common/NotificationBalloon";
import { Button } from "../components/common/Button";

import { Envelope, Check } from "phosphor-react";
import { Application } from "@/@core/application/container";
import Head from "next/head";

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
      .then(() => {
        setTime(30);
      })
      .catch(() => setIsError(true));

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
    <>
      <Head>
        <title>ConSciência - esqueceu a senha</title>
        <meta
          name="description"
          content="Não se preocupe, iremos recuperar a sua conta."
        />
      </Head>
      <div className="grid min-h-screen w-screen place-content-center">
        <NotificationBalloon 
          activate={isError}
          setActivate={setIsError}
          title="ERRO:"
          text="Verifique seu email"
          type="error"
          className="mt-16"
        />
        <Header/>
        <main className="flex flex-col text-center justify-center min-h-screen prose prose-slate">
          {
            time > 0 &&
            <p className="place-self-center w-[70vw] max-w-[20rem]">
              Um email foi enviado para você. Aguarde {time} segundos para reenviar um email novamente. Você tem até 2 minutos após o envio para trocar a sua senha.
            </p>
          }
          <form className="grid place-items-center place-self-center bg-primaryColor-550 py-8 px-4 text-center relative rounded-md shadow-2xl duration-200 h-[15rem] w-[70vw] max-w-[20rem] mini:h-[15.5rem] mini:w-full">
            <h1 className="text-2xl text-white mb-4">
              Redefinição de senha 
            </h1>
            <Input
              isActiveClasses="bg-primaryColor-750"
              name="email"
              type="text"
              placeholder="Insira seu email"
              onChange={(event) => setEmail(event.target.value)}
              value={email}
              minLength={1}
              icon={{ content: Envelope }}
            />

            <div className="flex mt-4 w-full justify-between mini:grid mini:gap-2 mini:place-content-center">
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
                <Button
                  name="Voltar"
                  href="/login"
                  type="button"
                  className="not-prose grid text-slate-900 place-self-center h-[1.2rem] place-content-center rounded-md bg-white/[0] hover:bg-white/[0] hover:text-slate-700 duration-200"
                /> 
            </div>
          </form>
        </main>
      </div>
    </>
  )
}

export default Reset;
