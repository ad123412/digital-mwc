import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SessionServiceService {

  constructor() { console.log('session service created >>>>>>>>>>>>>>>>'); }

  private subject = new BehaviorSubject<any>(undefined);

  addPlan(plan: any) {
    this.subject.next(plan);
  }

  getPlan(): Observable<any> {
    return this.subject.asObservable();
  }
}
