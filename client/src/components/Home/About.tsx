import Image from "next/image";
import { NewspaperClipping } from "phosphor-react";
import { Button } from "../common/Button";

export function About() {
  return (
    <div id="about" className="flex flex-col py-20 px-16 prose prose-slate gap-4 text-center min-h-screen place-items-center place-content-start drop-shadow-2xl">
      <div className="grid h-[80vh] max-h-[20rem] w-[80vw] max-w-[20rem] bg-white circle shadow-xl place-items-center p-16">
        <Image
          src="/waiting_for_you.svg"
          alt="Imagem de duas pessoas se encontrando em uma árvore."
          width={350}
          height={350}
        /> 
      </div>

      <div id="about-text" className="mt-16">
        <h1>Sobre nos</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec feugiat eros. Nulla facilisi. Nunc sed mattis mauris. Praesent consectetur ex justo, a condimentum ex gravida vel. Duis tristique justo in lorem porttitor convallis. Phasellus varius elit orci, vel mollis eros egestas in. Proin a felis in justo dictum pretium id vel ipsum. Sed non tempor augue, ac porta tellus. Duis et nulla mi. Nulla erat erat, aliquam et convallis vitae, sollicitudin eu urna. Cras interdum eros sed dapibus placerat. Phasellus vehicula fringilla purus. Sed vitae luctus est. Nulla in est nisl.
        </p>
      </div>

      <Button
        id="about-button-news"
        name="Notícias"
        href="/news"
        iconData={{
          pos: "right",
          Icon: NewspaperClipping
        }}
      />
    </div>  
  )
}
