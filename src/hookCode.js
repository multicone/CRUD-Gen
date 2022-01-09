import { Capitalize } from "./code.js";

export function indexSource() {
  return `export * from './hook'
export * from './reducer'
export * from './updater'`;
}

export function typesSource(name) {
  return `export enum ${Capitalize(name)}ActionType {
//   USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST",
//   USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS",
//   USER_LOGIN_FAIL = "USER_LOGIN_FAIL",
}
export interface State{}
export interface Action {
  type: ${Capitalize(name)}ActionType;
  payload: object;
}
`;
}

export function hookSource(name) {
  return `import { useSelector, useDispatch } from "react-redux";
import { AppState } from "..";

export function use${Capitalize(name)}State() {
  const dispatch = useDispatch();
  const state = useSelector((state: AppState) => state.${name});
  return { state };
}
`;
}

export function reducersSource(name) {
  return `import { Action,State, ${Capitalize(name)}ActionType } from "./types";

export function ${name}(state: State, action: Action) {
  switch (action.type) {
    // case UserActionType.USER_REGISTER_REQUEST:
    //   return { loading: true };
    // case UserActionType.USER_REGISTER_SUCCESS:
    //   return { ...state, user: action.payload, loading: false, success: true };
    // case UserActionType.USER_REGISTER_FAIL:
    //   return { ...state, user: action.payload, loading: false, success: false };
    default:
      return {};
  }
}
`;
}

export function updaterSource(name) {
  return `import { AppDispatch } from "..";
import { ${name}ActionType } from "./types";

export const Action =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch({
        // type: UserActionType.USER_REGISTER_REQUEST,
      });
    } catch (error) {}
  };
`;
}
