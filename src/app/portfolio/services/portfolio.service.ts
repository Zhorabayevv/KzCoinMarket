import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IBuyCoin } from '../types/buyCoin.interface';
import { IGetAllProtfolio } from '../types/getAllPortfolio.interface';

@Injectable()
export class PortFolioService {
  constructor(private http: HttpClient) {}

  getAllPortfolios(): Observable<IGetAllProtfolio> {
    const fullUrl = `https://springboot-postgresql-kzcoin.herokuapp.com/v1/api/transaction/all`;
    return this.http.get<IGetAllProtfolio>(fullUrl).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getPortfolioById(id: number): Observable<Response> {
    const fullUrl = `https://springboot-postgresql-kzcoin.herokuapp.com/v1/api/transaction/byId?id=${id}`;
    return this.http.get<Response>(fullUrl).pipe(
      map((response) => {
        return response;
      })
    );
  }

  createPortfolio(name: string): Observable<Response> {
    const fullUrl = `https://springboot-postgresql-kzcoin.herokuapp.com/v1/api/transaction/create`;
    return this.http.post<Response>(fullUrl, name).pipe(
      map((response) => {
        return response;
      })
    );
  }

  buyCoin(coin: IBuyCoin): Observable<Response> {
    const fullUrl = `https://springboot-postgresql-kzcoin.herokuapp.com/v1/api/transaction/buy`;
    return this.http.post<Response>(fullUrl, coin).pipe(
      map((response) => {
        return response;
      })
    );
  }

  sellCoin(coin: IBuyCoin): Observable<Response> {
    const fullUrl = `https://springboot-postgresql-kzcoin.herokuapp.com/v1/api/transaction/sell`;
    return this.http.post<Response>(fullUrl, coin).pipe(
      map((response) => {
        return response;
      })
    );
  }

  removePortfolio(id: number): Observable<Response> {
    const fullUrl = `https://springboot-postgresql-kzcoin.herokuapp.com/v1/api/transaction/remove?id=${id}`;
    return this.http.delete<Response>(fullUrl).pipe(
      map((response) => {
        return response;
      })
    );
  }

  getSelect(): Observable<Response> {
    const fullUrl = `https://springboot-postgresql-kzcoin.herokuapp.com/v1/api/coin/select`;
    return this.http.get<Response>(fullUrl).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
