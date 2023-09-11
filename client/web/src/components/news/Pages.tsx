import { IPagination, ISearchArgs } from "@/pages/news";
import { useMemo, useState } from "react";
import { Button } from "../common/Button";
import { TripleCard } from "./TripleCard";
import { v4 as uuid } from "uuid";

interface IProps {
  pages: IPagination;
  search: (input: ISearchArgs) => void;
}

export interface IIndexes {
  position: number;
  enabled: boolean;
}

export function PagesHandler({ search, pages }: IProps) {
	const defaultIndexes = useMemo(() => {
		const newArray: IIndexes[] = [];
		for(let i=0; i < pages.quantity; i++)
			newArray.push({
				position: i + 1,
				enabled: false
			});

		newArray[pages.actualPage].enabled = true;
		return newArray;
	}, [pages]);

	const parsedIndexes = defaultIndexes.length >= 3 
		? defaultIndexes.filter((_, index) => {
			if(index <= 3 && index >= 1) return true;
		})
		: defaultIndexes;

	const [ edgeIndexes, setEdgeIndexes ] = useState(
		defaultIndexes.length >= 3 
			? [ 
				defaultIndexes[0],
				defaultIndexes[defaultIndexes.length - 1]
			]
			: [defaultIndexes[0]]
	);

	const [ indexes, setIndexes ] = useState(parsedIndexes);

	function move(orientation: "left" | "right" | "mid") {
		if(orientation === "mid") {
			search({
				query: pages.query, 
				page: indexes[1].position - 1
			});

			setIndexes((array) => {
				const newArray = [...array];

				newArray.forEach((item) => {
					item.enabled = false;
				});
				newArray[1].enabled = true;

				return [...newArray];
			});
			return;
		}

		if(
			orientation === "left" && indexes[0].position >= 3 || 
      orientation === "right" && indexes[2].position <= pages.quantity - 2
		) {
			search({
				query: pages.query, 
				page: indexes[
					orientation === "left"
						? 0
						: 2
				].position - 1
			});
			setEdgeIndexes((array) => {
				const newArray = [...array];
				newArray.forEach((item) => item.enabled = false);
				return newArray;
			});

			setIndexes((array) => {
				const newArray = [...array];

				for(let i=0; i < newArray.length; i++) {
					newArray[i] = {
						position: orientation === "left" 
							? newArray[i].position - 1
							: newArray[i].position++,
						enabled: i === 1 ? true : false
					};
				}
       
				return [...newArray];
			});
		} else {
			search({
				query: pages.query, 
				page: indexes[
					orientation === "left"
						? 0
						: 2
				].position - 1
			});

			setEdgeIndexes((array) => {
				const newArray = [...array];
				newArray.forEach((item) => item.enabled = false);
				return newArray;
			});

			setIndexes((array) => {
				const newArray = [...array];
				newArray.forEach((item) => {
					item.enabled = false;
				});

				newArray[
					orientation === "left"
						? 0
						: 2
				].enabled = true;

				return [...newArray];
			});
		}
	}

	function moveToEdge(point: "start" | "end") {
		search({
			query: pages.query, 
			page: point === "start"
				? 0
				: defaultIndexes[defaultIndexes.length - 1].position - 1
		});

		setIndexes((array) => {
			const newArray = [...array];

			for(let i=0; i < newArray.length; i++) {
				const calc = point === "end"
					? pages.quantity - newArray.length + i
					: i + 2;
				newArray[i] = {
					position: calc,
					enabled: false
				};
			}
			return newArray;
		});

		setEdgeIndexes((array) => {
			const newArray = [...array];

			newArray.forEach((item) => {
				item.enabled = false;
			});
			newArray[
				point === "end" 
					? 1
					: 0
			].enabled = true;

			return newArray;
		});
	}

	return (
		<ul className="flex justify-center gap-2 w-full h-[2rem] border-t-[1px] border-t-primaryColor-650 pt-4">
			{
				defaultIndexes.length >= 3 &&
					<li>
						<Button
							name={String(edgeIndexes[0].position)}
							className={
								edgeIndexes[0].enabled 
									? "border-2 border-slate-800"
									: ""
							}
							onClick={() => moveToEdge("start")}
						/>
					</li>
			}

			{
				defaultIndexes.length >= 3 &&
        parsedIndexes.length === 3 
					? <TripleCard
						indexes={indexes}
						move={move} 
					/>    
					: parsedIndexes.length < 3 && parsedIndexes.length > 1
						? indexes.map((item, itemIndex) => (
							<li key={`${uuid()}-card`}>
								<Button
									name={String(item.position)}
									className={
										item.enabled 
											? "border-2 border-slate-800"
											: ""
									}
									onClick={() => {
										search({
											query: pages.query, 
											page: item.position - 1
										});
										setEdgeIndexes((array) => {
											const newArray = [...array];
											newArray.forEach((item) => item.enabled = false);
											return newArray;
										});
                          
										setIndexes((array) => {
											const newArray = [...array];
                          
											newArray.forEach((item) => {
												item.enabled = false;
											});
											newArray[itemIndex].enabled = true;
											return [...newArray];
										});
									}}
								/>
							</li>
						))
						: undefined
			}

			{
				defaultIndexes.length >= 5 &&
				edgeIndexes.length >= 1 &&
					<li>
						<Button
							name={String(edgeIndexes[1].position)}
							className={
								edgeIndexes[1].enabled 
									? "border-2 border-slate-800"
									: ""
							}
							onClick={() => moveToEdge("end")}
						/>
					</li>
			}
		</ul>
	);
}
