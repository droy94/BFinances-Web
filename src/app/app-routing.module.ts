import { ExpensesComponent } from "./expenses/expenses/expenses.component";
import { AddInvoiceComponent } from "./add-invoice/add-invoice.component";
import { InvoicesComponent } from "./invoices/invoices.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddExpenseComponent } from "./expenses/add-expense/add-expense.component";

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
  {
    path: "expenses",
    component: ExpensesComponent,
    data: { breadcrumb: "Wydatki" },
  },
  {
    path: "addExpenses",
    component: AddExpenseComponent,
    data: { breadcrumb: "Dodaj wydatek" },
  },
  {
    path: "editExpense/:id",
    component: AddExpenseComponent,
    data: { breadcrumb: "Edycja wydatku" },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
