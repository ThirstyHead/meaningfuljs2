'use strict';

import {Component} from '@angular/core';

@Component({
  selector: 'my-songs',
  templateUrl: 'components/songs/songs.component.html',
  styleUrls: ['components/songs/songs.component.css']
})
export class SongsComponent {
  constructor(){
    this.title = 'Songs';
  }
}
