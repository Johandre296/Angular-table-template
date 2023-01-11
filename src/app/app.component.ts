import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'tableTemplate';
  productForm!: FormGroup;
  actionBtn: string = 'Save';
  testObj = { id: 1, name: 'testsssssssssssssssssssssssss', price: 5 };
  testObj2 = { id: 2, name: 'test2', price: 50 };
  testObj3 = { id: 3, name: 'test3', price: 500 };
  testObj4 = { id: 4, name: 'test4', price: 5000 };
  testObj5 = { id: 5, name: 'test5', price: 50000 };
  testObj6 = { id: 6, name: 'test6', price: 500000 };
  testList = [
    this.testObj,
    this.testObj2,
    this.testObj3,
    this.testObj4,
    this.testObj5,
    this.testObj6,
  ];
  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      id: ['', Validators.required],
    });
    this.getAllProducts();
  }

  ngAfterViewInit() {
    //Waits for everything from OnInit to be called before these are called otherwise they will die :(
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getAllProducts() {
    //Populate table
    this.dataSource = new MatTableDataSource(this.testList);
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    //Filter bar up top
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editProduct(row: any) {
    //Populate the drawer with the clicked row's data
    this.actionBtn = "Update";
    this.productForm = this.formBuilder.group({
      productName: [row.name, Validators.required],
      id: [row.id, Validators.required],
      price: [row.price, Validators.required],
    });
  }

  resetDrawer() {
    //Clears the drawer values when Close is called
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      id: ['', Validators.required],
    });
  }

  deleteProduct(row:number){
    //Delete selected row
    alert(`Product with id : ${row} would have been deleted`);
  }

  addProduct(){
    this.actionBtn = "Save";
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      id: ['', Validators.required],
    });
  }
}
