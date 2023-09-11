import { ISearchArgs } from "@/pages/news";
import { MagnifyingGlass, XCircle } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

interface IProps {
  search: (input: ISearchArgs) => void;
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}

export function SearchBar({ 
	search, 
	query, 
	setQuery,
	isLoading
}: IProps) {
	return (
		<form 
			onSubmit={(event) => {
				event.preventDefault();
				search({ query, page: 0 });
			}} 
			className="grid gap-2"
		>
			{
				query.length > 0 &&
					<Button
						type="button"
						name="Limpar"
						onClick={() => setQuery("")}
						iconData={{
							pos: "right",
							Icon: XCircle,
							loading: isLoading
						}}
					/>
			}
			<Input
				divClasses="border-primaryColor-600 border-[1px] place-self-center" 
				isActiveClasses="bg-primaryColor-750"
				type="text"
				name="name"
				minLength={1}
				value={query}
				onChange={(event) => {
					setQuery(event.target.value);
				}}
				placeholder="Pesquisar por post"
				icon={{
					disabled: query.length <= 0,
					content: MagnifyingGlass,
					isLoading,
					onClick: () => {
						search({ query, page: 0 });
					}
				}}
			/>
		</form>
	);
}
