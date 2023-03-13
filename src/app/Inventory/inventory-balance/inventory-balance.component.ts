import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/Employee/employee.service';
import { PurchasesService } from 'src/app/Finance/purchases.service';
import { EditInventoryComponent } from './edit-inventory/edit-inventory.component';

@Component({
  selector: 'app-inventory-balance',
  templateUrl: './inventory-balance.component.html',
  styleUrls: ['./inventory-balance.component.css'],
})
export class InventoryBalanceComponent implements OnInit {
  displayedColumns: string[] = [
    'itemCode',
    'productName',
    'quantity',
    'productType',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<any> | any;
  allInventoryBalance: any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  constructor(
    public route_: Router,
    private _purchaseService: PurchasesService,
    public dialog: MatDialog,
    private _employeeService: EmployeeService,

  ) {}

  ngOnInit(): void {
    this._purchaseService.getInventoryBalance().subscribe((res: any) => {
      this.allInventoryBalance = res.payload;
      console.log('inventory balance', this.allInventoryBalance);
      this.dataSource = new MatTableDataSource(this.allInventoryBalance);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onEdit(index: any) {
    this.dialog.open(EditInventoryComponent, {
      data: {
        userData: index,
      },
    });
  }

  onDelete(index: any) {
    var text = 'Are you sure to delete?';
    if (confirm(text) == true) {
      this._employeeService.deleteInventory(index.id).then(
        (res: any) => {
          window.location.reload();
        },
        (err: any) => {}
      );
    } else {
      alert('You pressed cancel');
    }
  }
}
