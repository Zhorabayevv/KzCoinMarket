import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { IRegisterRequest } from 'src/app/auth/types/registerRequest.interface';
import { ICurrentUser } from 'src/app/shared/types/currentUser.interface';
import { AuthResponseInterface } from 'src/app/auth/types/authResponse.interface';
import { ILoginRequest } from 'src/app/auth/types/loginRequest.interface';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) {}

  getUser(response): ICurrentUser {
    return response;
  }

  register(data: IRegisterRequest): Observable<string> {
    const url = 'http://localhost:9832/api/auth/signup';
    return this.http
      .post<string>(url, data)
      .pipe(map((response: string): string => response));
  }

  login(data: ILoginRequest): Observable<ICurrentUser> {
    const url = 'http://localhost:9832/api/auth/signin';
    return this.http
      .post<AuthResponseInterface>(url, data)
      .pipe(map(this.getUser));
  }

  getCurrentUser(): Observable<ICurrentUser> {
    const url = 'https://conduit.productionready.io/api/user';
    return this.http.get(url).pipe(map(this.getUser));
  }
}
