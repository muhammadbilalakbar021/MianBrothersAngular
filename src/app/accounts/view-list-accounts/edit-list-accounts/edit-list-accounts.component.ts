import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PurchasesService } from 'src/app/Finance/purchases.service';

@Component({
  selector: 'app-edit-list-accounts',
  templateUrl: './edit-list-accounts.component.html',
  styleUrls: ['./edit-list-accounts.component.css'],
})
export class EditListAccountsComponent implements OnInit {
  editListAccountsForm: FormBuilder | any;
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
    this.editListAccountsForm = this.fb.group({
      accountCode: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      accountType: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      accountInfo: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      subAccountId: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    });
  }

  ngOnInit(): void {
    console.log('DATA', this.data);
    this.editListAccountsForm.controls.accountCode.setValue(
      this.data.userData.accountCode
    );
    this.editListAccountsForm.controls.accountType.setValue(
      this.data.userData.accountType
    );
    this.editListAccountsForm.controls.accountInfo.setValue(
      this.data.userData.accountInfo
    );
    this.editListAccountsForm.controls.subAccountId.setValue(
      this.data.userData.subAccountId
    );
  }

  editListAccounts() {
    if (this.editListAccountsForm.controls.accountType.value != null) {
      this.editObj = {
        accountCode: this.editListAccountsForm.controls.accountCode.value,
        accountType: this.editListAccountsForm.controls.accountType.value,
        accountInfo: this.editListAccountsForm.controls.accountInfo.value,
        subAccountInfo: this.editListAccountsForm.controls.subAccountId.value,
      };
    } else {
      this.editObj = {
        accountCode: this.editListAccountsForm.controls.accountCode.value,
        accountType: this.editListAccountsForm.controls.accountType.value,
        accountInfo: this.editListAccountsForm.controls.accountInfo.value,
        subAccountInfo: this.editListAccountsForm.controls.subAccountId.value,
      }
      console.log('EDIT OBJ', this.editObj);
      this._purchaseService
        .editListAccounts(this.editObj, this.data.userData.id)
        .then((data: any) => {
          console.log('Data edited succesfully', data);
          window.location.reload();
        },
          (err: any) => {
          });
      console.log('Data edited succesfully', this.data);
    }
  }
}
