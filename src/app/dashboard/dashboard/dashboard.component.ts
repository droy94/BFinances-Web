import { DashboardService } from "../services/dashboard.service";
import { Component, OnInit } from "@angular/core";
import { Dashboard } from "../model/dashboard";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
})
export class DashboardComponent implements OnInit {
  dashboardData: Dashboard[];
  columnsToDisplay = [
    "grossIncome",
    "payableVat",
    "payablePit",
    "startOfSettlingPeriod",
    "endOfSettlingPeriod",
    "vatSettlementDate",
    "pitSettlementDate",
  ];

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.getDashboard();
  }

  getDashboard() {
    this.dashboardService
      .getDashboard()
      .subscribe((dashboard) => (this.dashboardData = [dashboard]));
  }
}
