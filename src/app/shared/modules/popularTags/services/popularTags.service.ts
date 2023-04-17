import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IGetPopularTagsResponse } from '../types/getPopularTagsResponse.interface';

@Injectable()
export class PopularTagsService {
  constructor(private http: HttpClient) {}
  getPopularTags(): Observable<string[]> {
    const url = 'https://conduit.productionready.io/api/tags';
    return this.http.get(url).pipe(
      map((response: IGetPopularTagsResponse) => {
        return response.tags;
      })
    );
  }
}
