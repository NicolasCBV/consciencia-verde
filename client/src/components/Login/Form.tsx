import {
  Dispatch,
  SetStateAction,
  FormEvent,
  useState,
  CSSProperties,
} from "react";

import { animated, useSpring } from "react-spring";

import { IFormProps } from "@/pages/login";
import Link from "next/link";
import { Button } from "../common/Button";
import { FormOptions } from "./Options";
import { FormInputs } from "./Inputs";
import { Application } from "@/@core/application/container";

interface IProps {
  form: IFormProps;
  isOnSigin: boolean;
  setIsOnSigin: Dispatch<SetStateAction<boolean>>;
  setVerificationStage: Dispatch<SetStateAction<boolean>>;
  setForm: Dispatch<SetStateAction<IFormProps>>;
  setErrorMessage: Dispatch<SetStateAction<string>>;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
}

export function Form({
  form,
  setVerificationStage,
  isOnSigin,
  setIsOnSigin,
  setForm,
  setErrorMessage,
  isError,
  setIsError,
}: IProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [formStyle, setFormStyle] = useSpring(() => ({
    top: "0"
  }));
  const [inputStyle, setInputStyle] = useSpring(() => ({
    display: "grid",
    opacity: "1",
    visibility: "visible"
  }) as CSSProperties);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setIsLoading(true);

    isOnSigin
      ? await Application
          .siginFlow
          .start
          .exec({
            name: form.name,
            email: form.email,
            password: form.password
          }) 
      : await Application
            .loginFlow
            .throwTFA
            .exec({
              email: form.email,
              password: form.password
            });

    setIsLoading(false);

    setVerificationStage(true);
  }

  return (
    <div className="grid place-items-center place-self-center bg-primaryColor-640 py-8 px-4 text-center relative rounded-md shadow-2xl duration-200 h-[19.5rem] w-[70vw] max-w-[20rem]">
      <h1 className="text-2xl text-white mb-4">
        {isOnSigin ? "Sigin" : "Login"}
      </h1>
      <animated.form
        method="POST"
        className="grid gap-4 relative place-items-center"
        style={formStyle}
      >
        <FormInputs
          form={form}
          setForm={setForm}
          style={inputStyle}
        />
        <FormOptions
          isLoading={isLoading}
          conditional={
            isLoading ||
            !form.email ||
            !form.password ||
            (isOnSigin &&
              (!form.name || form.name?.length < 2 || form.name?.length > 64)) ||
            isError ||
            form.email.length < 5 ||
            form.email.length > 256 ||
            form.password.length < 6 ||
            form.password.length > 256
          }
          switchName={isOnSigin ? "Cadastro" : "Login"}
          submitOption={
            (event: FormEvent) => {
              handleSubmit(event)
                .catch(() => {
                  setIsError(true);
                  setIsLoading(false);
                });
            } 
          }
          switchOption={() => {
              setIsError(false);
              setForm({
                name: "",
                email: "",
                password: "",
              });
              if (isOnSigin) {
                setFormStyle.start({ top: "-3.625rem" });
                setInputStyle.start({
                  opacity: "0",
                  visibility: "hidden",
                });
                return setIsOnSigin(false);
              }

              setInputStyle.start({
                display: "grid",
                opacity: "1",
                visibility: "visible",
              });
              setFormStyle.start({ top: "0" });
              return setIsOnSigin(true);
            }
          }
        />
        {
          !isOnSigin &&
            <Link 
              href="/redefine-password"
            >
              <Button
                name="Esqueci a senha"
                className="text-white bg-none hover:bg-none hover:text-zinc-200 duration-200"
              />
            </Link>
        }
      </animated.form>
    </div>
  );
}
