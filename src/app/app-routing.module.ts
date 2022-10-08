import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/photos/photos.module').then(m => m.PhotosModule) },
  {
    path: 'favorites', loadChildren: () => import('./components/favorites/favorites.module').then(m => m.FavoritesModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
