import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RefreshService {
  private readonly refreshSubject: Subject<boolean>;

  constructor() {
    this.refreshSubject = new Subject<boolean>();
  }

  getSubject(): Subject<boolean> {
    return this.refreshSubject;
  }
  emitValue() {
    this.refreshSubject.next(true);
  }
}
