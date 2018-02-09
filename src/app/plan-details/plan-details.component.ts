import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PlanServiceService} from '../plan-service.service';
import {Subscription} from 'rxjs/Subscription';
import {SessionServiceService} from '../session-service.service';

@Component({
  selector: 'app-plan-details',
  templateUrl: './plan-details.component.html',
  styleUrls: ['./plan-details.component.css']
})
export class PlanDetailsComponent implements OnInit, OnDestroy {

  _routeParamSubscription: Subscription;
  _planId: number;
  _plan: any;

  ngOnDestroy(): void {
    this._routeParamSubscription.unsubscribe();
  }

  constructor(private _route: Router,
              private _activatedRoute: ActivatedRoute,
              private planService: PlanServiceService,
              private sessionService: SessionServiceService) {

    console.log('loading plan details comp ...');
    this._routeParamSubscription = this._activatedRoute.params.subscribe((params: Params) => {
      this._planId = params['id'];
      this.planService.getPlanDetails(this._planId).subscribe(
        (data) => {
          if (!(this._plan && this._plan.id === data.id)) {
            this._plan = data;
          }
        }
      );
    });
  }

  ngOnInit() {}

  returnToComparison() {
    this._route.navigate(['']);
  }

  addToCart() {

    this.sessionService.addPlan(this._plan);
    this._route.navigate(['cart']);
  }

}
