import { Component } from '@angular/core';
import { PhotosService } from "./components/photos/photos.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [PhotosService],
})
export class AppComponent {}
