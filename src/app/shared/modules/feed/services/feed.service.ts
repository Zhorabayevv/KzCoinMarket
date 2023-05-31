import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { IGetFeedResponse } from 'src/app/shared/modules/feed/types/getFeedResponse.interface';

@Injectable()
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed(url: string): Observable<IGetFeedResponse> {
    console.log('url: ', url);
    const fullUrl = 'https://springboot-postgresql-kzcoin.herokuapp.com/v1/api' + url;
    return this.http.get<IGetFeedResponse>(fullUrl);
  }
}
