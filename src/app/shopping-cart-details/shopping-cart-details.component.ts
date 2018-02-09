import {Component, OnDestroy, OnInit} from '@angular/core';
import {SessionServiceService} from '../session-service.service';
import {Subscription} from 'rxjs/Subscription';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-cart-details',
  templateUrl: './shopping-cart-details.component.html',
  styleUrls: ['./shopping-cart-details.component.css']
})
export class ShoppingCartDetailsComponent implements OnInit, OnDestroy {

  checkedInPlan: any;
  subscription: Subscription;
  checkedInServices: any[] = [];

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  constructor(private sessionServices: SessionServiceService,
              private _route: Router) {

    this.subscription = this.sessionServices.getPlan().subscribe((plan) => {

      this.checkedInPlan = plan;
      for (const service of plan.services) {
        if ( service.checked) {
          this.checkedInServices.push(service);
        }
      }
    });
  }

  ngOnInit() {}

  isAddingNewServicesRequired(): boolean {

    return this.checkedInPlan.services.length !== this.checkedInServices.length;
  }

  navigateToPlanDetails() {
    this._route.navigate(['/plan', this.checkedInPlan.id]);
  }

}
