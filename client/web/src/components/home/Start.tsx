import Image from "next/image";
import { ArrowDown, NewspaperClipping } from "phosphor-react";

import { Button } from "../common/Button";

export function Start() {
	function scroll() {
		const windowHeight = window.innerHeight;
		window.scrollTo({
			top: windowHeight <= 1600 ? windowHeight + 100 : 1600 + 100,
			behavior: "smooth"
		});
	}
	return (
		<div id="home">
			<div id="background" className="w-screen h-screen max-h-[100rem] absolute z-[-1] after:block after:absolute after:-inset-0 after:bg-gradient-to-t from-white to-white/0 after:place-self-end after:top-[50%] desktop:after:top-[0] destkop:bg-gradient-to-r desktop:from-white desktop:via-transparent desktop:to-white desktop:blur-lg">
				<Image
					className="w-screen h-screen object-cover"
					src="/leafs.jpg"
					alt="Folhas em cima de uma superfície de madeira."
					fill 
				/>
			</div>

			<div id="mainPhrase" className="grid gap-8 z-[0] w-screen h-screen max-h-[100rem] place-content-center">
				<div className="flex p-4 bg-zinc-800/30 rounded-md w-[80vw] max-w-[30rem] h-[50vh] max-h-[10rem] place-items-center">
					<h1 className="text-3xl text-center bigTitle text-white font-bold">Cuidar da Terra é cultivar o Amanhã!</h1>
				</div>

				<Button
					id="mainPhrase-button-news"
					name="Notícias"
					href="/news"
					iconData={{
						pos: "right",
						Icon: NewspaperClipping
					}}
				/>

				<button 
					id="mainPhrase-button-nav" 
					className="grid animate-pulse hover:cursor-pointer place-content-center circle place-self-center relative top-[100%] h-[50vh] max-h-[3.5rem] w-[50vw] max-w-[3.5rem] bg-green-600 hover:bg-green-500"
					onClick={scroll}
				>
					<ArrowDown width={40} height={40} className="text-white"/>
				</button>
			</div>  
		</div>
	);
}
