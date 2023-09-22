import { Binoculars, Hand, Tree } from "phosphor-react";
import { v4 as uuid } from "uuid";

const servicesContent = [
	{
		name: "Educação Ambiental",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ornare mollis fermentum.",
		Icon: Tree
	},
	{
		name: "Ações legais",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ornare mollis fermentum.",
		Icon: Binoculars
	},
	{
		name: "Suporte",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ornare mollis fermentum.",
		Icon: Hand
	}
];

export function Services() {
	return (
		<div id="services" className="flex flex-col pb-8 px-16 gap-4 text-center place-items-center place-content-center drop-shadow-2xl micro:px-0">
			<div id="services-text" className="mt-16 prose prose-slate micro:px-[8px]">
				<h1>Serviços</h1>
				<p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec feugiat eros. Nulla facilisi. Nunc sed mattis mauris.
				</p>
			</div>

			<ul className="grid w-[80vw] max-w-[50rem] gap-8 desktop:grid-cols-3 tablet:grid-cols-2 place-items-center mt-8 desktop:max-w-[70rem] micro:w-screen">
				{
					servicesContent.map((item) => (
						<li key={`${uuid()}-card`} id="services-card" className="flex flex-col gap-2 justify-center items-center p-8 bg-slate-100 w-[80vw] max-w-[20rem] h-[50vh] max-h-[20rem] hover:bg-slate-200 duration-200 rounded-lg prose prose-slate micro:w-screen">
							<item.Icon
								className="text-lg"
								width={100}
								height={100}
							/>
							<h1 className="text-[1.75rem] m-0">
								{item.name}
							</h1>
							<p>
								{item.description}
							</p>
						</li>
					))
				}
			</ul>
		</div>  
	);
}
