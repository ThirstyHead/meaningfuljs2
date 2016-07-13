import {provideRouter} from '@angular/router';

// Routes
import {AuthorsRoutes} from '../authors/authors.routes';
import {BooksRoutes} from '../books/books.routes';

export const routes = [
  ...AuthorsRoutes,
  ...BooksRoutes
];

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];
