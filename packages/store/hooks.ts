import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;


//creating and exporting custom hooks to increase abstraction in application code and to avoid importing useSelector and useDispatch in every component that needs to access the store or dispatch actions. This also allows us to easily change the underlying implementation of these hooks if needed in the future without having to refactor all components that use them.
export const useBalance = () => {
  return useAppSelector((state) => state.balance.balance);
}; 