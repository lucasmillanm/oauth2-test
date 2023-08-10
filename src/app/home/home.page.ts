import {Component} from '@angular/core';
import {UserInfo} from '../models/user-info';
import {GoogleApiService} from '../services/google-api.service';
import {EmailIdResponse} from '../models/email-id-response';
import {EmailResponse} from '../models/email-response';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userInfo?: UserInfo;
  emailIdResponse?: EmailIdResponse;
  emailIds: string[] = [];
  emailResponses: EmailResponse[] = [];
  emailSnippets: string[] = [];

  constructor(
    private readonly googleApi: GoogleApiService
  ) {
    googleApi.userProfileSubject.subscribe((info: UserInfo) =>
      this.userInfo = info
    );
  }

  isLoggedIn(): boolean {
    return this.googleApi.isLoggedIn();
  }

  logOut(): void {
    this.googleApi.signOut();
  }

  getEmails(): void {
    if (this.userInfo?.info.sub) {
      const sub: string = this.userInfo.info.sub;
      this.googleApi.getEmailIds(sub).subscribe((ids) => {
        this.emailIdResponse = ids;
        this.transformResponseToId();
        this.emailResponses = [];

        console.log(this.emailResponses);

      }, (error) => {
        console.log(error);
        return;
      });
    }
  }
  transformResponseToId(): void {
    if (this.emailIdResponse) {
      this.emailIds = this.emailIdResponse.messages.map(response => response.id);
    } else {
      return;
    }
  }
}
