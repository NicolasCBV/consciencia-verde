import { Button } from "../common/Button";
import { IIndexes } from "./Pages";

interface IProps {
  indexes: IIndexes[];
  move: (orientation: "left" | "right" | "mid") => void;
}

export function TripleCard({ 
	indexes,
	move,
}: IProps) {
	return (
		<>
			<li>
				<Button
					name={String(indexes[0].position)}
					className={
						indexes[0].enabled 
							? "border-2 border-slate-800"
							: ""
					}
					onClick={() => move("left")}
				/>
			</li>

			<li>
				<Button
					name={String(indexes[1].position)}
					className={
						indexes[1].enabled 
							? "border-2 border-slate-800"
							: ""
					}
					onClick={() => move("mid")} 
				/>
			</li>

			<li>
				<Button
					name={String(indexes[2].position)}
					className={
						indexes[2].enabled 
							? "border-2 border-slate-800"
							: ""
					}
					onClick={() => move("right")}
				/>
			</li>
		</>
	);
}
