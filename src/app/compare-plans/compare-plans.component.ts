import { Component, OnInit } from '@angular/core';
import {PlanServiceService} from '../plan-service.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-compare-plans',
  templateUrl: './compare-plans.component.html',
  styleUrls: ['./compare-plans.component.css']
})
export class ComparePlansComponent implements OnInit {

  plans: any[] ;

  constructor(private planService: PlanServiceService,
              private _route: Router) { }

  ngOnInit() {

    this.planService.getPlans()
      .subscribe(
        (data) => {
          this.plans = data;
        }
      );
  }

  showPlanDetails(id: number): void {

    this._route.navigate(['plan', id]);
  }

}
