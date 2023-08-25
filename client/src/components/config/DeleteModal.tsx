import { Application } from "@/@core/application/container";
import { useStoreHook } from "@/hooks";
import { IDisponibleStages } from "@/pages/config";
import { useRouter } from "next/router";
import { Warning } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

interface IProps {
  setError: Dispatch<SetStateAction<boolean>>;
  setStages: Dispatch<SetStateAction<IDisponibleStages>>;
}

export function DeleteModal({ setError, setStages }: IProps) {
  const router = useRouter();
  const auth = useStoreHook(({ accessToken }) => accessToken.rawToken);
  const [ input, setInput ] = useState("");

  async function handleSubmit() {
    if(input !== "Sim, eu compreendo isto")
      return;

    await Application
      .deleteUserFlow
      .delete
      .exec({ access_token: String(auth) })
      .catch(() => setError(true));

    router.push("/login");
  }
  
  return (
    <div className="flex place-content-center w-screen h-screen z-[1000] absolute">
      <div className="grid place-items-center place-self-center border-[1px] border-primaryColor-640 py-8 px-8 text-center relative rounded-md shadow-2xl duration-200 h-[80vh] max-h-[28rem] w-[70vw] max-w-[20rem] mini:h-[18rem] gap-4">
        <h1 className="text-2xl text-red-500">
          DELETAR CONTA
        </h1>
        <p>
          Você tem certeza de que deseja deletar a sua conta? Ao realizar esta ação, a sua conta se tornará irrecuperável!
        </p>
        <p>
          Digite: "Sim, eu compreendo isto"
        </p>
        <Input
          isActiveClasses="bg-primaryColor-520"
          name="Confirmation"
          placeholder="Insira a frase aqui"
          icon={Warning}
          onChange={(event) => {
            setInput(event.target.value)
          }}
          color="primaryColor"
          type="text"
        />
        <div className="flex w-full justify-between">
          <button
            disabled={input !== "Sim, eu compreendo isto"}
            className="h-[8vh] max-h-[2rem] px-3 border-[2px] border-red-500 rounded-md hover:bg-red-300"
            onClick={handleSubmit}
          >  
            Deletar
          </button>
          <Button
            name="Voltar"
            color="green"
            onClick={() => {
              setStages(() => ({
                isEditing: false,
                isDeleting: false
              }));
            }}
          />
        </div>
      </div>
    </div>
  )
}
