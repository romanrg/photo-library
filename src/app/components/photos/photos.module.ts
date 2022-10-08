import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from "./photos.component";
import { PhotosRoutingModule } from "./photos-routing.module";
import { MatGridListModule } from "@angular/material/grid-list";
import { InfiniteScrollDirective } from "../../directives/infinite-scroll.directive";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";

@NgModule({
  declarations: [
    PhotosComponent,
    InfiniteScrollDirective
  ],
  imports: [
    CommonModule,
    PhotosRoutingModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ]
})
export class PhotosModule { }
