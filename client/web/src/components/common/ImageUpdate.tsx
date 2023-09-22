import { ComponentProps, ElementType, useState } from "react";
import { v4 as uuid } from "uuid";
import Image from "next/image";
import { Camera } from "phosphor-react";

type TClassName = ComponentProps<"label">["className"];
type TSvgClassName = ComponentProps<"svg">["className"];
type TImgClassName = ComponentProps<"img">["className"];

interface IActionArguments {
  image: string | null;
  file: File | null
}

interface IProps {
  image: string | null;
  action: (args: IActionArguments) => void;
  icon: ElementType;
  className?: TClassName;
  emptyImageClassName?: TSvgClassName;
  imageClassName?: TImgClassName;
  cameraClassName?: TSvgClassName;
}

export function ImageUpdate({
	image,
	action,
	className,
	emptyImageClassName,
	imageClassName,
	cameraClassName,
	icon: Icon
}: IProps) {
	const [ objectURL, setObjectURL ] = useState<string | null>(null);

	return (
		<>
			<label
				htmlFor="input-image"
				role="tab"
				aria-selected="true"
				className={`grid place-content-center w-[40vw] max-w-[30rem] hover:cursor-pointer ${className ?? ""}`}
			>
				{
					!image
						? <div className="flex relative">
							<Icon
								width={200}
								height={200}
								weight="thin"
								className={`bg-zinc-800 circle text-white p-8 ${emptyImageClassName ?? ""}`}
							/>
							<Camera
								width={50}
								height={50}
								className={`bg-zinc-300 text-zinc-800 circle p-2 absolute z-[2] ${cameraClassName ?? ""}`}
							/>
						</div>
						: <Image
							key={uuid()}
							priority={true}
							className={`object-cover relative w-[60vw] max-w-[15rem] h-[60vh] max-h-[15rem] circle object-fit ${imageClassName ?? ""}`}
							width={300}
							height={300}
							src={image}
							alt="Imagem do usuário."
						/>
				}
			</label>
			<input
				id="input-image"
				className="hidden"
				type="file"
				accept="image/jpeg, image/png, image/gif, image/pjpeg"
				onChange={(event) => {
					const urlCreator = window.URL || window.webkitURL;
					if(objectURL)
						urlCreator.revokeObjectURL(objectURL);

					const { files } = event.target;
					if(files && files.length === 1) {
						const file = files[0];
						const newObjectURL = urlCreator.createObjectURL(file);
						setObjectURL(newObjectURL);
						return action({
							image: newObjectURL, 
							file
						});
					}

					return action({
						image: null, 
						file: null
					});
				}}
			/>
		</>
	);
}
