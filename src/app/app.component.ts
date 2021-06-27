import { LoginService } from './services/login.service';
import { environment } from './../environments/environment';
import { Component } from '@angular/core';
import Auth from '@aws-amplify/auth';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isCollapsed: boolean = true;

  enrollInProgress: boolean = false;

  isLoggedIn: Boolean = false;

  isInstitute: Boolean = false;

  userName: string = '';

  constructor(private router: Router, private loginService: LoginService) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.checkAuthenticationState();
      });
  }

  async federated() {
    await Auth.federatedSignIn();
  }

  initAuth(): void {
    Auth.configure({
      Auth: {
        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        // identityPoolId: environment.cognito_identity_pool_id,

        // REQUIRED - Amazon Cognito Region
        region: environment.aws_region,

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: environment.cognito_upool_id,

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: environment.cognito_user_pool_web_client_id,

        // OPTIONAL - Hosted UI configuration
        oauth: {
          scope: [
            'phone',
            'email',
            'profile',
            'openid',
            'aws.cognito.signin.user.admin',
          ],
          redirectSignIn: environment.self_host,
          redirectSignOut: environment.self_host,
          responseType: 'code', // or 'token', note that REFRESH token will only be generated when the responseType is code
        },
      },
    });
  }

  checkAuthenticationState(): void {
    Auth.currentAuthenticatedUser({
      bypassCache: false,
    })
      .then((user) => {
        this.isLoggedIn = true;
        if (user.attributes) {
          this.userName = user.attributes.name;
          if (user.attributes.identities) {
            this.isInstitute = false;
            if (!this.enrollInProgress) {
              this.enrollInProgress = true;
              this.loginService.enroll().subscribe((response) => {
                this.enrollInProgress = false;
              });
            }
          } else {
            this.isInstitute = true;
          }
        } else {
          this.userName = user.username;
          this.isInstitute = false;
        }
      })
      .catch((err) => {
        this.isLoggedIn = false;
        this.userName = '';
      });
  }

  ngOnInit() {
    this.initAuth();
    this.checkAuthenticationState();
  }
}
