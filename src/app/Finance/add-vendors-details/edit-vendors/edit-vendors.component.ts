import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchasesService } from '../../purchases.service';

@Component({
  selector: 'app-edit-vendors',
  templateUrl: './edit-vendors.component.html',
  styleUrls: ['./edit-vendors.component.css'],
})
export class EditVendorsComponent implements OnInit {
  editVendorForm: FormBuilder | any;
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
    this.editVendorForm = this.fb.group({
      vendorCode: [
        '',
        [Validators.required, Validators.min(3), Validators.max(30)],
      ],

      vendorName: [
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
      vendorAddress: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  ngOnInit(): void {
    console.log('DATA', this.data);
    this.editVendorForm.controls.vendorCode.setValue(
      this.data.userData.vendorCode
    );
    this.editVendorForm.controls.contactPerson.setValue(
      this.data.userData.contactPerson
    );
    this.editVendorForm.controls.mobileNumber.setValue(
      this.data.userData.mobileNumber
    );
    this.editVendorForm.controls.stRegistrationNumber.setValue(
      this.data.userData.stRegistrationNumber
    );
    this.editVendorForm.controls.ntn.setValue(
      this.data.userData.ntn
    );
    this.editVendorForm.controls.creditTerms.setValue(
      this.data.userData.creditTerms
    );
    this.editVendorForm.controls.vendorName.setValue(
      this.data.userData.vendorName
    );
    this.editVendorForm.controls.balance.setValue(
      this.data.userData.balance
    );
    this.editVendorForm.controls.email.setValue(
      this.data.userData.email
    );
    // this.editVendorForm.controls.salary.setValue(this.data.userData.salary);
    // this.editVendorForm.controls.joiningDate.setValue(
    //   this.data.userData.joiningDate
    // );
    // this.editVendorForm.controls.leavingDate.setValue(
    //   this.data.userData.leavingDate
    // );
    this.editVendorForm.controls.cnic.setValue(this.data.userData.cnic);
    // this.editVendorForm.controls.dob.setValue(this.data.userData.dob);
    this.editVendorForm.controls.vendorAddress.setValue(
      this.data.userData.vendorAddress
    );
  }

  editVendor() {
    if (this.editVendorForm.controls.vendorName.value != null) {
      this.editObj = {
        vendorCode: this.editVendorForm.controls.vendorCode.value,
        contactPerson: this.editVendorForm.controls.contactPerson.value,
        mobileNumber: this.editVendorForm.controls.mobileNumber.value,
        stRegistrationNumber: this.editVendorForm.controls.stRegistrationNumber.value,
        ntn: this.editVendorForm.controls.ntn.value,
        creditTerms: this.editVendorForm.controls.creditTerms.value,
        vendorName: this.editVendorForm.controls.vendorName.value,
        balance: this.editVendorForm.controls.balance.value,
        email: this.editVendorForm.controls.email.value,
        // salary: this.editVendorForm.controls.salary.value,
        // joiningDate: this.transformDate(
        //   this.editVendorForm.controls.joiningDate.value
        // ),
        cnic: this.editVendorForm.controls.cnic.value,
        // dob: this.transformDate(this.editVendorForm.controls.dob.value),
        vendorAddress:
          this.editVendorForm.controls.vendorAddress.value,
        // leavingDate: this.transformDate(
        //   this.editVendorForm.controls.leavingDate.value
        // ),
      };
    } else {
      this.editObj = {
        vendorCode: this.editVendorForm.controls.vendorCode.value,
        contactPerson: this.editVendorForm.controls.contactPerson.value,
        mobileNumber: this.editVendorForm.controls.mobileNumber.value,
        stRegistrationNumber: this.editVendorForm.controls.stRegistrationNumber.value,
        ntn: this.editVendorForm.controls.ntn.value,
        creditTerms: this.editVendorForm.controls.creditTerms.value,
        vendorName: this.editVendorForm.controls.vendorName.value,
        balance: this.editVendorForm.controls.balance.value,
        email: this.editVendorForm.controls.email.value,
        // salary: this.editVendorForm.controls.salary.value,
        // joiningDate: this.transformDate(
        //   this.editVendorForm.controls.joiningDate.value
        // ),
        cnic: this.editVendorForm.controls.cnic.value,
        // dob: this.transformDate(this.editVendorForm.controls.dob.value),
        vendorAddress:
          this.editVendorForm.controls.vendorAddress.value,
      };
    }
    console.log('EDIT OBJ', this.editObj);
    this._purchaseService
      .editVendor(this.editObj, this.data.userData.id)
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
