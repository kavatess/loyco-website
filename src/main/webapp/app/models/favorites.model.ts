export class FavoritesModel {
  items: Items[] = [];
  count = 1;
  hasMore = false;
  limit = 1;
  offset = 1;
  links: Links[] = [];
}
export interface Items {
  FavoriteWidgets: string;
}
export interface Links {
  rel: string;
  href: any;
  name: string;
  kind: string;
}
