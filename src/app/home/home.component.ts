import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, AuthenticationResult } from '@azure/msal-browser';
import { filter } from 'rxjs/operators';
import { AnimationState, fade } from './animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: fade
})
export class HomeComponent implements OnInit {
  loginDisplay = false;
  randomImageName = this.randomImage();
  state = AnimationState.IN;

  constructor(private authService: MsalService, private msalBroadcastService: MsalBroadcastService) { 
    setInterval(() => {
      this.toggleState();
    }, 10000);
  }

  toggleState() {
    this.state = this.state === AnimationState.IN ? AnimationState.OUT : AnimationState.IN;
    if (this.state === AnimationState.IN) {
      this.randomImageName = this.randomImage();
    }
  }

  ngOnInit(): void {

    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => msg.eventType === EventType.LOGIN_SUCCESS),
      )
      .subscribe((result: EventMessage) => {
        const payload = result.payload as AuthenticationResult;
        this.authService.instance.setActiveAccount(payload.account);
        this.setLoginDisplay();
      });
    this.setLoginDisplay();
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  randomImage() {
    const index = Math.floor(Math.random() * 36) + 1;
    return `assets/saf/${index}.jpg`;
  }

}
