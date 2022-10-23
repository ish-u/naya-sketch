import { Socket } from "socket.io-client";

export enum ActionType {
  SetIsAuthenticated,
  SetCollaborators,
  SetUser,
  SetSocketClient,
  ChangeCureentSketch,
  UpdateCollaboratorStatus,
  AddCurrentOnline,
  RemoveCurrentOnline,
  ClearCurrentOnline,
}

export interface SetIsAuthenticated {
  type: ActionType.SetIsAuthenticated;
  payload: { value: boolean };
}

export interface SetCollaborators {
  type: ActionType.SetCollaborators;
  payload: { collaborater: string; color: string };
}

export interface SetUser {
  type: ActionType.SetUser;
  payload: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  };
}

export interface ChangeCureentSketch {
  type: ActionType.ChangeCureentSketch;
  payload: { currentSketch: string };
}

export interface SetSocketClient {
  type: ActionType.SetSocketClient;
  payload: { socketClient: Socket };
}

export interface UpdateCollaboratorStatus {
  type: ActionType.UpdateCollaboratorStatus;
  payload: { username: string; status: boolean };
}

export interface AddCurrentOnline {
  type: ActionType.AddCurrentOnline;
  payload: { username: string };
}

export interface RemoveCurrentOnline {
  type: ActionType.RemoveCurrentOnline;
  payload: { username: string };
}

export interface ClearCurrentOnline {
  type: ActionType.ClearCurrentOnline;
}

export type AppActions =
  | SetIsAuthenticated
  | SetCollaborators
  | SetUser
  | SetSocketClient
  | UpdateCollaboratorStatus
  | AddCurrentOnline
  | RemoveCurrentOnline
  | ClearCurrentOnline
  | ChangeCureentSketch;
