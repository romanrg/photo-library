import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { delay, map, Observable, of } from "rxjs";
import { Photo } from "../components/photos/photos.component";
import { API, STORAGE_KEYS } from "../contstants/api";
import { LocalStorageService } from "./local-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  public loadPhotoList(page: number, limit = 27): Observable<Array<Photo>> {
    return this.http.get<Array<Photo>>(`${API.list}?page=${page}&limit=${limit}`).pipe(
      map(list => {
        list.forEach(item => item.download_url = `${API.id}/${item.id}/300/200`)
        return list;
      }),
      delay(300)
    )
  }

  public loadImageById(id: string): Observable<any> {
    return this.http.get(`${API.id}/${id}/900/900`, {
      observe: 'response',
      responseType: "blob"
    }).pipe(
      delay(300)
    )
  }

  public loadFavoriteList(): Observable<Array<Photo>> {
    const storedData = this.localStorage.getData(STORAGE_KEYS.favorite);
    if (storedData) {
      return of(JSON.parse(storedData));
    }
    this.localStorage.saveData(STORAGE_KEYS.favorite, JSON.stringify([]));
    return of([]);
  }

  public addFavoritePhoto(photo: Photo): void {
    const favorites = JSON.parse(this.localStorage.getData(STORAGE_KEYS.favorite) as string);
    if (favorites) {
      favorites.push(photo);
      this.localStorage.saveData(STORAGE_KEYS.favorite, JSON.stringify(favorites));
      return;
    }
    this.localStorage.saveData(STORAGE_KEYS.favorite, JSON.stringify([photo]));
  }

  public removeFromFavorite(id: string): void {
    let favorites = JSON.parse(this.localStorage.getData(STORAGE_KEYS.favorite) as string) as Array<Photo>;
    this.localStorage.saveData(STORAGE_KEYS.favorite, JSON.stringify(favorites.filter(photo => photo.id !== id)))
  }
}
