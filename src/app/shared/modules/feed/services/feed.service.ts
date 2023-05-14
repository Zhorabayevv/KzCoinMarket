import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { IGetFeedResponse } from 'src/app/shared/modules/feed/types/getFeedResponse.interface';

@Injectable()
export class FeedService {
  constructor(private http: HttpClient) {}

  getFeed(url: string): Observable<IGetFeedResponse> {
    // const fullUrl = 'http://localhost:9832/v1/api' + url;
    const fullUrl = 'https://conduit.productionready.io/api' + url;
    return this.http.get<IGetFeedResponse>(fullUrl);
  }
}
