import { BrowserModule } from "@angular/platform-browser";
import { NgModule, LOCALE_ID } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import {
  MatFormFieldModule,
  MatInputModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
  MatSelectModule,
} from "@angular/material";
import { FormsModule } from "@angular/forms";
import { registerLocaleData } from "@angular/common";
import localePl from "@angular/common/locales/pl";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MatMomentDateModule,
} from "@angular/material-moment-adapter";

registerLocaleData(localePl);

import { ExpensesComponent } from "./expenses/expenses/expenses.component";
import { AddExpenseComponent } from "./expenses/add-expense/add-expense.component";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { BreadcrumbComponent } from "./breadcrumb/breadcrumb.component";
import { InvoicesComponent } from "./invoices/invoices/invoices.component";
import { AddInvoiceComponent } from "./invoices/add-invoice/add-invoice.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

@NgModule({
  declarations: [
    AppComponent,
    InvoicesComponent,
    AddInvoiceComponent,
    ExpensesComponent,
    AddExpenseComponent,
    DashboardComponent,
    BreadcrumbComponent,
  ],
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
    MatSelectModule,
    FormsModule,
    BreadcrumbModule,
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
