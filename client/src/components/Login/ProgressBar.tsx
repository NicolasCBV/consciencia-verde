import { UserSwitch, ArrowRight, ShieldCheck } from "phosphor-react";

interface IProps {
  verificationStage: boolean;
}

export function ProgressBar({ verificationStage }: IProps) {
  return (
    <div className="flex place-content-center gap-2 mb-2 items-center w-full h-[20vh] max-h-[30px]">
      <UserSwitch
        width={40}
        height={40}
        className={`${
          !verificationStage
            ? "text-zinc-700 bg-green-500 circle p-2"
            : "text-zinc-700"
        }`}
      />
      <ArrowRight width={40} height={20} className="text-zinc-700" />
      <ShieldCheck
        width={40}
        height={40}
        className={`${
          verificationStage
            ? "text-zinc-700 bg-green-500 circle p-2"
            : "text-zinc-700"
        }`}
      />
    </div>
  );
}
