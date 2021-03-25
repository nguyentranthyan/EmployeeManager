import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service'
import { DepartmentService } from 'src/app/shared/department.service'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  submited: boolean;

  constructor(public employeeService: EmployeeService, public departmentService:DepartmentService) { }
  // departments = [
  //   { id: 1, value: 'Dep 1' },
  //   { id: 2, value: 'Dep 2' },
  //   { id: 3, value: 'Dep 3' }
  // ]
  ngOnInit(): void {
    this.employeeService.getEmployee();
  }
  onClear(){
    this.employeeService.form.reset();
    this.employeeService.initializeFromGroup();
  }
  onSubmit(){
    if(this.employeeService.form.valid){
      this.employeeService.insertEmployee(this.employeeService.form.value);
      this.employeeService.form.reset();
      this.employeeService.initializeFromGroup();
    }
  }
}
