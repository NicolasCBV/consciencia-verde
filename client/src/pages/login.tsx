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
        <title>Dropneos - login</title>
        <meta
          name="description"
          content="Cria uma conta na Dropneos e aproveite a loja"
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
        <div className="flex flex-col gap-2 w-screen h-screen place-items-center justify-center">
          <div className="flex flex-col gap-2">
            <ProgressBar verificationStage={verificationStage} />
            {!verificationStage ? (
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
        </div>
      </div>
    </>
  );
}

export function getServerSideProps(ctx: GetServerSidePropsContext) {
  ctx.res.setHeader(
    "Set-Cookie", 
    [
      `refresh-cookie=; Path=/; Expires=0; Max-Age=0;`
    ] 
  );


  return {
    props: {}
  }
}
