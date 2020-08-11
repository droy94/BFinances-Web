import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Dashboard } from "../model/dashboard";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private dashboardUrl = "http://localhost:5000/api/dashboard";

  constructor(private httpClient: HttpClient) {}

  getDashboard(): Observable<Dashboard> {
    return this.httpClient.get<Dashboard>(this.dashboardUrl);
  }
}
