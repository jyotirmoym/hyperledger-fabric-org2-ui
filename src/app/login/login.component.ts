import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  showPage: boolean = false;

  userName: string = '';

  passWord: string = '';

  firstName: string = '';

  familyName: string = '';

  register: boolean = false;

  message: string = '';

  submitable: boolean = true;

  isProcessing: boolean = false;

  constructor(
    private loginService: LoginService,
    private route: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (
      this.activateRoute.routeConfig != null &&
      this.activateRoute.routeConfig['path'] === 'logout'
    ) {
      this.showPage = false;
      this.logout();
    } else {
      this.checkAuthenticationState();
      this.showPage = true;
      this.register = false;
    }
  }

  async login() {
    this.submitable = false;
    this.message = '';
    if (this.register) {
      if (!this.firstName) {
        this.message = this.message + '<li>First Name is required</li>';
      }
      if (!this.familyName) {
        this.message = this.message + '<li>Last Name is required</li>';
      }
    }
    try {
      var user = await this.loginService.signIn(this.userName, this.passWord, this.firstName, this.familyName);
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        this.register = true;
        this.submitable = true;
        this.message = "This is your first time login, please provide the additional details.<br/>Also this is your only chance to change the password of your choice."
      } else {
        this.submitable = true;
        if (this.register) {
          this.loginService.enroll().subscribe(response => {
            console.log(response);
          });
        }
        this.route.navigate(['/search']);
      }
    } catch (error) {
      this.message = error.message;
      this.submitable = true;
    }
  }

  async logout() {
    try {
      await this.loginService.signOut();
      this.route.navigate(['/']);
    } catch (error) {
      console.error('error signing out: ', error);
    }
  }

  checkAuthenticationState(): void {
    Auth.currentAuthenticatedUser({
      bypassCache: false,
    })
      .then((user) => {
        this.route.navigate(['/']);
      })
      .catch((err) => {

      });
  }
}
