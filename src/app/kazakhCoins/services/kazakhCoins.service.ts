import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class KazakhCoinsService {
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any> {
    const url =
      'https://springboot-postgresql-kzcoin.herokuapp.com/v1/api/post/all';
    return this.http
      .get<string>(url)
      .pipe(map((response: any): any => response));
  }

  getPostById(id): Observable<any> {
    const url =
      'https://springboot-postgresql-kzcoin.herokuapp.com/v1/api/post/byId?id=' +
      id;
    return this.http
      .get<string>(url)
      .pipe(map((response: any): any => response));
  }
}
