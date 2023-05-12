import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ContactLockService } from 'src/app/Services/ContactLock.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ContactService } from 'src/app/Services/contact.service';
import { Contact } from 'src/app/_models/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
})
export class ContactListComponent implements OnInit {

  //* =======================Members======================= *//

  contacts: Contact[] = [];

  //* =======================Locking======================= *//

  lockedContacts: Set<string> = new Set();

  isContactLocked(contactId: string): boolean {
    return this.contactLockService.isContactLocked(contactId);
  }

  getEditingUser(contactId: string): string {
    return this.contactLockService.getEditingUser(contactId);
  }

  //* =======================Pagination======================= *//

  pageContacts: Contact[][] = [];

  currentPage : number = 1;
  total : number = 0;
  limit : number = 4;
  pages : number[] = [];
  changePage(page : number) : void {
    this.currentPage = page;
  }

  range(start:number,end:number) : number[] {
    return [...Array(end).keys()].map(el => el + start);
  }

  adjustPages(contacts: Contact[]):void {
    this.contacts = contacts;
    this.total = this.contacts.length;
    const pagesCount = Math.ceil(this.total / this.limit);
    this.pages = this.range(1,pagesCount);
    for (let i = 0; i < this.total; i += this.limit) {
      const chunk = this.contacts.slice(i, i + this.limit);
      this.pageContacts.push(chunk);
    }
  }

  //* =======================Filter======================= *//
  cities : string[] = ['--','Cairo','Alexandria','Tanta','Mansoura','Isamilia']

  filterCity(city:string):void {
    this.contactService
      .getFilteredContacts(city)
      .subscribe(contacts => {
        this.pageContacts =[];
        this.currentPage=1;
        this.adjustPages(contacts);
      });
  }


  constructor(
    private authService: AuthenticationService,
    private contactService: ContactService,
    private router: Router,
    private contactLockService: ContactLockService
  ) {}


  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      this.contactService
        .getAllContacts()
        .subscribe(contacts => {
          this.adjustPages(contacts);
        });
      this.contactLockService
        .getLockedContacts$()
        .subscribe(lockedContacts => {
          this.lockedContacts = lockedContacts;
        });
    }
    // else {
    //   this.router.navigateByUrl('/users/login');
    // }
  }


}
