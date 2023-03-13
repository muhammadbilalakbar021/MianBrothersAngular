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
  editVendorsForm: FormBuilder | any;
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
    this.editVendorsForm = this.fb.group({
      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      position: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      department: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      salary: [
        '',
        [Validators.required, Validators.min(1), Validators.max(1000000)],
      ],
      joiningDate: ['', [Validators.required]],
      leavingDate: ['', []],
      cnic: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{5}-[0-9]{7}-[0-9]$')],
      ],
      dob: ['', [Validators.required]],
      addressInformation: [
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
    this.editVendorsForm.controls.fullName.setValue(
      this.data.userData.fullName
    );
    this.editVendorsForm.controls.position.setValue(
      this.data.userData.position
    );
    this.editVendorsForm.controls.department.setValue(
      this.data.userData.department
    );
    this.editVendorsForm.controls.salary.setValue(this.data.userData.salary);
    this.editVendorsForm.controls.joiningDate.setValue(
      this.data.userData.joiningDate
    );
    this.editVendorsForm.controls.leavingDate.setValue(
      this.data.userData.leavingDate
    );
    this.editVendorsForm.controls.cnic.setValue(this.data.userData.cnic);
    this.editVendorsForm.controls.dob.setValue(this.data.userData.dob);
    this.editVendorsForm.controls.addressInformation.setValue(
      this.data.userData.addressInformation
    );
  }

  editVendors() {
    if (this.editVendorsForm.controls.leavingDate.value != null) {
      this.editObj = {
        fullName: this.editVendorsForm.controls.fullName.value,
        position: this.editVendorsForm.controls.position.value,
        department: this.editVendorsForm.controls.department.value,
        salary: this.editVendorsForm.controls.salary.value,
        joiningDate: this.transformDate(
          this.editVendorsForm.controls.joiningDate.value
        ),
        cnic: this.editVendorsForm.controls.cnic.value,
        dob: this.transformDate(this.editVendorsForm.controls.dob.value),
        addressInformation:
          this.editVendorsForm.controls.addressInformation.value,
        leavingDate: this.transformDate(
          this.editVendorsForm.controls.leavingDate.value
        ),
      };
    } else {
      this.editObj = {
        fullName: this.editVendorsForm.controls.fullName.value,
        position: this.editVendorsForm.controls.position.value,
        department: this.editVendorsForm.controls.department.value,
        salary: this.editVendorsForm.controls.salary.value,
        joiningDate: this.transformDate(
          this.editVendorsForm.controls.joiningDate.value
        ),
        cnic: this.editVendorsForm.controls.cnic.value,
        dob: this.transformDate(this.editVendorsForm.controls.dob.value),
        addressInformation:
          this.editVendorsForm.controls.addressInformation.value,
      };
    }
    console.log('EDIT OBJ', this.editObj);
    // this._purchaseService
    //   .editVendors(this.editObj, this.data.userData.id)
    //   .then((data: any) => {
    //     console.log('Data edited succesfully', data);
    //     window.location.reload();
    //   },
    //   (err: any) => {
    //   });
  }
  transformDate(date: any) {
    return this.dataPipe.transform(date, 'yyyy-MM-dd');
  }
}
