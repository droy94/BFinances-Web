import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { InvoicesComponent } from "./invoices/invoices.component";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { BreadcrumbModule } from "angular-crumbs";
import { MatDividerModule } from "@angular/material/divider";
import {
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
} from "@angular/material";

import { registerLocaleData } from "@angular/common";
import localePl from "@angular/common/locales/pl";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule,
} from "@angular/material-moment-adapter";

registerLocaleData(localePl);

import { AddInvoiceComponent } from "./add-invoice/add-invoice.component";
import { ExpensesComponent } from './expenses/expenses/expenses.component';
import { AddExpenseComponent } from './expenses/add-expense/add-expense.component';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';

@NgModule({
  declarations: [AppComponent, InvoicesComponent, AddInvoiceComponent, ExpensesComponent, AddExpenseComponent, DashboardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatTableModule,
    MatToolbarModule,
    MatButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    BreadcrumbModule,
    MatDividerModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: "pl",
    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    { provide: MAT_DATE_LOCALE, useValue: "pl" },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
