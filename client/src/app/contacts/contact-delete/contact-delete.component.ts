import { Component, OnInit,Input , OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ContactService } from 'src/app/Services/contact.service';
import { Contact } from 'src/app/_models/contact';

@Component({
  selector: 'app-contact-delete',
  templateUrl: './contact-delete.component.html',
  styleUrls: ['./contact-delete.component.scss']
})
export class ContactDeleteComponent implements OnInit,OnDestroy {
  sub : Subscription | null = null;
  contact : Contact|null = null;
  constructor(private contactService : ContactService , private ac :ActivatedRoute , private router: Router , private authService : AuthenticationService) {}
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
  ngOnInit(): void {
    const token = this.authService.getToken();
    if (token) {
      this.sub = this.ac.params.subscribe(data => {
        this.contactService.getContactById(data["id"]).subscribe(contact => this.contact = contact);
      })
    }
    // else {
    //   this.router.navigateByUrl('/users/login');
    // }
  }
  Delete():void {
    this.contactService.deleteContact(this.contact)
      .subscribe(contacts => this.router.navigateByUrl('/contacts'));
  }
}
