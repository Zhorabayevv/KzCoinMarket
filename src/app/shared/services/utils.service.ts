import { Injectable } from "@angular/core";

@Injectable()
export class UtilsService {
  range(start: number, end: number) {
    return [...Array(end).keys()].map(i => i + start);
  }
}
