import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PurchasesService } from '../../purchases.service';
import { SalesService } from '../sales.service';
import { EditCustomersComponent } from './edit-customers/edit-customers.component';

@Component({
  selector: 'app-add-customers-details',
  templateUrl: './add-customers-details.component.html',
  styleUrls: ['./add-customers-details.component.css'],
})
export class AddCustomersDetailsComponent implements OnInit {
  allCustomers: any;
  displayedColumns: string[] = [
    'customerCode',
    'ntn',
    'stRegistrationNumber',
    'creditTerms',
    'accountCode',
    'username',
    'cnic',
    'department',
    'position',
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
    private _purchaseService: PurchasesService,
    public dialog: MatDialog,
    public router : Router,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._purchaseService.getAllCustomersCodes().subscribe((data: any) => {
      this.allCustomers = data.payload;
      this.dataSource = new MatTableDataSource(this.allCustomers);
      this.dataSource.paginator = this.paginator;
      console.log('all Customers', this.allCustomers);
    });
  }

  
  onDelete(index: any){
    var text = "Are you sure to delete?";
    console.log('acbcsd',this.allCustomers[index.id])
    console.log('INDEXX',index)
    if (confirm(text) == true) {
        this._purchaseService
          .deleteCustomers(index.id)
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
    this.dialog.open(EditCustomersComponent, {
      data: {
        userData: index,
      },
    });
  }

  routeToAdd(){
    this.router.navigate(['employee-home/add-customer']);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  
}
