import {provideRouter} from '@angular/router';

// Routes
import {AuthorsRoutes} from '../authors/authors.routes';
import {BooksRoutes} from '../books/books.routes';
import {SongsRoutes} from '../songs/songs.routes';


export const routes = [
  ...AuthorsRoutes,
  ...BooksRoutes,
  ...SongsRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
