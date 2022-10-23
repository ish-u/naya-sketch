import { Socket } from "socket.io-client";

export interface AppState {
  isAuthenticated: boolean;
  currentSketch: string;
  collaborators: Record<string, string>;
  user: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
  socketClient: Socket | null;
  currentOnline: string[];
}
