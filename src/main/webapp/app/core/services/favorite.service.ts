import { Injectable } from '@angular/core';
import { FavoritesModel } from 'app/models/favorites.model';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { favorite } from 'app/models/common-api-url.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class FavoriteService {
  constructor(private http: HttpClient) {}

  getFavoriteData(): Observable<FavoritesModel> {
    return this.http.get<FavoritesModel>(SERVER_API_URL + '/' + favorite.favoriteWidgetsUrl);
  }
}
