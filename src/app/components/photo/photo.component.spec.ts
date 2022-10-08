import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoComponent } from './photo.component';
import { ActivatedRoute, Router } from "@angular/router";
import createSpy = jasmine.createSpy;
import { Photo } from "../photos/photos.component";
import { ApiService } from "../../services/api.service";
import { of } from "rxjs";

describe('PhotoComponent', () => {
  let component: PhotoComponent;
  let fixture: ComponentFixture<PhotoComponent>;
  let mockedPhoto: Photo = {
    id: '0',
    author: 'mock',
    width: 500,
    height: 200,
    url: 'mock_url',
    download_url: 'mock_download_url'
  }
  let navigateByUrl = createSpy();
  let removeFromFavorite = createSpy();
  let mockedParamMap = new Map();
  mockedParamMap.set('id', mockedPhoto.id);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            data: of(mockedPhoto),
            snapshot: {
              paramMap: mockedParamMap
            }
          }
        },
        {
          provide: ApiService,
          useValue: {
            removeFromFavorite: removeFromFavorite
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

    fixture = TestBed.createComponent(PhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be able to remove photo', () => {
    component.remove();
    expect(removeFromFavorite).toHaveBeenCalled();
  });

  it('should navigate to favorites after remove photo', () => {
    component.remove();
    expect(navigateByUrl).toHaveBeenCalled();
  });
});
