import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountsService } from 'src/app/accounts/accounts.service';
import { EmployeeService } from 'src/app/Employee/employee.service';
import { PurchasesService } from '../../purchases.service';
import { SalesService } from '../sales.service';

@Component({
  selector: 'app-add-sales-non-tax-invoices',
  templateUrl: './add-sales-non-tax-invoices.component.html',
  styleUrls: ['./add-sales-non-tax-invoices.component.css']
})
export class AddSalesNonTaxInvoicesComponent implements OnInit {

  allCustomers: any;
  public isCustomerCodeLoaded: boolean = false;
  public customer_index: number = 0;
  public sale_index: number = 0;
  public item_index: number = 0;
  delivery_index: number = 0;
  public saleOrders: any;
  public isSaleCodeLoaded: boolean = false;
  public isItemCodeLoaded: boolean = false;
  isDeliveryLoaded: boolean = false;
  salesNonTaxForm: FormBuilder | any;
  itemCodes: any;
  getPurchaseOrders: any;
  allAccounts: any;
  deliverChallan: any;
  customerByIdData: any;
  getCustomerAccountByOrdersId: any;
  getDeliveryChallanByOrderId: any;
  public account_index: number = 0;
  public purchase_index: number = 0;
  public isAccountLoaded: boolean = false;
  public isPurchaseLoaded: boolean = false;
  constructor(
    private _accountService: AccountsService,
    private _salesService: SalesService,
    private _purchaseService: PurchasesService,
    private fb: FormBuilder,
    public dataPipe: DatePipe,
    public _employeesService: EmployeeService,
    private _snackbar: MatSnackBar
  ) {
    this.myForm();
  }
  myForm() {
    this.salesNonTaxForm = this.fb.group({
      serialNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      orderDate: ['', [Validators.required]],
      customerDate: ['', [Validators.required]],
      customerInvoiceNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      termsOfPayment: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      discount: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],

    });
  }
  ngOnInit(): void {
    this._accountService.getCustomerCode().subscribe((customers: any) => {
      this.allCustomers = customers.payload;
      console.log('this.allcustomers', this.allCustomers);
    });

    this._salesService.getUngenerated().subscribe((data: any) => {
      this.saleOrders = data.payload;
      console.log('this.salesOrders', this.saleOrders);
    });

    this._employeesService
      .getAllCustomerAccounts()
      .subscribe((response: any) => {
        console.log('get all list of account', response);
        this.allAccounts = response.payload;
      });

    this._purchaseService.getAllProductsCode().subscribe((data: any) => {
      console.log('get all item codes', data);
      this.itemCodes = data.payload;
    });
  }

  loadCustomers(index: any) {
    this.customer_index = index;
    this.isCustomerCodeLoaded = true;
  }

  loadSales(index: any) {
    this.sale_index = index;
    this.isSaleCodeLoaded = true;
    console.log('OKAY', this.saleOrders[this.sale_index]);
    this._salesService
      .getDeliveryChallanByOrderId(this.saleOrders[this.sale_index].id)
      .subscribe((data: any) => {
        this.deliverChallan = data.payload;
        console.log('this.salesOrders', this.deliverChallan);
      });

    this._salesService
      .getCustomersById(this.saleOrders[this.sale_index].customerId)
      .subscribe((res: any) => {
        this.customerByIdData = res.payload;
        this.isSaleCodeLoaded = true;
        console.log('VENDOR', res.payload);
      });
    this._salesService
      .getCustomerAccountByOrdersId(this.saleOrders[this.sale_index].id)
      .subscribe((res: any) => {
        this.getCustomerAccountByOrdersId = res.payload;
        this.isSaleCodeLoaded = true;
        console.log('GET Vendor Account', res.payload);
      });

    this._salesService
      .getDeliveryChallanByOrderId(this.saleOrders[this.account_index].id)
      .subscribe((res: any) => {
        this.getDeliveryChallanByOrderId = res.payload;
        this.isDeliveryLoaded = true;
        console.log('GET Vendor Account', this.sale_index, res.payload);
      });
  }
  loadDelivery(index: any) {
    this.delivery_index = index;
    this.isDeliveryLoaded = true;
  }

  loadItem(index: number) {
    this.item_index = index;
    this.isItemCodeLoaded = true;
  }

  loadAccount(index: number) {
    this.account_index = index;
    this.isAccountLoaded = true;
  }

  addSalesTax(date: any, customerDate: any) {
    let salesTax = {
      serialNumber: this.salesNonTaxForm.controls['serialNumber'].value,
      types: 'Sales',
      saleType: 'Non-Tax',
      saleDate: this.transformDate(date),
      invoice:
        this.salesNonTaxForm.controls['customerInvoiceNumber'].value,
      invoiceDate: this.transformDate(customerDate),
      orderId: this.saleOrders[this.sale_index].id,
      orderSerialNumber: this.saleOrders[this.sale_index].serialNumber,
      customerOrderReference:
        this.saleOrders[this.sale_index].customerOrderReference,
      orderDate: this.transformDate(this.saleOrders[this.sale_index].orderDate),
      discount: this.salesNonTaxForm.controls['discount'].value,
      customerId: this.allCustomers[this.customer_index].id,
      customerCode: this.allCustomers[this.customer_index].customerCode,
      paymentTerms:
        this.salesNonTaxForm.controls['termsOfPayment'].value,
      accountId: this.getCustomerAccountByOrdersId[this.account_index].id,
      accountType: this.getCustomerAccountByOrdersId[this.account_index].accountType,
      deliveryChallan: this.deliverChallan[this.delivery_index].serialNumber
    };

    this._purchaseService.addPurchaseSales(salesTax).then((data: any) => {
      window.location.reload();
    },
      (err: any) => {
      })
    console.log('Sales',salesTax);
  }

  transformDate(date: any) {
    return this.dataPipe.transform(date, 'yyyy-MM-dd');
  }
}
