import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./features/auth/auth.slice";

export const store = configureStore({
	reducer: {
		accessToken: authReducer,
	},
});

export type StoreState = ReturnType<typeof store.getState>;
