import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeService } from 'src/app/Employee/employee.service';

@Component({
  selector: 'app-edit-inventory',
  templateUrl: './edit-inventory.component.html',
  styleUrls: ['./edit-inventory.component.css']
})
export class EditInventoryComponent implements OnInit {
  editInventoryForm
  : FormBuilder | any;
  editObj: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataPipe: DatePipe,
    private _employeeService: EmployeeService,
    private _snackbar: MatSnackBar
  ) {
    this.myForm();

  }
  myForm() {
    this.editInventoryForm = this.fb.group({
      productItemCode: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      ],
      productName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      productType: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
      ],
      totalQuantity: [
        '',
        [Validators.required, Validators.min(1), Validators.max(1000000)],
      ],
    });
  }
  ngOnInit(): void {
    console.log("INDEX",this.data)
    this.editInventoryForm.controls.productItemCode.setValue(
      this.data?.userData?.itemCode
    );
    this.editInventoryForm.controls.productName.setValue(
      this.data?.userData?.productName
    );
    this.editInventoryForm.controls.productType.setValue(
      this.data?.userData?.productType
    );
    this.editInventoryForm.controls.totalQuantity.setValue(
      this.data?.userData?.totalQuantity
    );
  }

  editEmployee() {
      this.editObj = {
        itemCode: this.editInventoryForm.controls.productItemCode.value,
        productName: this.editInventoryForm.controls.productName.value,
        productType: this.editInventoryForm.controls.productType.value,
        totalQuantity: this.editInventoryForm.controls.totalQuantity.value,
      };
     console.log('EDIT OBJ', this.editObj);
    this._employeeService
      .editInventory(this.editObj, this.data.userData.id)
      .then((data: any) => {
        console.log('Data edited succesfully', data);
        window.location.reload();
      },
      (err: any) => {
      });
  }

}
