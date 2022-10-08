import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Photo } from "../photos/photos.component";
import { Observable } from "rxjs";
import { ApiService } from "../../services/api.service";

@Injectable({ providedIn: 'root' })
export class PhotoResolver implements Resolve<Photo> {
  constructor(private apiService: ApiService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Photo>|Promise<Photo>|Photo {
    return this.apiService.loadImageById(route.params?.["id"]);
  }
}
