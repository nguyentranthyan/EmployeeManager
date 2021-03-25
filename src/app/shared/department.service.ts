import { keyframes } from '@angular/animations';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database'
import * as _ from 'lodash'

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

   getDepartmentName($key){
    if($key=="0")
    return"";
    else{
      return _.find(this.array, (obj)=>{return obj.$key== $key});
    }
   }
}
