import { AppActions } from "./actions";
import { ActionType } from "./actions";
import { AppState } from "./state";

export const AppReducer = (state: AppState, action: AppActions): AppState => {
  switch (action.type) {
    case ActionType.SetIsAuthenticated:
      return { ...state, isAuthenticated: action.payload.value };
    case ActionType.SetUser:
      return { ...state, user: action.payload };
    case ActionType.ChangeCureentSketch:
      state.collaboraters = {};
      return { ...state, currentSketch: action.payload.currentSketch };
    case ActionType.SetCollaboraters:
      state.collaboraters[action.payload.collaborater] = action.payload.color;
      return { ...state };
    default:
      return state;
  }
};
