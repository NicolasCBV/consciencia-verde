import Image from "next/image";
import { NewspaperClipping } from "phosphor-react";
import { Button } from "../common/Button";
import { VerticalLine } from "../common/VerticalLine";

export function About() {
	return (
		<div id="about" className="w-screen max-w-[120rem] flex flex-col py-20 px-16 gap-4 text-center place-items-center place-content-start drop-shadow-2xl desktop:flex-row desktop:justify-evenly desktop:h-[50rem]">
			<div className="grid h-[80vh] max-h-[20rem] min-w-[12rem] w-[80vw] max-w-[20rem] bg-white circle shadow-xl place-items-center p-16">
				<Image
					src="/waiting_for_you.svg"
					alt="Imagem de duas pessoas se encontrando em uma árvore."
					width={350}
					height={350}
				/> 
			</div>

			<VerticalLine className="hidden desktop:block"/>

			<div id="about-section" className="grid place-content-center gap-8 desktop:w-[50vw] desktop:w-[25rem]">
				<div id="about-text" className="grid mt-16 prose prose-slate">
					<h1>Sobre nos</h1>
					<p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec feugiat eros. Nulla facilisi. Nunc sed mattis mauris. Praesent consectetur ex justo, a condimentum ex gravida vel. Duis tristique justo in lorem porttitor convallis. Phasellus varius elit orci, vel mollis eros egestas in. 
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
		</div>  
	);
}
