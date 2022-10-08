import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from "./favorites.component";
import { PhotoComponent } from "../photo/photo.component";
import { PhotoResolver } from "../photo/photo.resolver";

const routes: Routes = [
  {
    path: '',
    component: FavoritesComponent,
  },
  {
    path: ':id',
    component: PhotoComponent,
    resolve: {
      photo: PhotoResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FavoritesRoutingModule { }
