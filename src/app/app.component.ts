import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tableTemplate';
  freshnessList = ['Brand New', 'Second Hand', 'Old'];
  productForm!: FormGroup;
  actionBtn : string = "Save";
  testObj = {'id':1,'name':'testssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'};
  testObj2 = {'id':2,'name':'test2'};
  testObj3 = {'id':3,'name':'test3'};
  testObj4 = {'id':4,'name':'test4'};
  testObj5 = {'id':5,'name':'test5'};
  testObj6 = {'id':6,'name':'test6'};
  testList = [this.testObj,this.testObj2,this.testObj3,this.testObj4,this.testObj5,this.testObj6];

  // displayedColumns: string[] = ['id', 'name'];
  displayedColumns: string[] = ['id', 'name','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(private dialog: MatDialog,private formBuilder:FormBuilder) {}

ngOnInit(): void {
  this.productForm = this.formBuilder.group({
    productName:['',Validators.required],
    category:['',Validators.required],
    freshness:['',Validators.required],
    price:['',Validators.required],
    comment:['',Validators.required],
    date:['',Validators.required]
  })

  this.getAllProducts();
}

ngAfterViewInit(){
  this.dataSource.paginator = this.paginator;
}

getAllProducts(){
  console.log(this.testList);
  this.dataSource = new MatTableDataSource(this.testList);
  this.dataSource.sort = this.sort;
  console.log(this.dataSource);
}

editProduct(row : any){
  this.dialog.open(DialogComponent,{
    data:row
  }).afterClosed().subscribe(val =>{
    if(val === 'update'){
      this.getAllProducts();
    }
  })
}

deleteProduct(id:number){
  // this.api.delete(id).subscribe({
  //   next:(res)=>{
  //     alert("deleted")
  //   },
  //   error:()=>{
  //     alert("error while deleting")
  //   }
  // })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent,{
      width:'30%',
      data:{
        animal:'panda',
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


