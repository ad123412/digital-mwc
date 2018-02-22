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
  _activatedPlanServices: any;

  ngOnDestroy(): void {
     this._routeParamSubscription.unsubscribe();
  }

  constructor(private _route: Router,
              private _activatedRoute: ActivatedRoute,
              private planService: PlanServiceService,
              private sessionService: SessionServiceService) {

    console.log('loading plan details comp ...');

    this._routeParamSubscription = this._activatedRoute.params.subscribe(
      (params: Params) => {
        this._planId = params['id'];
        this._activatedRoute.queryParams.subscribe(
          (qparams: Params) => {
            const from = qparams['from'];
            if (from && from === 'compare') {
              this.planService.getPlanVasDetails(this._planId).subscribe(
                (data) => {
                  this.sessionService.setActivatedPlan(data);
                }
              );
            } else {

            }
          }
        );
      }
    );

    this.sessionService.getActivatedPlan().subscribe(
      (activatedPlanServices: any) => {
        this._activatedPlanServices = activatedPlanServices;
      }
    );
  }

  ngOnInit() {}

  returnToComparison() {
    this._route.navigate(['']);
  }

  addToCart() {

    this.planService.getPlanDetails(this._planId)
      .subscribe((data) => {
          this._plan = data;
          this.sessionService.addPlan(data);
          this.sessionService.setActivatedPlan(this._activatedPlanServices);
          this._route.navigate(['cart']);
        }
      );
  }

}
