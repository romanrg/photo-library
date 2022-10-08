import { TestBed } from '@angular/core/testing';
import { FavoritesService } from "./favorites.service";
import { ApiService } from "../../services/api.service";
import createSpy = jasmine.createSpy;
import { of } from "rxjs";
import { Photo } from "../photos/photos.component";

describe('FavoritesService', () => {
  let service: FavoritesService;
  let mockedPhoto: Photo = {
    id: '0',
    author: 'mock',
    width: 500,
    height: 200,
    url: 'mock_url',
    download_url: 'mock_download_url'
  }
  let mockedLoadFavoriteList = createSpy().and.returnValue(of([mockedPhoto]));
  let addFavoritePhoto = createSpy().and.returnValue(undefined);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FavoritesService,
        {
          provide: ApiService,
          useValue: {
            loadFavoriteList: mockedLoadFavoriteList,
            addFavoritePhoto: addFavoritePhoto,
          }
        }
      ]
    });
    service = TestBed.inject(FavoritesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load favorite photos', () => {
    service.loadFavoritePhotos();
    expect(service.state).toEqual([mockedPhoto,mockedPhoto])
    expect(mockedLoadFavoriteList).toHaveBeenCalled()
  });

  it('should add favorite photo', () => {
    service.addFavoritePhoto(mockedPhoto);
    expect(addFavoritePhoto).toHaveBeenCalledWith(mockedPhoto);
  });
});
