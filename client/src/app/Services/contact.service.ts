import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import {Contact} from '../_models/contact'
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private baseUrl = 'http://localhost:3000';
  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {}
  setAuthHeaders() : HttpHeaders {
    const token = this.authService.getToken();
    const headers = new HttpHeaders().set("Authorization",`Bearer ${token}`);
    return headers;
  }
  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]> (`${this.baseUrl}/api/contacts` , {headers : this.setAuthHeaders()})
  }
  getFilteredContacts(city:string): Observable<Contact[]> {
    if (city !== '--') {
      return this.http
      .get<Contact[]> (`${this.baseUrl}/api/contacts` , {headers : this.setAuthHeaders()})
      .pipe(
        map(data =>data.filter(a => a.address.includes(city)) )
      )
    } else {
      return this.http.get<Contact[]> (`${this.baseUrl}/api/contacts` , {headers : this.setAuthHeaders()})
    }
  }
  getContactById(id : string) : Observable<Contact> {
    return this.http.get<Contact> (`${this.baseUrl}/api/contacts/${id}` , {headers : this.setAuthHeaders()})
  }
  addContact(contact : Contact) : Observable<Contact> {
    return this.http.post<Contact> (`${this.baseUrl}/api/contacts`,contact , {headers : this.setAuthHeaders()})
  }
  updateContact(contact : Contact) : Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/api/contacts/${contact._id}`,contact , {headers : this.setAuthHeaders()})
  }
  deleteContact(contact : Contact) : Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/api/contacts/${contact._id}` , {headers : this.setAuthHeaders()})
  }
}
