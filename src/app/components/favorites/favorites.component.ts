import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { Photo } from "../photos/photos.component";
import { FavoritesService } from "./favorites.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  providers:[FavoritesService]
})
export class FavoritesComponent implements OnInit {
  public photos$!: Observable<Array<Photo>>;
  public isLoading: boolean = false;

  constructor(
    private favoritesService: FavoritesService,
    private router: Router,
  ) {}

  public ngOnInit() {
    this.photos$ = this.favoritesService.state$ as Observable<Array<Photo>>;
  }

  public onClick(photo: Photo): void {
    this.isLoading = true;
    this.router.navigateByUrl(photo.id).then(() => {
      this.isLoading = false;
    });
  }
}
