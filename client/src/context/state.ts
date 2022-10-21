export interface AppState {
  isAuthenticated: boolean;
  currentSketch: string;
  collaboraters: Record<string, string>;
  user: {
    username: string;
    name: string;
    email: string;
  } | null;
}
