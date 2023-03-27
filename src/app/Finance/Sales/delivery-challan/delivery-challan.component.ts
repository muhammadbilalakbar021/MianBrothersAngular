import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { PurchasesService } from '../../purchases.service';
import { SalesService } from '../sales.service';
import { EditDeliveryComponent } from './edit-delivery/edit-delivery.component';

@Component({
  selector: 'app-delivery-challan',
  templateUrl: './delivery-challan.component.html',
  styleUrls: ['./delivery-challan.component.css'],
})
export class DeliveryChallanComponent implements OnInit {
  deliveryChallanTableData: any;
  public purchaseOrder: any;
  public vendorsCode: any;
  public purchaseTableData: any;
  public product_index: number = 0;
  public purchase_index: number = 0;
  public isProductCodeLoaded: boolean = false;
  public isPurchaseLoaded: boolean = false;
  allDataById: any;
  disablePrint: boolean = false;
  customerByIdData: any;
  deliveryChallanById: any;
  displayedColumns: string[] = [
    'productItemCode',
    'quantity',
    'unit',
    'delete',
    'edit',
  ];
  dataSource: MatTableDataSource<any> | any;
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  @ViewChild(MatSort) sort: MatSort | any;
  doc = new jsPDF();
  constructor(
    private _purchaseSevice: PurchasesService,
    public dialog: MatDialog,
    private _salesService: SalesService,
    private _snackbar :MatSnackBar
  ) {}

  ngOnInit(): void {
    this._purchaseSevice.getAlldeliveryChallan().subscribe((res: any) => {
      this.deliveryChallanTableData = res.payload;
      console.log('DeliveryChallanComponent', this.deliveryChallanTableData);
      this.dataSource = new MatTableDataSource(this.deliveryChallanTableData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  loadPurchase(index: number) {
    this.purchase_index = index;
    this.isPurchaseLoaded = true;
    this._salesService
      .getCustomersById(this.deliveryChallanTableData[this.purchase_index].customerId)
      .subscribe((res: any) => {
        this.customerByIdData = res.payload;
        this.isPurchaseLoaded = true;
        console.log('Customer', this.purchase_index, res.payload);
      });
      console.log("ID PUR",this.deliveryChallanTableData[this.purchase_index].orderId)
      console.log("ID PUR 1",this.deliveryChallanTableData)
      console.log("ID PUR 2",this.purchase_index)
    this._purchaseSevice.getProductHistory(this.deliveryChallanTableData[this.purchase_index].orderId).subscribe((response: any) => {
        console.log('Purchase table response', response);
        this.purchaseTableData = response.payload;
        this.dataSource = new MatTableDataSource(this.purchaseTableData);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
    // let obj = new Array(this.deliveryChallanTableData[this.product_index]);
    // this.dataSource = obj;
    this.disablePrint = true;
    console.log('HEHEH', this.dataSource);
  }

  onEdit(index: any) {
    this._purchaseSevice
      .getDeliveryChallanById(this.deliveryChallanTableData[this.purchase_index].id)
      .subscribe((res: any) => {
        this.allDataById = res.payload[0];
        this.dialog.open(EditDeliveryComponent, {
          data: {
            userData: this.allDataById,
          },
        });
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onDelete(index: any) {
    var text = "Are you sure to delete?";
    if (confirm(text) == true) {
      this._purchaseSevice
      .deleteDeliveryChallan(this.deliveryChallanTableData[this.purchase_index].id)
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
      pdf.save('delivery-challan.pdf');
    });
  }
}
