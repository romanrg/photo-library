import { Component, OnInit } from '@angular/core';
import { map, Observable } from "rxjs";
import { PhotosService } from "./photos.service";
import { ApiService } from "../../services/api.service";

export type Photo = {
  id: string,
  author: string,
  width: number,
  height: number,
  url: string,
  download_url: string
};


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {

  public photos$!: Observable<Array<Photo>>;
  public isLoading: boolean = false;
  private currentPage = 1;

  constructor(
    private photosService: PhotosService,
    private apiService: ApiService,
  ) {}

  public ngOnInit() {
    this.photos$ = this.photosService.state$.pipe(map(data => {
      this.isLoading = false;
      return data as Array<Photo>;
    }));
  }

  public onClick(photo: Photo): void {
    this.apiService.addFavoritePhoto(photo);
  }

  public loadMore(): void {
    this.isLoading = true;
    this.currentPage = this.currentPage + 1;
    this.photosService.loadPhotos(this.currentPage)
  }

}
