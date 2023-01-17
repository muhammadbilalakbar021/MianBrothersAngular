import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { BankPaymentService } from '../bank-payment.service';
import { PurchasesService } from '../purchases.service';
import { EditCashPettyComponent } from './edit-cash-petty/edit-cash-petty.component';

@Component({
  selector: 'app-cash-petty',
  templateUrl: './cash-petty.component.html',
  styleUrls: ['./cash-petty.component.css'],
})
export class CashPettyComponent implements OnInit {
  public cashPettyPaymentTable: any;
  cash_index: number = 0;
  isCashLoaded: boolean = false;
  disablePrint: boolean = false;
  displayedColumns: string[] = [
    'accountCode',
    'accountInfo',
    'amountPaid',
    'description',
    'delete',
    'edit',
  ];
  dataSource: MatTableDataSource<any> | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  constructor(
    private _bankService: BankPaymentService,
    public dialog: MatDialog,
    public _purchaseService: PurchasesService,
    private _snackbar : MatSnackBar
  ) {}

  ngOnInit(): void {
    this._bankService.getCashPettyTable().subscribe((response: any) => {
      console.log('Cash Payment Table', response);
      this.cashPettyPaymentTable = response.payload;
      this.dataSource = new MatTableDataSource(this.cashPettyPaymentTable);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  loadCashPayment(index: number) {
    this.cash_index = index;
    this.isCashLoaded = true;
    let obj = new Array(this.cashPettyPaymentTable[this.cash_index]);
    this.dataSource = obj;
    this.disablePrint = true;
    console.log('HEHEH', this.dataSource);
  }
  onEdit(index: any) {
    this.dialog.open(EditCashPettyComponent, {
      data: {
        userData: this.cashPettyPaymentTable[index],
      },
    });
  }
  onDelete(index: any) {
    this._purchaseService
      .deleteBankPayment(this.cashPettyPaymentTable[index].id)
      .then(
        (res: any) => {
          console.log('deleted', res);
          window.location.reload();
        },
        (err: any) => {
        }
      );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  printReceipt(id: any) {
    let data: any = document.getElementById(id) as HTMLElement;
    let pdf = new jsPDF('p', 'mm', 'a4');

    html2canvas(data).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png;base64'); // 'image/jpeg' for lower quality output.
      // let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      document.body.appendChild(canvas);
      const imgProps = pdf.getImageProperties(contentDataURL);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('cash-petty.pdf');
    });
  }
}
