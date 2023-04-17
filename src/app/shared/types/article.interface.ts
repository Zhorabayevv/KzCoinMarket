import { IProfile } from "src/app/shared/types/profile.interface";

export interface IArticle {
  author: IProfile;
  body: string;
  createdAt: string;
  description: string;
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
}
