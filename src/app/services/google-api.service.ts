import {Injectable} from '@angular/core';
import {AuthConfig, OAuthService} from 'angular-oauth2-oidc';
import {Observable, Subject} from 'rxjs';
import {UserInfo} from '../models/user-info';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EmailIdResponse} from '../models/email-id-response';
import {EmailResponse} from '../models/email-response';

const oAuthConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  strictDiscoveryDocumentValidation: false,
  redirectUri: window.location.origin,
  clientId: '699184255864-j932codffb7jvp0evb6nrclrhq3nre1g.apps.googleusercontent.com',
  scope: 'openid profile email https://www.googleapis.com/auth/gmail.readonly'
}

@Injectable({
  providedIn: 'root'
})
export class GoogleApiService {

  gmail: string = 'https://gmail.googleapis.com';
  userProfileSubject: Subject<UserInfo> = new Subject<UserInfo>();

  constructor(
    private readonly oAuthService: OAuthService,
    private readonly httpClient: HttpClient
  ) {
    oAuthService.configure(oAuthConfig);
    oAuthService.logoutUrl = 'https://www.google.com/accounts/logout';
    oAuthService.loadDiscoveryDocument().then(() => {
      oAuthService.tryLoginImplicitFlow().then(() => {
        if(!oAuthService.hasValidAccessToken()) {
          oAuthService.initLoginFlow();
        } else {
          oAuthService.loadUserProfile().then((userProfile): void => {
            this.userProfileSubject.next(userProfile as UserInfo)
          });
        }
      });
    });
  }

  getEmailIds(userId: string): Observable<any> {
    return this.httpClient.get<EmailIdResponse>(`${this.gmail}/gmail/v1/users/${userId}/messages`,
      {headers: this.authHeader()});
  }

  getMail(userId: string, mailId: string): Observable<any> {
    return this.httpClient.get<EmailResponse>(`${this.gmail}/gmail/v1/users/${userId}/messages/${mailId}`,
      {headers: this.authHeader()});
  }

  isLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  signOut(): void {
    this.oAuthService.logOut();
  }

  private authHeader(): HttpHeaders {
    return new HttpHeaders ({
      'Authorization': `Bearer ${this.oAuthService.getAccessToken()}`
    });
  }

}
