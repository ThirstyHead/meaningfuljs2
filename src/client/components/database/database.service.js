/*global PouchDB */
'use strict';

import {Injectable} from '@angular/core';

/**
 * Returns a connection to a CouchDB/PouchDB database
 */
@Injectable()
export class DatabaseService{
  constructor(){
    this.remoteAddress = 'localhost';
    this.remotePort = '5984';
  }

  static get parameters() {
  }

  connectToSynchronizedDatabase(dbName){
    let db = new PouchDB(dbName, {adapter: 'memory'});
    let remoteUrl = `http://${this.remoteAddress}:${this.remotePort}/${dbName}`;
    db.replicate.from(remoteUrl, {
      live: true,
      retry: true
    }).on('paused', () => console.log(`Replication with ${dbName} paused.`) )
      .on('active', () => console.log(`Replication with ${dbName} active:`) )
      .on('error', function (err) {
        console.log(`Error with ${dbName}:`);
        console.dir(err);
      });
    return db;
  }

  connectToRemoteDatabase(dbName){
    let remoteUrl = `http://${this.remoteAddress}:${this.remotePort}/${dbName}`;
    let db = new PouchDB(remoteUrl);
    return db;
  }

  connectToLocalDatabase(dbName){
    let db = new PouchDB(dbName);
    return db;
  }

}
