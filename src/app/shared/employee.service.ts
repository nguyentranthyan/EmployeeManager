import { Injectable } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database'
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.required,Validators.email]),
    mobile: new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]),
    city: new FormControl('',Validators.required),
    gender: new FormControl('1'),
    department: new FormControl(0),
    hireDate: new FormControl('',Validators.required),
    isPermanent: new FormControl(false)

  })
  constructor(private firebase:AngularFireDatabase) { }

  employeeList:AngularFireList<any>

  initializeFromGroup(){
    this.form.setValue({
      $key: null,
      fullName:'',
      email:'',
      mobile:'',
      city:'',
      gender:1,
      department:0,
      hireDate:'',
      isPermanent:false
    });
  };

  getEmployee(){
    this.employeeList=this.firebase.list('employees');
    return this.employeeList.snapshotChanges();
  }

  insertEmployee(employee){
    this.employeeList.push({
      fullname:employee.fullName,
      email:employee.email,
      mobile:employee.mobile,
      city:employee.city,
      gender:employee.gender,
      department:employee.department,
      hireDate:employee.hireDate,
      isPermanent:employee.isPermanent
    })
  }

  updateEmployee(employee){
    this.employeeList.update( employee.$key,{
      fullname:employee.fullName,
      email:employee.email,
      mobile:employee.mobile,
      city:employee.city,
      gender:employee.gender,
      department:employee.department,
      hireDate:employee.hireDate,
      isPermanent:employee.isPermanent
    })
  }

  deleteEmployee($key){
    return this.employeeList.remove($key);
  }
}
