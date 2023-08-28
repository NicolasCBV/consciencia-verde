import  { useRouter } from "next/router";
import { useState, FormEvent } from "react";

import { Header } from "../components/common/Header";
import { Input } from "../components/common/Input";
import { NotificationBalloon } from "../components/common/NotificationBalloon";
import { Button } from "../components/common/Button";

import { Key, Check, LockKey } from "phosphor-react";
import Link from "next/link";
import { Application } from "@/@core/application/container";

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
    <div className="grid h-full w-full">
      <NotificationBalloon 
        activate={isError}
        setActivate={setIsError}
        title="ERRO:"
        text="Verifique os dados inseridos."
        type="error"
        className="mt-16"
      />
      <Header/>
      <main className="grid h-[100vh]">
        <form className="grid place-items-center place-self-center bg-primaryColor-550 py-8 px-4 text-center relative rounded-md shadow-2xl duration-200 h-[80vh] max-h-[18rem] w-[70vw] max-w-[20rem] mini:h-[18rem] gap-2 prose prose-slate">
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

            <div className="flex justify-between w-full place-content-center mini:gap-2">
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
                className="not-prose grid text-slate-900 place-self-center h-[1.2rem] place-content-center rounded-md hover:border-green-500 hover:bg-none hover:text-slate-700 duration-200"
                name="Voltar"
              />  
            </div>
        </form>
      </main>
    </div>
  )
}

export default Reset;
