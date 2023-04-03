import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

   userList: AngularFireList<any>

  

  constructor(private db:AngularFireDatabase ) {

    this.userList = db.list('users')
  
  }





  createUser(user: User) {
    
    this.userList.push({
    phone: user.phone ,
    firstname: user.firstname ,
    lastname: user.lastname ,
    Cin: user.Cin,
  
    
}).catch(error=>{
console.error(error)

})

}


getUsers() : Observable<any>{
return this.db.list('users').snapshotChanges();
}

getUserById(id:any) : Observable<any>{
  return this.db.list('users', ref => ref.orderByKey().equalTo(id)).snapshotChanges();
}}
