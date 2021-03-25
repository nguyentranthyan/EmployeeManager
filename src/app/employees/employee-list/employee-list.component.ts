import { Component, OnInit, ViewChild } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';

import { EmployeeService } from 'src/app/shared/employee.service'
import { DepartmentService } from 'src/app/shared/department.service'
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  searchKey:string
  listData: MatTableDataSource<any>
  displayedColumns:string[]=['fullName','Email','Mobile','City','departmentName','Actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private employeeService: EmployeeService, 
    private departmentService:DepartmentService,
    public dialog:MatDialog,
    ) { }

  ngOnInit(): void {
    this.employeeService.getEmployee().subscribe(list=>{
      let array=list.map(item=>{
        let departmentName=this.departmentService.getDepartmentName(item.payload.val()['department']);
        return {
          $key: item.key,
          departmentName,
          ...item.payload.val()
          
        };
      });
      this.listData = new MatTableDataSource(array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
  }
  onSeachClear(){
    this.searchKey=" ";
    this.applyFilter();
  }
  applyFilter(){
    this.listData.filter=this.searchKey.trim().toLowerCase();
  }
  oncreate(){
    this.employeeService.initializeFromGroup();
    const dialogconfig=new MatDialogConfig();
    dialogconfig.autoFocus=true;
    dialogconfig.width="60%"
    this.dialog.open(EmployeeComponent,dialogconfig)
    
  }
  onEdit(listData){
    this.employeeService.populateForm(listData);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(EmployeeComponent,dialogConfig);
  }
  onDelete($key){
    if(confirm('ARe You Delte')){
      this.employeeService.deleteEmployee($key);
      alert("scdscsd")
    }
  }

}
