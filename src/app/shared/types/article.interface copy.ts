// import {ProfileInterface} from 'src/app/shared/types/profile.interface'

export interface IArticle {
  title: string
  slug: string
  body: string
  createdAt: string
  updatedAt: string
  tagList: string[]
  description: string
  favorited: boolean
  favoritesCount: number
}
// author: ProfileInterface
