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
  activatedServicessubscription: Subscription;
  checkedInServices: any[] = [];
  allServices: any;

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.activatedServicessubscription.unsubscribe();
  }

  constructor(private sessionServices: SessionServiceService,
              private _route: Router) {

    this.activatedServicessubscription = this.sessionServices.getActivatedPlan()
      .subscribe(
        (activatedServices: any) => {
          this.allServices = activatedServices;
          for (const service of activatedServices.services) {
            if (service.checked) {
              this.checkedInServices.push(service);
            }
          }
        }
      );

    this.subscription = this.sessionServices.getPlan()
      .subscribe((plan) => {
          this.checkedInPlan = plan;
        }
      );
  }

  ngOnInit() {}

  isAddingNewServicesRequired(): boolean {

    return this.checkedInPlan.services.length !== this.checkedInServices.length;
  }

  navigateToPlanDetails() {
    this._route.navigate(['/plan', this.checkedInPlan.id]);
  }

}
