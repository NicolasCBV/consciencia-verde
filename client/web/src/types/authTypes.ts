import { Dispatch, SetStateAction } from "react";

export type TokenDecodedType = {
  admin: boolean;
  email: string;
  description: string | null;
  photo: string | null;
  expires: number;
  TFAStatus: boolean;
  id: string;
  issued: number;
  name: string;
} | null | undefined;


export type DecodeAPIType = {
  name: string;
	statusCode: number;
  desc?: string;
	content?: TokenDecodedType;
}

export interface FormInterface {
  name?: string;
  email: string;
  password: string;
}

export interface AuthUserRetunInterface {
  status: number;
  content: {
    id: string;
  } | {
    token: string;
    expires: number;
    issued: number;
  } | undefined;
}
