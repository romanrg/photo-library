import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Photo, PhotosComponent } from './photos.component';
import { ApiService } from "../../services/api.service";
import { PhotosService } from "./photos.service";
import { of } from "rxjs";

describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;
  let mockedPhoto: Photo = {
    id: '0',
    author: 'mock',
    width: 500,
    height: 200,
    url: 'mock_url',
    download_url: 'mock_download_url'
  }
  let mockedApiService = jasmine.createSpyObj('ApiService', ['addFavoritePhoto']);
  let mockedLoadPhotos = jasmine.createSpy();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        PhotosComponent,
      ],
      providers: [
        { provide: ApiService, useValue: mockedApiService },
        {
          provide: PhotosService,
          useValue: {
            state$: of([]),
            loadPhotos: mockedLoadPhotos
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add favorite photo on click', () => {
    fixture.componentInstance.onClick(mockedPhoto);
    expect(mockedApiService.addFavoritePhoto).toHaveBeenCalledWith(mockedPhoto)
  });

  describe('should be able to load more photos', () => {
    it('should change isLoading state on', () => {
      fixture.componentInstance.loadMore();
      expect(fixture.componentInstance.isLoading).toBeTrue()
    });

    it('should load more photos', () => {
      fixture.componentInstance.loadMore();
      expect(mockedLoadPhotos).toHaveBeenCalled()
    });

    it('should increase current page by one', () => {
      fixture.componentInstance.loadMore();
      expect(mockedLoadPhotos).toHaveBeenCalledWith(2)
      fixture.componentInstance.loadMore();
      expect(mockedLoadPhotos).toHaveBeenCalledWith(3)
    });
  })
});
