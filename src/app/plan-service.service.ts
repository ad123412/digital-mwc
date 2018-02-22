import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class PlanServiceService {

  private plans: any[];
  private subject = new BehaviorSubject<any>(undefined);

  private activatedPlan;

  constructor(private _http: Http) {

    this._http.get('/json/plans.json')
      .map((response: Response) => response.json())
      .subscribe((data) => {
        this.plans = data;
      });
  }

  getPlans() {
    return this._http.get('/json/plans.json')
      .map((response: Response) => response.json());
    // return this.subject.next(this.plans) ;
  }

  getPlanDetails(id: number) {

    console.log('inside getPlanDetails >>>>>>>> ' + id);
    return this._http.get('/json/plans.json')
      .map((response: Response) => {
          const plans = response.json();
          let p;
          for (const plan of plans) {
            if (plan.id === +id) {
              p = plan;
              break;
            }
          }
          return p;
      });
  }

  getPlanVasDetails(id: number) {

    const baseUrl = 'http://52.187.0.73:3000/vas/plan/';

    return this._http.get(baseUrl + id)
      .map((response: Response) => {
        console.log(response.json());
        const plans = response.json();
        return plans;
      });
  }

  setActivatedPlan(plan) {
    this.activatedPlan = plan;
  }

  getActivatedPlan() {
    return this.activatedPlan;
  }
}

