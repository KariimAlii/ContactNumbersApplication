import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { ContactUpdateComponent } from './contact-update/contact-update.component';
import { ContactDeleteComponent } from './contact-delete/contact-delete.component';


@NgModule({
  declarations: [
    ContactListComponent,
    ContactDetailsComponent,
    ContactAddComponent,
    ContactUpdateComponent,
    ContactDeleteComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    FormsModule, 
    ReactiveFormsModule
  ],
  exports:[
    ContactListComponent,
    ContactDetailsComponent,
    ContactAddComponent,
    ContactUpdateComponent,
    ContactDeleteComponent,
  ]
})
export class ContactsModule { }
