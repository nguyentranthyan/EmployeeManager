import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database'
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  departmentlist: AngularFireList<any>;
  array = [];
  constructor(private firebase:AngularFireDatabase) {
    this.departmentlist=this.firebase.list('department');
    console.log('departmentlist');
    this.departmentlist.snapshotChanges().subscribe(list=>{
      this.array=list.map(item=>{
      
        return {
          $key: item.key,
          ...item.payload.val()
        };
      });
    });

   }
}