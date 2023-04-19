export interface ICurrentUser {
  id: number;
  email: string;
  username: string;
  tokenType: string;
  accessToken: string;
  roles: string[];
}
