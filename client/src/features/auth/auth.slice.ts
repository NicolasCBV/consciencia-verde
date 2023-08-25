import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUserContainerData {
  deviceId: string | null;
  email: string;
  exp: number;
  iat: number;
  sub: string;
  type: "access_token",
  userData: {
    name: string;
    description: null | string;
    imageUrl: null | string;
    createdAt: string;
    updatedAt: string;
  };
};

export interface IAuthContentType {
  rawToken: string | null;
  userContainerData: IUserContainerData;
};

const initialState: IAuthContentType = {
  rawToken: null,
  userContainerData: {
    deviceId: null,
    email: "UNDEFINED",
    exp: -1,
    iat: -1,
    sub: "UNDEFINED",
    type: "access_token",
    userData: {
      name: "UNDEFINED",
      description: null,
      imageUrl: null,
      createdAt: "UNDEFINED",
      updatedAt: "UNDEFINED"
    }
  }
};

function changeAuthToken(
  state: IAuthContentType,
  action: PayloadAction<IAuthContentType>
) {
  return {
    ...state,
    ...action.payload
  };
}

const authSlice = createSlice({
  name: "authContent",
  initialState,
  reducers: {
    CHANGE_AUTH_TOKEN: changeAuthToken
  }
});

export const { CHANGE_AUTH_TOKEN } = authSlice.actions;
export const authReducer = authSlice.reducer;
