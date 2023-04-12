import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartOfAccountComponent } from './accounts/chart-of-account/chart-of-account.component';
import { ChooseAccountComponent } from './accounts/choose-account/choose-account.component';
import { ListAccountComponent } from './accounts/list-account/list-account.component';
import { MainAccountComponent } from './accounts/main-account/main-account.component';
import { SubAccountComponent } from './accounts/sub-account/sub-account.component';
import { LoginComponent } from './auth/login/login.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { SystemChoiceComponent } from './auth/system-choice/system-choice.component';
import { AllEmployeesComponent } from './Employee/all-employees/all-employees.component';
import { EmployeeHomeComponent } from './Employee/main-page/employee-home/employee-home.component';
import { EmployeeRegisterComponent } from './Employee/employee-register/employee-register.component';
import { MainPageComponent } from './Employee/main-page/main-page.component';
import { AddBankPaymentComponent } from './Finance/add-bank-payment/add-bank-payment.component';
import { AddBankPettyComponent } from './Finance/add-bank-petty/add-bank-petty.component';
import { AddCashPaymentComponent } from './Finance/add-cash-payment/add-cash-payment.component';
import { AddCashPettyComponent } from './Finance/add-cash-petty/add-cash-petty.component';
import { AddNewItemComponent } from './Finance/add-new-item/add-new-item.component';
import { AddNonPurchaseSalesComponent } from './Finance/add-non-purchase-sales/add-non-purchase-sales.component';
import { AddPurchaseReturnComponent } from './Finance/add-purchase-return/add-purchase-return.component';
import { AddPurchaseSalesComponent } from './Finance/add-purchase-sales/add-purchase-sales.component';
import { AddPurchaseComponent } from './Finance/add-purchase/add-purchase.component';
import { AddVendorComponent } from './Finance/add-vendor/add-vendor.component';
import { BankPaymentComponent } from './Finance/bank-payment/bank-payment.component';
import { BankPettyComponent } from './Finance/bank-petty/bank-petty.component';
import { CashPaymentComponent } from './Finance/cash-payment/cash-payment.component';
import { CashPettyComponent } from './Finance/cash-petty/cash-petty.component';
import { DashboardComponent } from './Employee/main-page/dashboard/dashboard.component';
import { PurchaseNonTaxComponent } from './Finance/purchase-non-tax/purchase-non-tax.component';
import { PurchaseOrderComponent } from './Finance/purchase-order/purchase-order.component';
import { PurchaseReturnComponent } from './Finance/purchase-return/purchase-return.component';
import { PurchaseSalesTaxComponent } from './Finance/purchases/purchase-sales-tax/purchase-sales-tax.component';
import { PurchasesComponent } from './Finance/purchases/purchases.component';
import { AddBankCustomerReceiptComponent } from './Finance/Sales/add-bank-customer-receipt/add-bank-customer-receipt.component';
import { AddBankReceiptPettyComponent } from './Finance/Sales/add-bank-receipt-petty/add-bank-receipt-petty.component';
import { AddCashReceiptCustomerComponent } from './Finance/Sales/add-cash-receipt-customer/add-cash-receipt-customer.component';
import { AddCashReceiptPettyCustomerComponent } from './Finance/Sales/add-cash-receipt-petty-customer/add-cash-receipt-petty-customer.component';
import { AddCustomerComponent } from './Finance/Sales/add-customer/add-customer.component';
import { AddDeliveryChallanComponent } from './Finance/Sales/add-delivery-challan/add-delivery-challan.component';
import { AddSaleReturnsComponent } from './Finance/Sales/add-sale-returns/add-sale-returns.component';
import { AddSalesNonTaxInvoicesComponent } from './Finance/Sales/add-sales-non-tax-invoices/add-sales-non-tax-invoices.component';
import { AddSalesOrderComponent } from './Finance/Sales/add-sales-order/add-sales-order.component';
import { AddSalesTaxInvoicesComponent } from './Finance/Sales/add-sales-tax-invoices/add-sales-tax-invoices.component';
import { BankCustomerReceiptComponent } from './Finance/Sales/bank-customer-receipt/bank-customer-receipt.component';
import { BankReceiptPettyComponent } from './Finance/Sales/bank-receipt-petty/bank-receipt-petty.component';
import { CashReceiptCustomerComponent } from './Finance/Sales/cash-receipt-customer/cash-receipt-customer.component';
import { CashReceiptPettyCustomerComponent } from './Finance/Sales/cash-receipt-petty-customer/cash-receipt-petty-customer.component';
import { DeliveryChallanComponent } from './Finance/Sales/delivery-challan/delivery-challan.component';
import { SaleReturnComponent } from './Finance/Sales/sale-return/sale-return.component';
import { SalesNonTaxInvoicesComponent } from './Finance/Sales/sales-non-tax-invoices/sales-non-tax-invoices.component';
import { SalesOrderComponent } from './Finance/Sales/sales-order/sales-order.component';
import { SalesTaxInvoicesComponent } from './Finance/Sales/sales-tax-invoices/sales-tax-invoices.component';
import { SalesComponent } from './Finance/Sales/sales/sales.component';
import { GatePassComponent } from './Inventory/gate-pass/gate-pass.component';
import { AddInwardComponent } from './Inventory/gate-pass/inward-gate/add-inward/add-inward.component';
import { InwardGateComponent } from './Inventory/gate-pass/inward-gate/inward-gate.component';
import { AddOutwardComponent } from './Inventory/gate-pass/outward-gate/add-outward/add-outward.component';
import { OutwardGateComponent } from './Inventory/gate-pass/outward-gate/outward-gate.component';
import { InventoryBalanceComponent } from './Inventory/inventory-balance/inventory-balance.component';
import { EmployeeDeleteComponent } from './Employee/employee-delete/employee-delete.component';
import { BillOfMaterialComponent } from './Finance/bill-of-material/bill-of-material.component';
import { AddNewBillComponent } from './Finance/add-new-bill/add-new-bill.component';
import { EmployeeDashboardComponent } from './Employee/main-page/employee-dashboard/employee-dashboard.component';
import { MainEmployeeDashboardComponent } from './Employee/main-employee-dashboard/main-employee-dashboard.component';
import { InventoryDashboardComponent } from './Inventory/inventory-dashboard/inventory-dashboard.component';
import { AsjustmentsMainComponent } from './Adjustments/asjustments-main/asjustments-main.component';
import { JournalVoucherComponent } from './Adjustments/journal-voucher/journal-voucher.component';
import { CustomerAdjustmentComponent } from './Adjustments/customer-adjustment/customer-adjustment.component';
import { ReportsMainComponent } from './Reports/reports-main/reports-main.component';
import { AccountLedgerComponent } from './Reports/account-ledger/account-ledger.component';
import { TrialBalanceComponent } from './Reports/trial-balance/trial-balance.component';
import { PurchaseReportComponent } from './Reports/purchase-report/purchase-report.component';
import { SaleReportComponent } from './Reports/sale-report/sale-report.component';
import { SystemUsersComponent } from './auth/system-users/system-users.component';
import { AddCustomerDebitComponent } from './Adjustments/add-customer-debit/add-customer-debit.component';
import { AddCustomerCreditComponent } from './Adjustments/add-customer-credit/add-customer-credit.component';
import { AddJournalVoucherComponent } from './Adjustments/add-journal-voucher/add-journal-voucher.component';
import { AllUsersComponent } from './auth/all-users/all-users.component';
import { DefineRolesComponent } from './auth/define-roles/define-roles.component';
import { AddVendorsDetailsComponent } from './Finance/add-vendors-details/add-vendors-details.component';
import { EditVendorsComponent } from './Finance/add-vendors-details/edit-vendors/edit-vendors.component';
import { AddCustomersDetailsComponent } from './Finance/Sales/add-customers-details/add-customers-details.component';
import { EditCustomersComponent } from './Finance/Sales/add-customers-details/edit-customers/edit-customers.component';
import { ViewListAccountsComponent } from './accounts/view-list-accounts/view-list-accounts.component';
import { EditListAccountsComponent } from './accounts/view-list-accounts/edit-list-accounts/edit-list-accounts.component';
import { AuthguardGuard } from './authguard.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'main-page',
    component: MainPageComponent,
    canActivate: [AuthguardGuard]
  },

  {
    path: 'inventory-dashboard',
    component: InventoryDashboardComponent,
    children: [
      { path: 'inventory-balance', component: InventoryBalanceComponent,canActivate: [AuthguardGuard] },
      { path: 'gate-pass', component: GatePassComponent,canActivate: [AuthguardGuard] },
      { path: 'inward', component: InwardGateComponent,canActivate: [AuthguardGuard] },
      { path: 'outward', component: OutwardGateComponent,canActivate: [AuthguardGuard] },
      { path: 'add-inward', component: AddInwardComponent ,canActivate: [AuthguardGuard]},
      { path: 'add-outward', component: AddOutwardComponent,canActivate: [AuthguardGuard] },
      { path: 'bill-of-material', component: BillOfMaterialComponent,canActivate: [AuthguardGuard] },
      { path: 'add-new-bill', component: AddNewBillComponent ,canActivate: [AuthguardGuard]},
    ],
  },
  {
    path: 'main-employee-dashboard',
    component: MainEmployeeDashboardComponent,
    children: [
      { path: 'employee-register', component: EmployeeRegisterComponent,canActivate: [AuthguardGuard] },
      { path: 'all-employees', component: AllEmployeesComponent,canActivate: [AuthguardGuard] },
    ],
  },
  {
    path: 'employee-home',
    component: EmployeeHomeComponent,
    children: [
      { path: 'finance-dashboard', component: DashboardComponent ,canActivate: [AuthguardGuard]},
      { path: 'purchases', component: PurchasesComponent ,canActivate: [AuthguardGuard]},
      { path: 'purchase-order', component: PurchaseOrderComponent ,canActivate: [AuthguardGuard]},
      { path: 'purchase-sales-tax', component: PurchaseSalesTaxComponent ,canActivate: [AuthguardGuard]},
      { path: 'purchase-non-sales', component: PurchaseNonTaxComponent ,canActivate: [AuthguardGuard]},
      { path: 'bank-payment', component: BankPaymentComponent ,canActivate: [AuthguardGuard]},
      { path: 'cash-payment', component: CashPaymentComponent,canActivate: [AuthguardGuard] },
      { path: 'purchase-return', component: PurchaseReturnComponent,canActivate: [AuthguardGuard] },
      { path: 'add-vendors-details', component: AddVendorsDetailsComponent,canActivate: [AuthguardGuard] },
      { path: 'edit-vendors', component: EditVendorsComponent ,canActivate: [AuthguardGuard]},
      { path: 'add-customers-details', component: AddCustomersDetailsComponent,canActivate: [AuthguardGuard] },
      { path: 'edit-customers', component: EditCustomersComponent,canActivate: [AuthguardGuard] },
      {
        path: 'chart-of-account',
        component: ChartOfAccountComponent,
        canActivate: [AuthguardGuard]
      },
      { path: 'sales', component: SalesComponent ,canActivate: [AuthguardGuard]},
      { path: 'add-purchase-order', component: AddPurchaseComponent,canActivate: [AuthguardGuard] },
      { path: 'add-vendor', component: AddVendorComponent,canActivate: [AuthguardGuard] },
      { path: 'add-purchase-sales', component: AddPurchaseSalesComponent,canActivate: [AuthguardGuard] },
      { path: 'add-non-purchase', component: AddNonPurchaseSalesComponent,canActivate: [AuthguardGuard] },
      { path: 'add-new-item', component: AddNewItemComponent,canActivate: [AuthguardGuard] },
      { path: 'choose-account', component: ChooseAccountComponent,canActivate: [AuthguardGuard] },
      { path: 'main-account', component: MainAccountComponent,canActivate: [AuthguardGuard] },
      { path: 'sub-account', component: SubAccountComponent ,canActivate: [AuthguardGuard]},
      { path: 'list-account', component: ListAccountComponent ,canActivate: [AuthguardGuard]},
      { path: 'add-purchase-return', component: AddPurchaseReturnComponent,canActivate: [AuthguardGuard] },
      { path: 'add-bank-payment', component: AddBankPaymentComponent,canActivate: [AuthguardGuard] },
      { path: 'bank-petty', component: BankPettyComponent,canActivate: [AuthguardGuard] },
      { path: 'add-bank-petty', component: AddBankPettyComponent,canActivate: [AuthguardGuard] },
      { path: 'add-cash-payment', component: AddCashPaymentComponent,canActivate: [AuthguardGuard] },
      { path: 'cash-petty', component: CashPettyComponent ,canActivate: [AuthguardGuard]},
      { path: 'add-cash-petty', component: AddCashPettyComponent,canActivate: [AuthguardGuard] },
      { path: 'sales-order', component: SalesOrderComponent,canActivate: [AuthguardGuard] },
      { path: 'add-sales-order', component: AddSalesOrderComponent,canActivate: [AuthguardGuard] },
      { path: 'add-customer', component: AddCustomerComponent,canActivate: [AuthguardGuard] },
      { path: 'add-delivery-challan', component: AddDeliveryChallanComponent,canActivate: [AuthguardGuard] },
      { path: 'delivery-challan', component: DeliveryChallanComponent ,canActivate: [AuthguardGuard]},
      { path: 'sales-tax-invoices', component: SalesTaxInvoicesComponent,canActivate: [AuthguardGuard] },
      { path: 'view-list-accounts', component: ViewListAccountsComponent ,canActivate: [AuthguardGuard]},
      { path: 'edit-list-accounts', component: EditListAccountsComponent,canActivate: [AuthguardGuard] },
      {
        path: 'add-sales-tax-invoices',
        component: AddSalesTaxInvoicesComponent,
        canActivate: [AuthguardGuard]
      },
      {
        path: 'sales-non-tax-invoices',
        component: SalesNonTaxInvoicesComponent,canActivate: [AuthguardGuard]
      },
      {
        path: 'bank-customer-receipt',
        component: BankCustomerReceiptComponent,canActivate: [AuthguardGuard]
      },
      {
        path: 'add-sales-non-tax-invoices',
        component: AddSalesNonTaxInvoicesComponent,canActivate: [AuthguardGuard]
      },
      { path: 'sale-returns', component: SaleReturnComponent,canActivate: [AuthguardGuard] },
      { path: 'add-sale-returns', component: AddSaleReturnsComponent,canActivate: [AuthguardGuard] },
      {
        path: 'bank-customer-receipt',
        component: BankCustomerReceiptComponent,
        canActivate: [AuthguardGuard]
      },
      {
        path: 'add-bank-customer-receipt',
        component: AddBankCustomerReceiptComponent,
        canActivate: [AuthguardGuard]
      },
      { path: 'bank-receipt-petty', component: BankReceiptPettyComponent },
      {
        path: 'add-bank-receipt-petty',
        component: AddBankReceiptPettyComponent,canActivate: [AuthguardGuard]
      },
      {
        path: 'cash-receipt-customer',
        component: CashReceiptCustomerComponent,canActivate: [AuthguardGuard]
      },
      {
        path: 'add-cash-receipt-customer',
        component: AddCashReceiptCustomerComponent,canActivate: [AuthguardGuard]
      },
      {
        path: 'cash-receipt-petty-customer',
        component: CashReceiptPettyCustomerComponent,canActivate: [AuthguardGuard]
      },
      {
        path: 'add-cash-receipt-petty-customer',
        component: AddCashReceiptPettyCustomerComponent,canActivate: [AuthguardGuard]
      },
      {
        path: 'adjustments',
        component: AsjustmentsMainComponent,canActivate: [AuthguardGuard]
      },
      {
        path: 'journal-voucher',
        component: JournalVoucherComponent,canActivate: [AuthguardGuard]
      },
      {
        path: 'customer-adjustment',
        component: CustomerAdjustmentComponent,canActivate: [AuthguardGuard]
      },
      {
        path : 'add-customer-debit',
        component : AddCustomerDebitComponent,canActivate: [AuthguardGuard]
      },
      {
        path : 'add-customer-credit',
        component : AddCustomerCreditComponent,canActivate: [AuthguardGuard]
      },
      {
        path: 'add-journal-voucher',
        component : AddJournalVoucherComponent,canActivate: [AuthguardGuard]
      },
      { path: 'reports', component: ReportsMainComponent,canActivate: [AuthguardGuard] },
      { path: 'account-ledger', component: AccountLedgerComponent,canActivate: [AuthguardGuard] },
      { path: 'trial-balance', component: TrialBalanceComponent,canActivate: [AuthguardGuard] },
      { path: 'purchase-report', component: PurchaseReportComponent,canActivate: [AuthguardGuard] },
      { path: 'sale-report', component: SaleReportComponent,canActivate: [AuthguardGuard] },
    ],
  },
  { path: 'dashboard', component: EmployeeDashboardComponent,canActivate: [AuthguardGuard] },
  { path: 'finance-dashboard', component: DashboardComponent,canActivate: [AuthguardGuard] },
  { path: 'register', component: RegistrationComponent },
  { path: 'system-choice', component: SystemChoiceComponent,canActivate: [AuthguardGuard] },
  { path: 'system-users', component: SystemUsersComponent,canActivate: [AuthguardGuard] },
  { path: 'employee-delete', component: EmployeeDeleteComponent,canActivate: [AuthguardGuard] },
  { path: 'all-users',component: AllUsersComponent,canActivate: [AuthguardGuard]},
  {path : 'define',component:DefineRolesComponent,canActivate: [AuthguardGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
