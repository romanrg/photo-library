import { Injectable } from '@angular/core';
import { Photo } from "./photos.component";
import { StoreService } from "../../services/store.service";
import { ApiService } from "../../services/api.service";

@Injectable()
export class PhotosService extends StoreService<Array<Photo>>{
  constructor(private apiService: ApiService) {
    super();
    this.loadPhotos(1);
  }

  public loadPhotos(page: number): void {
    const existedPhotos = this.state as Array<Photo>;
    this.apiService.loadPhotoList(page).subscribe(loadedPhotos => {
      if (existedPhotos) {
        this.setState([...existedPhotos, ...loadedPhotos]);
        return;
      }
      this.setState(loadedPhotos);
    })
  }
}
