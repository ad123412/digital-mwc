import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {ComparePlansComponent} from './compare-plans/compare-plans.component';
import {PlanDetailsComponent} from './plan-details/plan-details.component';
import {ShoppingCartDetailsComponent} from './shopping-cart-details/shopping-cart-details.component';
import {FormsModule} from '@angular/forms';
import {APP_BASE_HREF} from '@angular/common';
import {HttpModule} from '@angular/http';
import {PlanServiceService} from './plan-service.service';
import {SessionServiceService} from "./session-service.service";

const _appRoutes: Routes = [
  { path: '', component: ComparePlansComponent},
  { path: 'plan/:id', component: PlanDetailsComponent},
  { path: 'cart', component: ShoppingCartDetailsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ComparePlansComponent,
    PlanDetailsComponent,
    ShoppingCartDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(_appRoutes),
    HttpModule
  ],
  providers: [{provide: APP_BASE_HREF, useValue: '/'},
    PlanServiceService,
    SessionServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
