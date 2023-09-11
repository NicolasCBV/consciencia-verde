import { ComponentProps } from "react";

interface IProps extends ComponentProps<"div"> {}

export function VerticalLine({ className: classes, ...props }: IProps) {
	return (
		<span className={`h-full w-[1px] bg-slate-400 ${classes}`} {...props}/>
	);
}
