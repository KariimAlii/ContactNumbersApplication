import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactLockService {
  private lockedContacts: Set<string> = new Set();
  private editingUsers: { [key: string]: string } = {};
  private lockedContacts$ = new BehaviorSubject<Set<string>>(this.lockedContacts);

  lockContact(contactId: string, editingUser: string) {
    this.lockedContacts.add(contactId);
    this.editingUsers[contactId] = editingUser;
    this.lockedContacts$.next(this.lockedContacts);
  }

  unlockContact(contactId: string) {
    this.lockedContacts.delete(contactId);
    delete this.editingUsers[contactId];
    this.lockedContacts$.next(this.lockedContacts);
  }

  isContactLocked(contactId: string): boolean {
    return this.lockedContacts.has(contactId);
  }

  getEditingUser(contactId: string): string {
    return this.editingUsers[contactId];
  }

  getLockedContacts$() {
    return this.lockedContacts$.asObservable();
  }
}
