import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ContactService } from 'src/app/Services/contact.service';
import { Contact } from 'src/app/_models/contact';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss']
})
export class ContactAddComponent implements OnInit  {
  newContact: Contact = new Contact();
  constructor(
    private authService: AuthenticationService,
    private contactService:ContactService,
    private router: Router
  ) {}
  ngOnInit(): void {
    const token = this.authService.getToken();
    // if (!token) this.router.navigateByUrl('/users/login');
  }
  Add():void {
    this.contactService.addContact(this.newContact)
      .subscribe(contacts => this.router.navigateByUrl('/contacts'));
  }
}


