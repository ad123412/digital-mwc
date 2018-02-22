import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class SessionServiceService {

  private subject = new BehaviorSubject<any>(undefined);
  private activatedPlanSubject = new BehaviorSubject<any>(undefined);

  addPlan(plan: any) {
    this.subject.next(plan);
  }

  getPlan(): Observable<any> {
    return this.subject.asObservable();
  }

  setActivatedPlan(plan: any) {
    this.activatedPlanSubject.next(plan);
  }

  getActivatedPlan(): Observable<any> {
    return this.activatedPlanSubject.asObservable();
  }

}
