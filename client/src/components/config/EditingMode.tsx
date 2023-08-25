import { useStoreHook } from "@/hooks";
import { IDisponibleStages, IUserProfileData } from "@/pages/config";
import { Check, Tag, UserCircle } from "phosphor-react";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { ImageUpdate } from "../common/ImageUpdate";
import { Application } from "@/@core/application/container";

interface IProps {
  staticUserData: IUserProfileData;
  setStaticUserData: Dispatch<SetStateAction<IUserProfileData>>;
  setStages: Dispatch<SetStateAction<IDisponibleStages>>;
  error: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
}

export function EditingMode({
  staticUserData,
  setStaticUserData,
  setStages,
  error,
  setError
}: IProps) {
  const rawToken = useStoreHook(
    ({ accessToken }) => accessToken.rawToken
  );
   
  const [ isLoading, setIsLoading ] = useState<boolean>(false);
  const [ dinamicUserData, setDinamicUserData ] = useState<IUserProfileData>(staticUserData);

  async function handleSubmit() {
    setIsLoading(true);

    await Application
      .updateUserFlow
      .update
      .exec({
        access_token: String(rawToken),
        name: dinamicUserData.name,
        description: dinamicUserData.description,
        image: dinamicUserData.file ? {
          file: dinamicUserData.file
        } : undefined
      })
      .catch(() => setError(true))

    setStaticUserData(dinamicUserData);

    setStages(() => ({
      isEditing: false,
      isDeleting: false
    }));
  }

  return (
    <div className="w-[85vw] max-w-[20rem] h-screen flex flex-col gap-6 place-items-center place-content-center place-self-center">
      <ImageUpdate
        icon={UserCircle}
        image={dinamicUserData.imageURL}
        action={({ image, file }) => {
          setDinamicUserData((item) => ({
            ...item,
            imageURL: image,
            file
          }))
        }}
      />
      <div id="text" className="w-full grid place-items-center text-center gap-4">
        <Input
          isActiveClasses="bg-primaryColor-520"
          type="text"
          name="name"
          minLength={2}
          maxLength={64}
          value={dinamicUserData.name}
          onChange={(event) => {
            setDinamicUserData((item) => ({
              ...item,
              name: event.target.value
            }))
          }}
          placeholder="Insira seu nome"
          icon={Tag}
        />
        <textarea
          className="w-full h-[40vh] max-h-[8rem] border-[1px] border-zinc-600 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-500"
          defaultValue={
            dinamicUserData.description ?? ""
          }
          placeholder="Insira sua descrição aqui"
          onChange={(event) => {
            setDinamicUserData((item) => ({
              ...item,
              description: event.target.value
            }))
          }}
        /> 
      </div>
      <div className="w-full h-[20vh] max-h-[5rem] flex flex-col tablet:flex-row justify-between">
        <Button
          disabled={error || isLoading}
          name="Pronto"
          iconData={{
            Icon: Check,
            pos: "right",
            loading: isLoading
          }}
          onClick={() => {
            handleSubmit()
              .catch(() => setError(true))
              .finally(() => setIsLoading(false))
          }}
        />
        <Button
          name="Voltar"
          className="place-self-center border-[1px] border-green-600 hover:border-green-500 hover:text-zinc-600"
          onClick={() => {
            setStages(() => ({
              isEditing: false,
              isDeleting: false
            }));
          }}
        />
      </div>
    </div>
  );
}
