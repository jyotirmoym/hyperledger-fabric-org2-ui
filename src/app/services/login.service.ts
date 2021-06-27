import { Auth as MAuth } from '@aws-amplify/auth';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private enrollURL: string = "";

  constructor(private httpClient: HttpClient) {
    this.enrollURL = environment.commodities_api_base_url + '/register';
  }

  async signIn(
    username: string,
    password: string,
    name?: string,
    familyName?: string
  ) {
    return Auth.signIn(username, password).then(async (user) => {
      if (user.challengeName && user.challengeName === 'NEW_PASSWORD_REQUIRED') {
        const { requiredAttributes } = user.challengeParam;
        if (name && familyName) {
          return await Auth.completeNewPassword(user, password, {"family_name": familyName, "name": name});
        } else {
          return user;
        }
      } else {
        return user;
      }
    });
  }

  async signOut() {
    try {
      return await MAuth.signOut({ global: true });
    } catch (e) {
      return await Auth.signOut({ global: true });
    }
  }

  enroll(): Observable<any> {
    return this.httpClient.post(this.enrollURL, null);
  }
}
