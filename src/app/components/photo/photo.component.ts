import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { map, Observable } from "rxjs";
import { Photo } from "../photos/photos.component";
import { ApiService } from "../../services/api.service";

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.scss']
})
export class PhotoComponent implements OnInit {

  photo$!: Observable<Photo>

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) {}

  public ngOnInit(): void {
    this.photo$ = this.activatedRoute.data.pipe(map(data => data?.['photo']))
  }

  public remove() {
    this.apiService.removeFromFavorite(this.activatedRoute.snapshot.paramMap.get('id') as string)
    this.router.navigateByUrl('/favorites');
  }
}
