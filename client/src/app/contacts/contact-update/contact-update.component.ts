import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContactLockService } from 'src/app/Services/ContactLock.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ContactService } from 'src/app/Services/contact.service';
import { Contact } from 'src/app/_models/contact';
@Component({
  selector: 'app-contact-update',
  templateUrl: './contact-update.component.html',
  styleUrls: ['./contact-update.component.scss'],
})
export class ContactUpdateComponent implements OnInit, OnDestroy {
  sub: Subscription | null = null;
  contact: Contact = new Contact();
  contactId:string;
  editingUser: string;

  constructor(
    private contactService: ContactService,
    private ac: ActivatedRoute,
    private authService: AuthenticationService,
    private contactLockService: ContactLockService,
    private router: Router
  ) {}
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
    this.contactLockService.unlockContact(this.contactId);
  }
  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      this.sub = this.ac.params.subscribe((params) => {
        this.contactId = params['id'];
        this.contactService
          .getContactById(this.contactId)
          .subscribe((contact) => (this.contact = contact));
        this.editingUser = localStorage.getItem('username');
        this.contactLockService.lockContact(this.contactId, this.editingUser);
      });
    } else {
      this.router.navigateByUrl('/users/login');
    }
  }
  Update(): void {
    this.contactService
      .updateContact(this.contact)
      .subscribe((data) => this.router.navigateByUrl('/contacts'));
  }
}
