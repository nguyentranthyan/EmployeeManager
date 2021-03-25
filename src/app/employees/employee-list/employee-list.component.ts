import { Component, OnInit,Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeService } from 'src/app/shared/employee.service'

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
listData: MatTableDataSource<any>
displayedColums:string[]=['fullName'];
@Input() matRowDefColumns: string[];
  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployee().subscribe(list=>{
      let array=list.map(item=>{
        return {
          $key: item.key,
          ...item.payload.val()
          
        };
      });
      this.listData = new MatTableDataSource(array);
    });
  }

}
