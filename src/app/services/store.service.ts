import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
} from "rxjs";

@Injectable()
export class StoreService<T> {
  public state$: Observable<T | undefined>;

  public get state() {
    return this._state$.getValue();
  }

  public setState(state: T): void {
    this._state$.next(state);
  }

  private _state$: BehaviorSubject<T | undefined>;

  constructor() {
    this._state$ = new BehaviorSubject(undefined) as BehaviorSubject<T | undefined>;
    this.state$ = this._state$.asObservable();
  }

}
