import Image from "next/image";
import { PencilCircle, UserCircle } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";
import { v4 as uuid } from "uuid";
import { IDisponibleStages, IUserProfileData } from "@/pages/config";
import Menu from "./Menu";
import { Button } from "../common/Button";

interface IProps {
  staticUserData: IUserProfileData;
  setStages: Dispatch<SetStateAction<IDisponibleStages>>;
}

export function VisualizationMode({
  staticUserData,
  setStages
}: IProps) {
  return (
    <div className="flex flex-col gap-6 place-items-center place-content-center w-screen py-24">
      {
        staticUserData.imageURL
          ? <Image
              key={uuid()} 
              className="object-cover rounded-[2px] w-[60vw] max-w-[12rem] h-[60vh] max-h-[12rem] circle object-fit"  
              width={200}
              height={200}
              src={staticUserData.imageURL}
              alt="Imagem do usuário."
            />

          : <UserCircle 
              width={200}
              height={200}
              weight="thin"
              className="bg-zinc-800 text-white circle"
            />
      }
      <div id="text" className="w-[80vw] max-w-[20rem] text-center">
        <h1 className="text-2xl">
          { staticUserData.name }
        </h1>
        { 
          !staticUserData.description
            ? <p>
                Clique no botão editar para configurar a sua descrição! <span className="text-orange-600">☻</span>
              </p>
            : <p>
                { staticUserData.description }
              </p>
        }
      </div>
      <Button
        name="Editar"
        className="mb-8"
        iconData={{
          pos: "right",
          Icon: PencilCircle
        }}
        onClick={() => {
          setStages(() => ({
            isEditing: true,
            isDeleting: false
          }))
        }}
      />
      <Menu
        setStages={setStages}
      />
    </div>
  );
}
