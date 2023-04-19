export interface ICurrentUser {
  id: number;
  email: string;
  username: string;
  bio: string | null;
  image: string | null;
  tokenType: string;
  accessToken: string;
}
