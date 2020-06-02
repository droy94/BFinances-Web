import { InvoicesComponent } from "./invoices/invoices.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "invoices", component: InvoicesComponent },
  { path: "", redirectTo: "/invoices", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
