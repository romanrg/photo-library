import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritesComponent } from './favorites.component';
import { ApiService } from "../../services/api.service";
import { of } from "rxjs";
import createSpy = jasmine.createSpy;
import { Photo } from "../photos/photos.component";
import { Router } from "@angular/router";

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
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
  let navigateByUrl = createSpy().and.returnValue(new Promise(() => undefined));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavoritesComponent ],
      providers: [
        {
          provide: ApiService,
          useValue: {
            loadFavoriteList: mockedLoadFavoriteList,
            addFavoritePhoto: addFavoritePhoto,
          }
        },
        {
          provide: Router,
          useValue: {
            navigateByUrl: navigateByUrl
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change isLoading onClick', () => {
    component.onClick(mockedPhoto);
    expect(component.isLoading).toEqual(true);
  });

  it('should navigate for specific photo route onclick', () => {
    component.onClick(mockedPhoto);
    expect(component.isLoading).toEqual(true);
    expect(navigateByUrl).toHaveBeenCalledWith(mockedPhoto.id);
  });
});
