import { TestBed } from '@angular/core/testing';

import { PhotosService } from './photos.service';
import { ApiService } from "../../services/api.service";
import { FavoritesService } from "../favorites/favorites.service";
import { of } from "rxjs";
import {Photo} from "./photos.component";

describe('PhotosService', () => {
  let service: PhotosService;
  let mockedPhoto: Photo = {
    id: '0',
    author: 'mock',
    width: 500,
    height: 200,
    url: 'mock_url',
    download_url: 'mock_download_url'
  }
  let mockedLoadPhotos = jasmine.createSpy().and.returnValue(of([mockedPhoto]));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PhotosService,
        {
          provide: FavoritesService,
          useValue: {}
        },
        {
          provide: ApiService,
          useValue: {
            loadPhotoList: mockedLoadPhotos
          }
        },
      ],
    });
    service = TestBed.inject(PhotosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(mockedLoadPhotos).toHaveBeenCalledWith(1);
    expect(service.state).toEqual([mockedPhoto]);
  });

  it('should load photos', () => {
    service.loadPhotos(2);
    expect(mockedLoadPhotos).toHaveBeenCalledWith(2);
    expect(service.state).toEqual([mockedPhoto, mockedPhoto]);
  });
});
