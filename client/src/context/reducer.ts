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
    case ActionType.SetSocketClient:
      return { ...state, socketClient: action.payload.socketClient };
    case ActionType.AddCurrentOnline:
      if (!state.currentOnline.includes(action.payload.username)) {
        const newCurrentOnline = [
          ...state.currentOnline,
          action.payload.username,
        ];
        if (!state.collaboraters[action.payload.username]) {
          state.collaboraters[action.payload.username] = Math.floor(
            Math.random() * 16777215
          ).toString(16);
        }
        return { ...state, currentOnline: newCurrentOnline };
      }

      return { ...state };
    case ActionType.RemoveCurrentOnline:
      if (state.currentOnline.includes(action.payload.username)) {
        const newCurrentOnline = state.currentOnline.filter(
          (username) => username !== action.payload.username
        );
        return { ...state, currentOnline: newCurrentOnline };
      }
      return { ...state };
    case ActionType.ClearCurrentOnline:
      return { ...state, currentOnline: [] };
    default:
      return state;
  }
};
