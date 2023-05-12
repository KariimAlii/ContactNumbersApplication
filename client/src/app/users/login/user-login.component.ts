import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent {
  constructor(private authService: AuthenticationService , private router : Router) {}
  user : User = new User();
  // isLoggedIn:boolean = false;
  submit():void {
    this.authService
      .login(this.user.username,this.user.password)
      .subscribe(
        success => {
          this.router.navigateByUrl('/contacts');
          // this.isLoggedIn = true;
        } ,
        error => {
          console.log('login failed')
        }
    );
  }
}
