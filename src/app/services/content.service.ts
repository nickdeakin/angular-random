import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import {observable, Observable} from 'rxjs';
import {ContentDefinition} from '../interfaces/content.definition';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) { }

  getPlatforms(): Observable<ContentDefinition[]> {
    return this.http.get<ContentDefinition[]>('/assets/content/platforms.json');
  }

  getGames(platform: string): Observable<ContentDefinition[]> {
    let type: string;
    switch (platform) {
      case 'PC/Steam':
        type = 'pc';
        break;
      case 'Windows Store':
        type = 'windows_store';
        break;
      case 'PS4':
        type = 'ps4';
        break;
      case 'Web .io':
        type = 'io';
        break;
      default:
        type = 'pc';
    }
    return this.http.get<ContentDefinition[]>('/assets/content/' + type + '_games.json');
  }
}
