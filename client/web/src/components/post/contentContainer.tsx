interface IProps {
  output: string;
}

export function ContentContainer({ output }: IProps) {
	return (
		<div 
			className="flex w-[80vw] max-w-[45rem] flex-col place-self-center align-content-center pb-24 min-h-screen prose prose-slate prose-a:text-blue-600 break-words"
			dangerouslySetInnerHTML={{
				__html: output
			}}
		/>
	);
}
