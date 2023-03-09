import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { PurchasesService } from '../purchases.service';
export interface form {
  id: string;
  formGroup: FormGroup;
  metaData: any;
}
@Component({
  selector: 'app-add-purchase',
  templateUrl: './add-purchase.component.html',
  styleUrls: ['./add-purchase.component.css'],
})
export class AddPurchaseComponent implements OnInit {
  public productCode: any;
  public isProductCodeLoaded: boolean = false;
  public itemCode: any;
  public isItemCodeLoaded: boolean = false;
  public product_index: number = 0;
  public item_index: number = 0;
  public item_id: any;
  public productName: any;
  public productType: any;
  addPurchaseForm: FormBuilder | any;
  disableForm: boolean = false;
  address: boolean = false;
  fg: FormGroup | any;
  addPurchaseObject: any;
  tempArr: any = [];
  disableCheck : boolean = false;
  private data: Subject<any> = new Subject<any>();

  json: any = {
    itemCode: {
      label: 'Item Code',
      type: 'select',
    },
    rate: {
      label: 'Rate',
      value: null,
      type: 'number',
      Validation: {
        required: true,
        minLength: 1,
        maxLength: 10000000,
      },
    },
    furtherTaxRate: {
      label: 'Further Tax Rate',
      value: null,
      type: 'number',
      Validation: {
        required: true,
        minLength: 1,
        maxLength: 10000000,
      },
    },
    valueExcl: {
      label: 'Value Excl.',
      value: null,
      type: 'number',
      Validation: {
        required: true,
        minLength: 1,
        maxLength: 10000000,
      },
    },

    quantity: {
      label: 'Quantity',
      value: null,
      type: 'number',
      Validation: {
        required: true,
        min: 1,
        max: 10000000,
      },
    },
    salesTaxRate: {
      label: 'Sales Tax Rate',
      value: null,
      type: 'number',
      Validation: {
        required: true,
        minLength: 1,
        maxLength: 10000000,
      },
    },
    valueIncl: {
      label: 'Value Incl.',
      value: null,
      type: 'number',
      Validation: {
        required: true,
        minLength: 1,
        maxLength: 10000000,
      },
    },
    unit: {
      label: 'Unit',
      value: null,
      Validation: {
        required: true,
        minLength: 3,
        maxLength: 30,
      },
    },
    furtherTaxAmount: {
      label: 'Further Tax Amount',
      value: null,
      type: 'number',
      Validation: {
        required: true,
        minLength: 1,
        maxLength: 10000000,
      },
    },
  };

  forms: form[] = [];
  @Output() output: EventEmitter<FormGroup> = new EventEmitter();

  constructor(
    private _purchaseService: PurchasesService,
    private fb: FormBuilder,
    private dataPipe: DatePipe,
    private _snackbar: MatSnackBar
  ) {
    this.myForm();
  }

  myForm() {}
  ngOnInit(): void {
    this.addPurchaseForm = this.fb.group({
      serialNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      purchaseDate: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      buyDate: ['', Validators.required],
      termsOfPayment: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
    });
    this._purchaseService.getAllProductsCode().subscribe((data: any) => {
      this.itemCode = data.payload;
      console.log('get all item codes', data);
    });

    this._purchaseService.getAllVendorCodes().subscribe((data: any) => {
      this.productCode = data.payload;
      console.log('get all vendor codes', data);
    });
  }

  createForm() {
    if (this.json == null) return;
    let dataObject = this.json;
    let objectProps = Object.keys(dataObject).map((prop) => {
      return Object.assign({}, { key: prop }, dataObject[prop]);
    });
    const formGroup: any = {};
    for (let prop of Object.keys(dataObject)) {
      formGroup[prop] = new FormControl(
        dataObject[prop].value || '',
        this.mapValidators(dataObject[prop].validation)
      );
    }

    this.fg = new FormGroup(formGroup);
    const form: form = {
      id: new Date().getUTCMilliseconds().toString(),
      formGroup: this.fg,
      metaData: objectProps,
    };
    this.fg.valueChanges.subscribe((values: any) => {
      console.log("VALUE",values)
      this.output.emit(values);
    });
    console.log("FG",this.fg)

    this.forms.push(form);
    return form;
  }

  private mapValidators(validators: any) {
    const formValidators = [];

    if (validators) {
      for (const validation of Object.keys(validators)) {
        if (validation === 'required') {
          formValidators.push(Validators.required);
        } else if (validation === 'minLength') {
          formValidators.push(Validators.minLength(validators[validation]));
        } else if (validation === 'maxLength') {
          formValidators.push(Validators.maxLength(validators[validation]));
        }
      }
    }

    return formValidators;
  }
  deleteForm(index: any) {
    this.forms.splice(index, 1);
    this.tempArr.splice(index,1);
  }
  // public hasValidator(controlName: string, validator: string): boolean {
  //   let control: AbstractControl = this.addPurchaseForm.controls[controlName];
  //   switch (validator) {
  //     case 'required':
  //       control.setValue('');  // as is appropriate for the control
  //     case 'pattern':
  //       control.setValue('3'); // given you have knowledge of what the pattern is - say its '\d\d\d'
  //   }
  //   if (control.validator != null && control.validator(control) != null) {
  //     let hasValidator: boolean = !!control.validator(control).hasOwnProperty(validator);
  //     return hasValidator;
  //   }
  //   return false;
  // }

  update($event: any) {
    this.json = JSON.parse($event.target.value);
  }

  onSubmit(form: any) {}

  //** *Add Purchase Order */
  addPurchaseOrder(date: any, deliveryDate: any, buyDate: any) {
    let temp = [];

    for (let i = 0; i < this.forms.length; i++) {
      temp.push({
        rate: this.forms[i].formGroup.value.rate,
        furtherTaxRate: this.forms[i].formGroup.value.furtherTaxRate,
        quantity: this.forms[i].formGroup.value.quantity,
        salesTaxRate: this.forms[i].formGroup.value.salesTaxRate,
        unit: this.forms[i].formGroup.value.unit,
        productItemCode: this.tempArr[i].productItemCode,
        productName: this.tempArr[i].productName,
        productType: this.tempArr[i].productType,
        productId: this.tempArr[i].productId,
      });
    }

    this.addPurchaseObject = {
      types: 'Purchases',
      serialNumber: this.addPurchaseForm.controls['serialNumber'].value,
      purchaseDate: this.transformDate(date),
      paymentTerms: this.addPurchaseForm.controls['termsOfPayment'].value,
      deliveryDate: this.transformDate(deliveryDate),
      buyingDate: this.transformDate(buyDate),
      vendorId: this.productCode[this.product_index].id,
      vendorCode: this.productCode[this.product_index].vendorCode,
      product: temp,
    };
    console.log("pucccccccccccccccc",this.addPurchaseObject);
    // this._purchaseService.AddPurchaseOrder(this.addPurchaseObject).then(
    //   (data: any) => {
    //     console.log('purchase order added successfully', data);
    //     window.location.reload();
    //   },
    //   (err: any) => {}
    // );
  }
  /* Load Product */
  loadProduct(index: number) {
    this.disableForm = true;
    this.product_index = index;
    this.isProductCodeLoaded = true;
  }

  loadItem(index: number,i:any,f:any) {
    console.log("INDEX",index,i)
    console.log("length",f)

    this.item_index = index;
    this.isItemCodeLoaded = true;
    // this.tempArr
    if(i < this.tempArr.length){
      this.tempArr[i] =  {
        productName : this.itemCode[index].productName,
        productType : this.itemCode[index].productType,
        productId : this.itemCode[index].id,
        productItemCode : this.itemCode[index].itemCode
      }
     }else{
    this.tempArr.push({
      productName : this.itemCode[index].productName,
      productType : this.itemCode[index].productType,
      productId : this.itemCode[index].id,
      productItemCode : this.itemCode[index].itemCode
    });
  }
    console.log("THIS>REM",this.tempArr)
    this.item_id = this.itemCode[index].id;
    this.productName = this.itemCode[index].productName;
    this.productType = this.itemCode[index].productType;
    this.disableCheck = true;
  }


  transformDate(date: any) {
    return this.dataPipe.transform(date, 'yyyy-MM-dd');
  }
}
