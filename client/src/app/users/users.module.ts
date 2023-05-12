import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UserLoginComponent } from './login/user-login.component';


@NgModule({
  declarations: [
    UsersComponent,
    UserLoginComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule
  ],
  exports:[
    UsersComponent,
    UserLoginComponent
  ]
})
export class UsersModule { }
