import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css'],
})
export class EmployeeHomeComponent implements OnInit {
    userItems = [
    {
      "displayName" : "Dashboard",
      "routeName" : "/employee-home/finance-dashboard"

    },{
      "displayName" : "Charts Of Accounts",
      "routeName" : "/employee-home/chart-of-account",
    },{
      "displayName" : "Purchases",
      "routeName" : "/employee-home/purchases",
    },{
      "displayName" : "Sales",
      "routeName" : "/employee-home/sales",
    },
  ]
  chartAccountBoolean: boolean = false;
  dashboardBoolean: boolean = false;
  purchasesBoolean: boolean = false;

  sub!: Subscription;

  constructor(public route_ : Router,private authService:AuthService) {}

  ngOnInit(): void {}

  loadUserInformationComponent(componentName: string) {
    this.route_.navigate([
      `${componentName.toLowerCase()}`,
    ]);
  }

  logoutUser(){
    this.authService.logout();
    this.route_.navigate(['']);
  }
}
