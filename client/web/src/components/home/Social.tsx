import Link from "next/link";
import { ElementType } from "react";

interface IProps {
  name: string;
  icon: ElementType;
}

export function Social({ name, icon: Icon }: IProps) {
	return (
		<Link className="flex h-[1rem] gap-2 place-items-center no-underline hover:text-slate-700 duration-200" href="">
			<Icon width={30} height={30} weight="thin" />
			<p>{name}</p>
		</Link>
	);
}
