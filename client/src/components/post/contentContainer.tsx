interface IProps {
  output: string;
}

export function ContentContainer({ output }: IProps) {
  return (
	<div 
	  className="flex flex-col place-self-center align-content-center pb-24 w-[80vw] min-h-screen"
	  dangerouslySetInnerHTML={{
		__html: output
	  }}
	/>
  )
}
