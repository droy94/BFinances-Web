import { AddInvoiceComponent } from "./add-invoice/add-invoice.component";
import { InvoicesComponent } from "./invoices/invoices.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  { path: "invoices", component: InvoicesComponent },
  { path: "addinvoice", component: AddInvoiceComponent },
  { path: "", redirectTo: "/invoices", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
