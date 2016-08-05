'use strict';

import {Component} from '@angular/core';
import {SongsService} from './songs.service';

@Component({
  selector: 'my-songs',
  templateUrl: 'components/songs/songs.component.html',
  styleUrls: ['components/songs/songs.component.css']
})
export class SongsComponent {
  constructor(songsService){
    this.songsService = songsService;
    this.title = 'Songs';
    this.songs = [];
  }

  static get parameters() {
    return [[SongsService]];
  }

  ngOnInit() {
    this.getList();

    // set up event listener on SongsService
    this.songsService.getChanges()
                     .subscribe(
                       event => this.getList(event),
                       error => console.log(error)
                     );
  }

  getList() {
    this.songsService.getList()
                     .subscribe(
                       (songs) => this.songs = songs,
                       (error) => this.errorMessage = error
                     );
  }
}
