import { 
  Dispatch, 
  SetStateAction, 
  useState,
  useContext 
} from "react";

import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { AuthErrorContext } from "../../context/AuthErrorContext";

import { CircleNotch } from "phosphor-react";

import { WarnModal } from "../common/WarnModal";
import { OutlinedButtonRed } from "../common/OutlinedButtonRed";


interface WarnModalDeleteInterface {
  title: string;
  desc: string;
  item: string;
  functionToDelete: () => Promise<void>;
  confirmButtonText: string;
  warnModalStatus: boolean;
  setWarnModalStatus: Dispatch<SetStateAction<boolean>>;
  isError: boolean;
  setIsError: Dispatch<SetStateAction<boolean>>;
}

export function WarnModalDelete({
  title,
  desc,
  item,
  functionToDelete,
  confirmButtonText,
  warnModalStatus,
  setWarnModalStatus,
  isError,
  setIsError
}: WarnModalDeleteInterface) {
  const { setIsAuthError } = useContext(AuthErrorContext)

  const routes = useRouter()

  const [ isLoading, setIsLoading ] = useState<boolean>(false)

  return (
    <div>
      {
        isLoading
        ? <div className="bg-[#00000094] backdrop-blur-xl w-[100vw] h-[100vh] grid place-content-center fixed z-50">
            <CircleNotch
              color="white"
              className="animate-spin"
              width={150}
              height={150}
            />
          </div>
        : <WarnModal
            warnModalStatus={warnModalStatus}
            setWarnModalStatus={setWarnModalStatus}
          >
            <div className="grid gap-4">
              <h1
                className="text-primaryColor-400 mb-4 text-2xl"
              >
                {title}
              </h1>
              <p>
                { desc }
              </p>
              <div className="flex justify-between">
                <button
                  className="bg-green-600 text-white my-3 px-2 max-w-[40vw] h-[5vh] rounded-md hover:bg-green-500 duration-200 place-self-center"
                  onClick={() => {
                    setWarnModalStatus(false)
                  }}
                >
                  Cancelar
                </button>

                <OutlinedButtonRed
                  text={confirmButtonText}
                  disabled={isError}
                  onClick={async () => {
                    setIsLoading(true);

                    try{
                      await functionToDelete();

                      routes.push("/");
                    } catch (err) {
                        if (
                          err instanceof AxiosError 
                          && err.response 
                          && (err.response.data.name === "Failed to decode the token" 
                              || err.response.data.name === "Token doesn't exist")
                          ) {
                          setIsAuthError(true);
                        }
                      setIsError(true);
                      setIsLoading(false);
                      setWarnModalStatus(false);
                    }
                  }}
                />
              </div>
            </div>
          </WarnModal>
      }
      
    </div>
  )
}