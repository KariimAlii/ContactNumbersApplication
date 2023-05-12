import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user:User = new User();
  isLoggedIn:boolean = false;
  constructor(
    private authService: AuthenticationService,
    private route: Router
  ){}
  ngOnInit(): void {
    this.authService
      .getLoggedStatus()
      .subscribe(status => this.isLoggedIn = status);
  }
  login():void {
    this.authService
      .login(this.user.username,this.user.password)
      .subscribe(data => {
        this.route.navigateByUrl('/contacts');
      });
  }
  logout(): void{
    this.authService.logout();
    this.user.username = '';
    this.user.password = '';
    this.route.navigateByUrl('/users/login');
  }

}
