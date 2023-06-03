import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

import {IArticle} from '../types/article.interface'

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {}

  getArticle(slug: string): Observable<IArticle> {
    const fullUrl = `https://springboot-postgresql-kzcoin.herokuapp.com/v1/api/coin/bySymbol?symbol=${slug}`
    return this.http.get<IArticle>(fullUrl).pipe(
      map((response: IArticle) => {
        console.log('response', response);

        return response
      })
    )
  }
}
