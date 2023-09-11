import { MouseEventHandler } from "react";

interface Props {
  text?: string;
  className?: string;
  title?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export function OutlinedButtonRed({ 
	text, 
	className,
	title, 
	onClick, 
	disabled = false
}: Props) {
	return (
		<button
			className={`border-[1px] ${ !disabled ? "border-red-500 hover:bg-red-200": "border-red-300 text-zinc-500"} my-3 px-2 max-w-[40vw] h-[5vh] rounded-md duration-200 place-self-center ${className}`}
			title={title}
			onClick={onClick}
			disabled={disabled}  
		>
			{text}
		</button>
	);
}