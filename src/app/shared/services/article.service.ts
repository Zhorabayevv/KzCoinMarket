import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

import {IArticle} from '../types/article.interface'
import {IGetArticleResponse} from 'src/app/shared/types/getArticleResponse.interface'

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticle(slug: string): Observable<IArticle> {
    const fullUrl = `http://localhost:9832/v1/api/articles/${slug}`
    return this.http.get<IGetArticleResponse>(fullUrl).pipe(
      map((response: IGetArticleResponse) => {
        return response.article
      })
    )
  }
}
