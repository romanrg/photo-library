import { ApiService } from "./api.service";
import { Photo } from "../components/photos/photos.component";
import { of } from "rxjs";
import { TestBed } from "@angular/core/testing";
import { HttpClient } from "@angular/common/http";
import createSpy = jasmine.createSpy;
import { API, STORAGE_KEYS } from "../contstants/api";
import { LocalStorageService } from "./local-storage.service";

describe('ApiService', () => {
  let service: ApiService;
  let mockedPhoto: Photo = {
    id: '0',
    author: 'mock',
    width: 500,
    height: 200,
    url: 'mock_url',
    download_url: 'mock_download_url'
  }
  let httpClientSpy = createSpy().and.returnValue(of([mockedPhoto]));
  let getDataSpy = createSpy();
  let saveDataSpy = createSpy();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        { provide: HttpClient, useValue: { get: httpClientSpy } },
        {
          provide: LocalStorageService,
          useValue: {
            getData: getDataSpy,
            saveData: saveDataSpy
          }
        }
      ],
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#loadPhotoList', (done) => {
    const pageNum = 27;
    service.loadPhotoList(pageNum).subscribe(data => {
      expect(data[0].download_url).toEqual(`${API.id}/${data[0].id}/300/200`);
      done();
    });
    expect(httpClientSpy).toHaveBeenCalled();
  });

  it('#loadImageById', (done) => {
    service.loadImageById(mockedPhoto.id).subscribe(data => {
      expect(data[0].id).toEqual(mockedPhoto.id);
      done();
    })

    expect(httpClientSpy).toHaveBeenCalled();
  });

  it('#loadFavoriteList return empty array if no fav photos was selected', (done) => {
    getDataSpy.and.returnValue(null);
    service.loadFavoriteList().subscribe(data => {
      expect(data).toEqual([]);
      done();
    })
  });

  it('#loadFavoriteList', (done) => {
    getDataSpy.and.returnValue(JSON.stringify([mockedPhoto]))
    service.loadFavoriteList().subscribe(data => {
      expect(data).toEqual([mockedPhoto]);
      done();
    })
  });

  it('#addFavoritePhoto', (done) => {
    getDataSpy.and.returnValue(JSON.stringify([mockedPhoto]))
    service.addFavoritePhoto(mockedPhoto);
    service.loadFavoriteList().subscribe(data => {
      expect(data).toEqual([mockedPhoto]);
      done();
    })
  });
  it('#removeFromFavorite', () => {
    getDataSpy.and.returnValue(JSON.stringify([mockedPhoto]))
    service.removeFromFavorite(mockedPhoto.id);
    expect(saveDataSpy).toHaveBeenCalledWith(STORAGE_KEYS.favorite, JSON.stringify([]));
  });
});
