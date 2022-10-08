import { Injectable } from '@angular/core';
import { StoreService } from "../../services/store.service";
import { ApiService } from "../../services/api.service";
import { Photo } from "../photos/photos.component";

@Injectable()
export class FavoritesService extends StoreService<Array<Photo>>{
  constructor(private apiService: ApiService) {
    super();
    this.loadFavoritePhotos()
  }

  public loadFavoritePhotos(): void {
    const existedPhotos = this.state as Array<Photo>;
    this.apiService.loadFavoriteList().subscribe(loadedPhotos => {
      if (existedPhotos) {
        this.setState([...existedPhotos, ...loadedPhotos]);
        return;
      }
      this.setState(loadedPhotos);
    })
  }

  public addFavoritePhoto(photo: Photo): void {
    this.apiService.addFavoritePhoto(photo);
  }
}
