import { Check, CircleNotch } from "phosphor-react";
import { FormEvent } from "react";
import { Button } from "../common/Button";

interface IProps {
  conditional: boolean;
  isLoading: boolean;
  switchName: string;
  switchOption: () => void;
  submitOption: (event: FormEvent) => void;
}

export function FormOptions({ 
  conditional, 
  isLoading,
  switchName,
  switchOption, 
  submitOption 
}: IProps) {
  return (
    <div className="text-white flex w-[100%] justify-between mini:grid mini:gap-2 mini:place-content-center">
      <Button
        id="submit-button"
        type='submit'
        name="Próximo"
        iconData={{
          Icon: !isLoading ? Check : CircleNotch,
          pos: "right",
          loading: isLoading
        }}
        disabled={conditional}
        onClick={submitOption} 
      />
      <Button
        id="switch-button"
        type="button"
        className="bg-none hover:bg-none hover:text-zinc-200 duration-200"
        name={switchName}
        onClick={switchOption}
      />
    </div>
  )
}
