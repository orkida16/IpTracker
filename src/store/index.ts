import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import configureStore from './configureStore';

export type TRootState = ReturnType<
  ReturnType<typeof configureStore>['configuredStore']['getState']
>;
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export type TAppDispatch = ReturnType<
  typeof configureStore
>['configuredStore']['dispatch'];
export const useAppDispatch = () => useDispatch<TAppDispatch>();
