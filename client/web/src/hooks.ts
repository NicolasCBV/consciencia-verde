import { TypedUseSelectorHook, useSelector } from "react-redux";
import { StoreState } from "./store";

export const useStoreHook: TypedUseSelectorHook<StoreState> = useSelector;
