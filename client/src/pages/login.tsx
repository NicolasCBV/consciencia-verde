import { Form } from "../components/Login/Form";
import { Header } from "../components/common/Header";
import Head from "next/head";
import { useEffect, useState } from "react";
import { NotificationBalloon } from "../components/common/NotificationBalloon";
import { ProgressBar } from "../components/Login/ProgressBar";
import { VerificationStage } from "../components/Login/VerificationStage";
import { GetServerSidePropsContext } from "next";
import { useDispatch } from "react-redux";
import { CHANGE_AUTH_TOKEN } from "@/features/auth/auth.slice";
import { Button } from "@/components/common/Button";

export interface IFormProps {
  name: string;
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch();

  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>(
    "Não foi possível enviar os dados"
  );
  const [form, setForm] = useState<IFormProps>({
    name: "",
    email: "",
    password: "",
  });

  const [verificationStage, setVerificationStage] = useState(false);
  const [isOnSigin, setIsOnSigin] = useState<boolean>(true);

  useEffect(() => {
    dispatch(CHANGE_AUTH_TOKEN({
      rawToken: null,
      userContainerData: {
        deviceId: null,
        email: "UNDEFINED",
        exp: -1,
        iat: -1,
        sub: "UNDEFINED",
        type: "access_token",
        userData: {
          name: "UNDEFINED",
          description: null,
          imageUrl: null,
          createdAt: "UNDEFINED",
          updatedAt: "UNDEFINED"
        }
      }    
    }));
  })

  return (
    <>
      <Head>
        <title>ConSciência - login</title>
        <meta
          name="description"
          content="Criar conta em ConSciência"
        />
        <meta name="keywords" content="" />
      </Head>
      <div id="content" className="grid">
        <Header />
        <NotificationBalloon
          activate={isError}
          setActivate={setIsError}
          title={"Error no processamento"}
          type="error"
          text={errorMessage}
          className="mt-20"
        />
        <main className="flex flex-col my-4 gap-2 min-h-screen place-items-center justify-center">
          <div className="flex flex-col gap-2">
            <ProgressBar verificationStage={verificationStage} />
            {!verificationStage ? (
              <div className="grid gap-8">
                <Form
                  form={form}
                  setVerificationStage={setVerificationStage}
                  setForm={setForm}
                  setIsOnSigin={setIsOnSigin}
                  isOnSigin={isOnSigin}
                  isError={isError}
                  setIsError={setIsError}
                  setErrorMessage={setErrorMessage}
                />
                <Button
                  id="forgot-password-button"
                  href="/redefine-password"
                  name="Esqueci a senha"
                  className="grid text-slate-900 place-self-center border-[1px] border-green-600 h-[2.5rem] place-content-center rounded-md hover:border-green-500 bg-transparent hover:bg-transparent hover:text-slate-700 duration-200"
                />
              </div>
            ) : (
              <VerificationStage
                email={form.email}
                isOnSigin={isOnSigin}
                setVerificationStage={setVerificationStage}
                isError={isError}
                setIsError={setIsError}
                setErrorMessage={setErrorMessage}
              />
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  ctx.res.setHeader(
    "Set-Cookie", 
    "refresh-cookie=; Path=/; Expires=0; Max-Age=0;" 
  );


  return {
    props: {}
  }
}
