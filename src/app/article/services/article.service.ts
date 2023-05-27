import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'

@Injectable()
export class ArticleService {
  constructor(private http: HttpClient) {}

  deleteArticle(slug: string): Observable<{}> {
    console.log('deleteArticle', slug);
    const url = `https://springboot-postgresql-kzcoin.herokuapp.com/v1/api/coin/bySymbol?symbol=${slug}`

    return this.http.delete<{}>(url)
  }
}
