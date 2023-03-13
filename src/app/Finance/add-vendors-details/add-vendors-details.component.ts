import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { PurchasesService } from '../purchases.service';
import { EditVendorsComponent } from './edit-vendors/edit-vendors.component';

@Component({
  selector: 'app-add-vendors-details',
  templateUrl: './add-vendors-details.component.html',
  styleUrls: ['./add-vendors-details.component.css'],
})
export class AddVendorsDetailsComponent implements OnInit {
  allVendors: any;
  displayedColumns: string[] = [
    'fullName',
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
    this._purchaseService.getAllVendorCodes().subscribe((data: any) => {
      this.allVendors = data.payload;
      this.dataSource = new MatTableDataSource(this.allVendors);
      this.dataSource.paginator = this.paginator;
      console.log('all vendors', this.allVendors);
    });
  }

  onDelete(index: any) {
    var text = "Are you sure to delete?";
    console.log('acbcsd',this.allVendors[index.id])
    console.log('INDEXX',index)
    if (confirm(text) == true) {
      this._purchaseService
      .deleteCustomers(index.id)
      .then((deletedEmp: any) => {
        console.log('deletedEmp' + deletedEmp);
        window.location.reload();
      },
      (err: any) => {
      });
    console.log('deleteUser', this.allVendors[index].id);
    }
    else {
      alert('You pressed cancel');
    }
  }

  onEdit(index: any) {
    console.log(index);
    this.dialog.open(EditVendorsComponent, {
      data: {
        userData: index,
      },
    });
  }

  routeToAdd(){
    this.router.navigate(['employee-home/add-vendor']);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }  
}
