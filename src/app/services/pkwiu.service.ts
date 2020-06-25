import { Pkwiu } from "../model/pkwiu";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class PkwiuService {
  private pkwiuUrl = "http://localhost:5000/api/pkwiu";

  constructor(private httpClient: HttpClient) {}

  getPkwiu(): Observable<Pkwiu[]> {
    return this.httpClient.get<Pkwiu[]>(this.pkwiuUrl);
  }
}
