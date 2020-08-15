import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { InvoicesComponent } from "./invoices/invoices/invoices.component";
import { AddInvoiceComponent } from "./invoices/add-invoice/add-invoice.component";
import { ExpensesComponent } from "./expenses/expenses/expenses.component";
import { AddExpenseComponent } from "./expenses/add-expense/add-expense.component";

const routes: Routes = [
  {
    path: "",
    data: { breadCrum: "Start" },
    children: [
      {
        path: "",
        component: DashboardComponent,
        data: { breadCrum: "Dashboard" },
      },
      {
        path: "invoices",
        component: InvoicesComponent,
        data: { breadCrum: "Faktury" },
      },
      {
        path: "addinvoice",
        component: AddInvoiceComponent,
        data: { breadCrum: "Dodaj fakturę" },
      },
      {
        path: "editInvoice/:id",
        component: AddInvoiceComponent,
        data: { breadCrum: "Edycja faktury" },
      },
      {
        path: "expenses",
        component: ExpensesComponent,
        data: { breadCrum: "Wydatki" },
      },
      {
        path: "addExpenses",
        component: AddExpenseComponent,
        data: { breadCrum: "Dodaj wydatek" },
      },
      {
        path: "editExpense/:id",
        component: AddExpenseComponent,
        data: { breadCrum: "Edycja wydatku" },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
