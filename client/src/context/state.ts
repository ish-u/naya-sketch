import { Socket } from "socket.io-client";

export interface AppState {
  isAuthenticated: boolean;
  currentSketch: string;
  collaboraters: Record<string, string>;
  user: {
    username: string;
    name: string;
    email: string;
  } | null;
  socketClient: Socket | null;
  currentOnline: string[];
}
