import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from "./favorites.component";
import { FavoritesRoutingModule } from "./favorites-routing.module";
import { MatGridListModule } from "@angular/material/grid-list";
import { PhotoComponent } from "../photo/photo.component";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";



@NgModule({
  declarations: [FavoritesComponent, PhotoComponent],
    imports: [
        CommonModule,
        FavoritesRoutingModule,
        MatGridListModule,
        MatButtonModule,
        MatProgressSpinnerModule
    ]
})
export class FavoritesModule { }
