import { SmileyXEyes } from "phosphor-react";

export function NotFound() {
  return (
    <div className="flex flex-col py-16 place-items-center">
      <SmileyXEyes
        width={150}
        height={150}
        weight="thin"
        color="rgb(0,0,0, 0.12)"
      />
      <p className="text-md">
        Ops... Nenhum post foi encontrado :(
      </p>
    </div>
  )
}