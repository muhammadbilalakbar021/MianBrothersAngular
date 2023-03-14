import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchasesService } from '../../../purchases.service';

@Component({
  selector: 'app-edit-customers',
  templateUrl: './edit-customers.component.html',
  styleUrls: ['./edit-customers.component.css'],
})
export class EditCustomersComponent implements OnInit {
  editCustomerForm: FormBuilder | any;
  editObj: any = {};
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataPipe: DatePipe,
    private _purchaseService: PurchasesService,
    private _snackbar: MatSnackBar
  ) {
    this.myForm();
  }

  myForm() {
    this.editCustomerForm = this.fb.group({
      customerCode: [
        '',
        [Validators.required, Validators.min(3), Validators.max(30)],
      ],

      customerName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      balance: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(1000000),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],

      creditTerms: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],

      ntn: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],

      stRegistrationNumber: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1000000),
        ],
      ],
      contactPerson: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{4}-[0-9]{7}$')],
      ],
      // salary: [
      //   '',
      //   [Validators.required, Validators.min(1), Validators.max(1000000)],
      // ],
      // joiningDate: ['', [Validators.required]],
      // leavingDate: ['', []],
      cnic: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{5}-[0-9]{7}-[0-9]$')],
      ],
      // dob: ['', [Validators.required]],
      customerAddress: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      region: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      accountManager: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      creditLimit: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10000000),
        ],
      ],
      orderLimit: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(10000000),
        ],
      ],
    });
  }

  ngOnInit(): void {
    console.log('DATA', this.data);
    this.editCustomerForm.controls.customerCode.setValue(
      this.data.userData.customerCode
    );
    this.editCustomerForm.controls.region.setValue(
      this.data.userData.region
    );
    this.editCustomerForm.controls.accountManager.setValue(
      this.data.userData.accountManager
    );
    this.editCustomerForm.controls.creditLimit.setValue(
      this.data.userData.creditLimit
    );
    this.editCustomerForm.controls.orderLimit.setValue(
      this.data.userData.orderLimit
    );
    this.editCustomerForm.controls.contactPerson.setValue(
      this.data.userData.contactPerson
    );
    this.editCustomerForm.controls.mobileNumber.setValue(
      this.data.userData.mobileNumber
    );
    this.editCustomerForm.controls.stRegistrationNumber.setValue(
      this.data.userData.stRegistrationNumber
    );
    this.editCustomerForm.controls.ntn.setValue(
      this.data.userData.ntn
    );
    this.editCustomerForm.controls.creditTerms.setValue(
      this.data.userData.creditTerms
    );
    this.editCustomerForm.controls.customerName.setValue(
      this.data.userData.customerName
    );
    this.editCustomerForm.controls.balance.setValue(
      this.data.userData.balance
    );
    this.editCustomerForm.controls.email.setValue(
      this.data.userData.email
    );
    // this.editCustomerForm.controls.salary.setValue(this.data.userData.salary);
    // this.editCustomerForm.controls.joiningDate.setValue(
    //   this.data.userData.joiningDate
    // );
    // this.editCustomerForm.controls.leavingDate.setValue(
    //   this.data.userData.leavingDate
    // );
    this.editCustomerForm.controls.cnic.setValue(this.data.userData.cnic);
    // this.editCustomerForm.controls.dob.setValue(this.data.userData.dob);
    this.editCustomerForm.controls.customerAddress.setValue(
      this.data.userData.customerAddress
    );
  }

  editCustomer() {
    if (this.editCustomerForm.controls.customerName.value != null) {
      this.editObj = {
        customerCode: this.editCustomerForm.controls.customerCode.value,
        region: this.editCustomerForm.controls.region.value,
        accountManager: this.editCustomerForm.controls.accountManager.value,
        creditLimit: this.editCustomerForm.controls.creditLimit.value,
        orderLimit: this.editCustomerForm.controls.orderLimit.value,
        contactPerson: this.editCustomerForm.controls.contactPerson.value,
        mobileNumber: this.editCustomerForm.controls.mobileNumber.value,
        stRegistrationNumber: this.editCustomerForm.controls.stRegistrationNumber.value,
        ntn: this.editCustomerForm.controls.ntn.value,
        creditTerms: this.editCustomerForm.controls.creditTerms.value,
        customerName: this.editCustomerForm.controls.customerName.value,
        balance: this.editCustomerForm.controls.balance.value,
        email: this.editCustomerForm.controls.email.value,
        // salary: this.editCustomerForm.controls.salary.value,
        // joiningDate: this.transformDate(
        //   this.editCustomerForm.controls.joiningDate.value
        // ),
        cnic: this.editCustomerForm.controls.cnic.value,
        // dob: this.transformDate(this.editCustomerForm.controls.dob.value),
        customerAddress:
          this.editCustomerForm.controls.customerAddress.value,
        // leavingDate: this.transformDate(
        //   this.editCustomerForm.controls.leavingDate.value
        // ),
      };
    } else {
      this.editObj = {
        customerCode: this.editCustomerForm.controls.customerCode.value,
        region: this.editCustomerForm.controls.region.value,
        accountManager: this.editCustomerForm.controls.accountManager.value,
        creditLimit: this.editCustomerForm.controls.creditLimit.value,
        orderLimit: this.editCustomerForm.controls.orderLimit.value,
        contactPerson: this.editCustomerForm.controls.contactPerson.value,
        mobileNumber: this.editCustomerForm.controls.mobileNumber.value,
        stRegistrationNumber: this.editCustomerForm.controls.stRegistrationNumber.value,
        ntn: this.editCustomerForm.controls.ntn.value,
        creditTerms: this.editCustomerForm.controls.creditTerms.value,
        customerName: this.editCustomerForm.controls.customerName.value,
        balance: this.editCustomerForm.controls.balance.value,
        email: this.editCustomerForm.controls.email.value,
        // salary: this.editCustomerForm.controls.salary.value,
        // joiningDate: this.transformDate(
        //   this.editCustomerForm.controls.joiningDate.value
        // ),
        cnic: this.editCustomerForm.controls.cnic.value,
        // dob: this.transformDate(this.editCustomerForm.controls.dob.value),
        customerAddress:
          this.editCustomerForm.controls.customerAddress.value,
      };
    }
    console.log('EDIT OBJ', this.editObj);
    this._purchaseService
      .editCustomers(this.editObj, this.data.userData.id)
      .then((data: any) => {
        console.log('Data edited succesfully', data);
        window.location.reload();
      },
      (err: any) => {
      });
  }
  transformDate(date: any) {
    return this.dataPipe.transform(date, 'yyyy-MM-dd');
  }
}
