import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private _activatedRoute: ActivatedRoute,
              private _route: Router) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  showCart(): void{
    this._route.navigate(['/cart'], {queryParams: {from: 'compare'}});
  }

  showHome(): void{
    this._route.navigate(['/']);
  }

}
