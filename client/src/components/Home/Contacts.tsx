import { At, FacebookLogo, InstagramLogo, LinkedinLogo, Phone, TwitterLogo } from "phosphor-react";
import { Social } from "./Social";

export function Contacts() {
  return (
    <div id="contacts" className="grid py-8 place-self-center text-center place-items-center place-content-center prose prose-slate prose-ul:p-[0]">
      <h1>Contatos</h1>
      <ul className="grid grid-cols-2 place-self-center gap-4 list-none">
        <li className="flex h-[3rem] place-items-center">
          <Social name="Instagram" icon={InstagramLogo}/>
        </li>
        <li className="flex h-[3rem] place-items-center">
          <Social name="Telefone" icon={Phone}/>
        </li>
        <li className="flex h-[3rem] place-items-center">
          <Social name="Email" icon={At}/>
        </li>
        <li className="flex h-[3rem] place-items-center">
          <Social name="Twitter" icon={TwitterLogo}/>
        </li>
        <li className="flex h-[3rem] place-items-center">
          <Social name="Linkedin" icon={LinkedinLogo}/>
        </li>
        <li className="flex h-[3rem] place-items-center">
          <Social name="Facebook" icon={FacebookLogo}/>
        </li>
      </ul>
    </div>
  )
}
