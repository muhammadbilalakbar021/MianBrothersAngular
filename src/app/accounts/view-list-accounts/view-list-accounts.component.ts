import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AccountsService } from '../accounts.service';
import { EditListAccountsComponent } from './edit-list-accounts/edit-list-accounts.component';

@Component({
  selector: 'app-view-list-accounts',
  templateUrl: './view-list-accounts.component.html',
  styleUrls: ['./view-list-accounts.component.css'],
})
export class ViewListAccountsComponent implements OnInit {
  allListAccounts: any;
  displayedColumns: string[] = [
    'accountCode',
    'subAccountId',
    'accountInfo',
    'accountType',
    'action',
    'edit',
  ];
  dataSource: MatTableDataSource<any> | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  startingIndexOfPage:any;
  endingIndexOfPage:any;
  innerIndexCalculated:any;
  constructor(
    private _accountService: AccountsService,
    public dialog: MatDialog,
    public router : Router,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._accountService.getAllListOfAccounts().subscribe((data: any) => {
      this.allListAccounts = data.payload;
      this.dataSource = new MatTableDataSource(this.allListAccounts);
      this.dataSource.paginator = this.paginator;
      console.log('all ListAccount', this.allListAccounts);
    });
  }

  
  onDelete(index: any){
    var text = "Are you sure to delete?";
    console.log('acbcsd',this.allListAccounts[index.id])
    console.log('INDEXX',index)
    if (confirm(text) == true) {
        this._accountService
          .deleteListAccount(index.id)
          .then(
            (res: any) => {
              window.location.reload();
            },
            (err: any) => {
            }
          );
    }
    else {
      alert('You pressed cancel');
    }

  }

  onEdit(index: any) {
    console.log(index);
    this.dialog.open(EditListAccountsComponent, {
      data: {
        userData: index,
      },
    });
  }

  routeToAdd(){
    this.router.navigate(['employee-home/list-account']);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  
}
