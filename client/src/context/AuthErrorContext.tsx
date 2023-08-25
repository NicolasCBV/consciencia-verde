import React, { 
  Dispatch,
  SetStateAction,
  useState, 
  createContext, 
  useEffect
} from "react";
import { useRouter } from "next/router";

interface AuthErrorContextInterface {
  isAuthError: boolean;
  setIsAuthError: Dispatch<SetStateAction<boolean>>;
}

export const AuthErrorContext = createContext({} as AuthErrorContextInterface);

interface Props {
  children: React.ReactNode;
}

export function AuthErrorProvider ({ children }: Props) {
  const routes = useRouter();
  const [ isAuthError, setIsAuthError ] = useState<boolean>(false);


  useEffect(() => {
    if (isAuthError) {
      setIsAuthError(false);
      routes.push("/login");
    }
    return;
  }, [ isAuthError ]);

  return (
    <AuthErrorContext.Provider
      value={{
        isAuthError,
        setIsAuthError
      }}
    >
      { children }
    </AuthErrorContext.Provider>
  )
}