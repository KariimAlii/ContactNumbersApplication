import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of , BehaviorSubject} from 'rxjs';
import { map, filter, tap } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {
  private baseUrl = 'http://localhost:3000';

  isLoggedIn:boolean = false;
  private isLoggedSubject : BehaviorSubject<boolean>;

  constructor(private http: HttpClient) { 
    if (this.isTokenValid()) {
      this.isLoggedSubject = new BehaviorSubject<boolean>(true);
      this.isLoggedIn = true;
    } else {
      this.isLoggedSubject = new BehaviorSubject<boolean>(false);
      this.isLoggedIn = false;
    }
  }
  ngOnInit(): void {

  }


  login(username: string, password: string): Observable<{ token: string, expiresIn: number, username:string }> {
    return this.http
      .post<{ token: string, expiresIn: number, username:string }>(`${this.baseUrl}/api/login`, { username,password })
      .pipe(
        tap(response => {
          const tokenExpiration = new Date(new Date().getTime() + response.expiresIn * 1000);
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
          localStorage.setItem('tokenExpiration', tokenExpiration.toISOString());
          this.isLoggedSubject.next(true); 
          this.isLoggedIn = true;
        })
      );
  }

  getToken(): string {
    if (!this.isTokenValid()) return null;
    console.log('token is valid');
    const token = localStorage.getItem('token');
    this.isLoggedSubject.next(true); 
    this.isLoggedIn = true;
    return token;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('tokenExpiration');
    this.isLoggedSubject.next(false); 
    this.isLoggedIn = false;
  }
  
  isTokenValid() : boolean {
    const token = localStorage.getItem('token');
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (!token || !tokenExpiration) {
      return false;
    }
    const now = new Date();
    const expirationDate = new Date(tokenExpiration);
    if (expirationDate <= now) {
      this.logout();
      return false;
    } else {
      return true;
    }
  }
  getLoggedStatus() {
    return this.isLoggedSubject.asObservable();
  }
}

