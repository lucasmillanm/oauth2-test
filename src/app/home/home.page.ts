import {Component} from '@angular/core';
import {UserInfo} from '../models/user-info';
import {GoogleApiService} from '../services/google-api.service';
import {EmailIdResponse} from '../models/email-id-response';
import {forkJoin, map} from 'rxjs';
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
        /*for (let i of this.emailIds) {
          this.googleApi.getMail(sub, i).subscribe((mail) => {
            this.emailResponses.push(mail);
          });
        }*/
        this.fetchEmailResponses(sub);
        console.log(this.emailResponses);
        // const snippets: string[] = this.emailResponses.map(response => response.snippet);
        // console.log(snippets);
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

  fetchEmailResponses(sub: string) {
    const emailResponseObservables = this.emailIds.map(id => this.googleApi.getMail(sub, id));

    forkJoin(emailResponseObservables).subscribe(
      emailResponses => {
        this.emailResponses = emailResponses;
        console.log(this.emailResponses);
        this.emailSnippets = emailResponses.map(response => response.snippet);
        console.log(this.emailSnippets);
      },
      error => {
        console.error("Error fetching email responses:", error);
      }
    );
  }

  /*transformEmailToSnippet(): void {
    if (this.emailResponses.length != 0) {
      console.log("before")
      this.emailSnippets = this.emailResponses.map(response => response.snippet);
      console.log("after")
    } else {
      return;
    }
  }*/
}
