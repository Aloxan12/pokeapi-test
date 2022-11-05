import {combineReducers, createStore, applyMiddleware} from "redux";
import {mainReducer} from "./mainReducer";
import thunk from "redux-thunk";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers({
    main: mainReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
