import {Component, OnInit} from '@angular/core';
import {ContentService} from './services/content.service';
import {ContentItem} from './models/content-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'random';

  platforms: ContentItem[];
  platform: string;
  cyclePlatform: string;

  games: ContentItem[];
  game: string;
  cycleGame: string;

  max = 100;

  constructor(private content: ContentService) {
  }
  ngOnInit() {
    this.getPlatforms();
  }

  getPlatforms() {
    this.content.getPlatforms().subscribe(items => {
      this.platforms = items;
      this.cyclePlatforms();
    });
  }

  cyclePlatforms() {
    const count = 0;
    this.thePlatformTimeout(count);
  }

  thePlatformTimeout(count: number) {
    setTimeout(() => {
      const r = this.random(0, this.platforms.length - 1);
      this.cyclePlatform = this.platforms[r].name;
      if (count < this.max) {
        count++;
        this.thePlatformTimeout(count);
      } else {
        this.onPlatformSelect(this.cyclePlatform);
      }
    }, 100);
  }

  theGameTimeout(count: number) {
    setTimeout(() => {
      this.cycleGame = this.games[this.random(0, this.games.length - 1)].name;
      if (count < this.max) {
        count++;
        this.theGameTimeout(count);
      }
    }, 100);
  }

  cycleGames() {
    const count = 0;
    this.theGameTimeout(count);
  }

  getGames(platform: string) {
    this.content.getGames(platform).subscribe(items => {
      this.games = items;
      this.cycleGames();
    });
  }

  onPlatformSelect(platform: string) {
    this.platform = platform;
    this.getGames(this.platform);
  }

  random(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
