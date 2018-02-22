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
    //this._routeParamSubscription.unsubscribe();
  }

  constructor(private _route: Router,
              private _activatedRoute: ActivatedRoute,
              private planService: PlanServiceService,
              private sessionService: SessionServiceService) {

    console.log('loading plan details comp ...');

    this._activatedRoute.queryParams.subscribe(
      (qparams: Params) => {

        const from = qparams['from'];
        console.log('from >> ' + from);
        if (from && from === 'compare') {
          this._routeParamSubscription = this._activatedRoute.params.subscribe((params: Params) => {
            this._planId = params['id'];
            if (!(this._plan && this._planId === this._plan.id)) {
              this.planService.getPlanVasDetails(this._planId).subscribe(
                (data) => {
                  if (!(this._plan && this._plan.id === data.id)) {
                    this._plan = data;
                    this.planService.setActivatedPlan(this._plan);
                  }
                }
              );
            }
          });
        } else {
          this._plan = this.planService.getActivatedPlan();
        }
      }
    );


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
