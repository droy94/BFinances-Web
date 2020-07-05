import { AddInvoiceComponent } from "./add-invoice/add-invoice.component";
import { InvoicesComponent } from "./invoices/invoices.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "invoices",
    component: InvoicesComponent,
    data: { breadcrumb: "Faktury" },
  },
  {
    path: "addinvoice",
    component: AddInvoiceComponent,
    data: { breadcrumb: "Dodaj fakturę" },
  },
  {
    path: "editInvoice/:id",
    component: AddInvoiceComponent,
    data: { breadcrumb: "Edycja faktury" },
  },
  { path: "", redirectTo: "/invoices", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
