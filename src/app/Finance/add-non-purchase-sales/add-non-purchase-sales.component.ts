import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/Employee/employee.service';
import { PurchasesService } from '../purchases.service';

@Component({
  selector: 'app-add-non-purchase-sales',
  templateUrl: './add-non-purchase-sales.component.html',
  styleUrls: ['./add-non-purchase-sales.component.css'],
})
export class AddNonPurchaseSalesComponent implements OnInit {
  public getPurchaseOrders: any;
  public itemCodes: any;
  public vendorCodes: any;
  public allAccounts: any;
  public isProductCodeLoaded: boolean = false;
  public isItemCodeLoaded: boolean = false;
  public isAccountLoaded: boolean = false;
  public isPurchaseLoaded: boolean = false;
  public product_index: number = 0;
  public item_index: number = 0;
  public account_index: number = 0;
  public purchase_index: number = 0;
  addPurchaseNonSalesForm: FormBuilder | any;
  vendorByIdData: any;
  getVendorAccountByOrdersId: any;
  constructor(
    private _purchaseService: PurchasesService,
    private _employeesService: EmployeeService,
    private fb: FormBuilder,
    private dataPipe: DatePipe,
    private _snackbar : MatSnackBar
  ) {
    this.myForm();
  }
  myForm() {
    this.addPurchaseNonSalesForm = this.fb.group({
      serialNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      orderDate:['',[Validators.required]],
      termsOfPayment: [
        '',
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),]
      ],
      disc: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });
  }
  ngOnInit(): void {
    this._purchaseService.getUngeneratedPurchaseOrders().subscribe((response: any) => {
      console.log('get purchase orders', response);
      this.getPurchaseOrders = response.payload;
    });

    this._employeesService
      .getAllListOfEmployees()
      .subscribe((response: any) => {
        console.log('get all list of account', response);
        this.allAccounts = response.payload;
      });

    this._purchaseService.getAllProductsCode().subscribe((data: any) => {
      console.log('get all item codes', data);
      this.itemCodes = data.payload;
    });

    this._purchaseService.getAllVendorCodes().subscribe((data: any) => {
      console.log('get all vendor codes', data);
      this.vendorCodes = data.payload;
    });
  }

  addPurchaseNonSales(date:any){
    let purchaseSalesObj = {
      serialNumber : this.addPurchaseNonSalesForm.controls['serialNumber'].value,
      types : 'Purchases',
      saleType : 'Non-Tax',
      saleDate : this.transformDate(date),
      invoice : this.addPurchaseNonSalesForm.controls['serialNumber'].value,
      invoiceDate : this.transformDate(date),
      orderId : this.getPurchaseOrders[this.purchase_index]?.id,
      accountId : this.allAccounts[this.account_index]?.id,
      vendorId : this.getPurchaseOrders[this.purchase_index]?.vendorId,
      vendorCode: this.getPurchaseOrders[this.purchase_index]?.vendorCode,
      orderDate : this.transformDate(this.getPurchaseOrders[this.purchase_index].orderDate),
      orderSerialNumber : this.getPurchaseOrders[this.purchase_index].serialNumber,
      paymentTerms : this.addPurchaseNonSalesForm.controls['termsOfPayment'].value,
      accountType : this.allAccounts[this.account_index].accountType,
      discount :JSON.parse(this.addPurchaseNonSalesForm.controls['disc'].value),
    }
    this._purchaseService.addPurchase(purchaseSalesObj).then(
      (data: any) => {
        window.location.reload();
        console.log('data',data)
      },
      (err: any) => {
      }
    );
    console.log('Purchase',purchaseSalesObj);
  }

  loadPurchase(index: number) {
    this.purchase_index = index;
    this.isPurchaseLoaded = true;

    this._purchaseService
    .getVendorById(this.getPurchaseOrders[this.purchase_index].vendorId)
    .subscribe((res: any) => {
      this.vendorByIdData = res.payload;
      this.isPurchaseLoaded = true;
      console.log('VENDOR', res.payload);
    });
    this._purchaseService
    .getVendorAccountByOrdersId(this.getPurchaseOrders[this.account_index].id)
    .subscribe((res: any) => {
      this.getVendorAccountByOrdersId = res.payload;
      this.isPurchaseLoaded = true;
      console.log('GET Vendor Account', res.payload);
    });
  }

  loadProduct(index: number) {
    this.product_index = index;
    this.isProductCodeLoaded = true;
  }

  loadAccount(index: number) {
    this.account_index = index;
    this.isAccountLoaded = true;
  }

  loadItem(index: number) {
    this.item_index = index;
    this.isItemCodeLoaded = true;
  }

 
  transformDate(date : any){
    return this.dataPipe.transform(date,'yyyy-MM-dd');
   }
}
