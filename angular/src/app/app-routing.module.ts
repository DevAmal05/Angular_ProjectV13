import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { LoginComponent } from './login/login.component';
import { PeopleListComponent } from './people-list/people-list.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  { path:'', component:LoginComponent },
 
  { path:'register', component:RegisterComponent },
  { path:'people-list', component:PeopleListComponent },
  { path:'add-user', component:AddUserComponent },
  { path:'update-user/:id', component:UpdateUserComponent },
  { path:'resetpassword', component:ResetpasswordComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
