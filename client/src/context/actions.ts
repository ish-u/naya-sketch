export enum ActionType {
  SetIsAuthenticated,
  SetCollaboraters,
  SetUser,
  ChangeCureentSketch,
}

export interface SetIsAuthenticated {
  type: ActionType.SetIsAuthenticated;
  payload: { value: boolean };
}

export interface SetCollaboraters {
  type: ActionType.SetCollaboraters;
  payload: { collaborater: string; color: string };
}

export interface SetUser {
  type: ActionType.SetUser;
  payload: { username: string; email: string; name: string };
}

export interface ChangeCureentSketch {
  type: ActionType.ChangeCureentSketch;
  payload: { currentSketch: string };
}

export type AppActions =
  | SetIsAuthenticated
  | SetCollaboraters
  | SetUser
  | ChangeCureentSketch;
