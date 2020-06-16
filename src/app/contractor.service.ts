import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Contractor } from "./contractor";

@Injectable({
  providedIn: "root",
})
export class ContractorService {
  private contractorsUrl = "http://localhost:5000/api/contractors";

  constructor(private httpClient: HttpClient) {}

  getContractors(): Observable<Contractor[]> {
    return this.httpClient.get<Contractor[]>(this.contractorsUrl);
  }
}
