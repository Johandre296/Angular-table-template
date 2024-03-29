import { Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
// import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'tableTemplate';
  testObj = {'id':1,'name':'test'};
  testObj2 = {'id':2,'name':'test2'};
  testObj3 = {'id':3,'name':'test3'};
  testObj4 = {'id':4,'name':'test4'};
  testObj5 = {'id':5,'name':'test5'};
  testObj6 = {'id':6,'name':'test6'};
  testList = [this.testObj,this.testObj2,this.testObj3,this.testObj4,this.testObj5,this.testObj6];

  displayedColumns: string[] = ['id', 'name'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(private dialog: MatDialog) {}

ngOnInit(): void {
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


