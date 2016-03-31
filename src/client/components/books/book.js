'use strict';

export class Book{
    constructor(input){
        this.id = input.id || 0;
        this.title = input.title || '';
        this.pages = input.pages || 0;
        this.format = input.format || '';
    }
}
