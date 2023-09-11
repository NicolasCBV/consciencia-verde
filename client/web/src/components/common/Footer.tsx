import { 
	GithubLogo, 
	Leaf,
	IdentificationCard,
	LinkedinLogo
} from "phosphor-react";

export function Footer(){
	return (
		<footer className="p-8 bg-primaryColor-600">
			<div className="flex gap-2">
				<h1 className="bigTitle font-bold text-3xl text-white micro:text-xl">
            ConSciência
				</h1>
				<Leaf
					className="text-white"
					weight="bold"
					width={30}
					height={30}
				/>
			</div>
			<p className="text-white py-4">
          Todos os direitos reservados à ConSciência Verde©
			</p>
			<ul className="flex py-4 gap-2">
				<li>
					<a href="https://www.linkedin.com/in/n%C3%ADcolas-cleiton-707688227/" target="_blank" rel="noreferrer">
						<LinkedinLogo
							width={35}
							height={35}
							className="text-zinc-50 hover:text-zinc-200 duration-200"
						/>
					</a>
				</li>
				<li>
					<a href="https://rebrand.ly/gqbnysf" target="_blank" rel="noreferrer">
						<IdentificationCard
							width={35}
							height={35}
							className="text-zinc-50 hover:text-zinc-200 duration-200"
						/>
					</a>
				</li>
				<li>
					<a href="https://github.com/NicolasCBV" target="_blank" rel="noreferrer">
						<GithubLogo
							width={35}
							height={35}
							className="text-zinc-50 hover:text-zinc-200 duration-200"
						/>
					</a>
				</li>
			</ul>
		</footer>
	);
}
