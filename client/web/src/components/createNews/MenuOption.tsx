import { ComponentProps, ElementType } from "react";

interface IProps extends ComponentProps<"button"> {
  icon: ElementType;
  name: string;
  description: string;
}

export function MenuOption({ 
	icon: Icon, 
	name, 
	description,
	...props
}: IProps) {
	return (
		<button className="flex items-center gap-2 p-1 rounded min-w-[280px] hover:bg-zinc-600 duration-200" {...props}>
			<Icon
				width={35}
				height={35}
				weight="bold"
				className="text-white"
			/>
			<div className="flex flex-col text-left">
				<span className="text-sm text-white">
					{name}
				</span>
				<span className="text-xs text-zinc-400">
					{description}
				</span>
			</div>
		</button>
	);
}
