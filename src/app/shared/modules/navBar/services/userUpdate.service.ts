import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IGetMarketResponse } from '../types/market.interface';

@Injectable()
export class UserUpdateService {
  constructor(private http: HttpClient) {}

  userUpdate(data): Observable<any> {
    const url =
      'https://springboot-postgresql-kzcoin.herokuapp.com/api/auth/update';
    return this.http
      .post<string>(url, data)
      .pipe(map((response: any): any => response));
  }

  getMarketCap(): Observable<IGetMarketResponse> {
    const url =
      'https://springboot-postgresql-kzcoin.herokuapp.com/v1/api/coin/full/market';
    return this.http
      .get<string>(url)
      .pipe(map((response: any): any => response));
  }
}
