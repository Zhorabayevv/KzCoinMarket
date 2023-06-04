import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class WatchlistService {
  constructor(private http: HttpClient) {}

  watchlistById(): Observable<any> {
    const url =
      'https://springboot-postgresql-kzcoin.herokuapp.com/v1/api/user/watchlist/byId?id=1';
    return this.http
      .get<string>(url)
      .pipe(map((response: any): any => response));
  }

  watchlistUpdate(data): Observable<any> {
    const url =
      'https://springboot-postgresql-kzcoin.herokuapp.com/v1/api/user/watchlist/update';
    return this.http
      .post<string>(url, data)
      .pipe(map((response: any): any => response));
  }

}
