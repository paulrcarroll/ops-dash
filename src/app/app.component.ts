import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MsalService, MsalBroadcastService, MSAL_GUARD_CONFIG, MsalGuardConfiguration } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map, tap, filter, takeUntil } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';

const GRAPH_ENDPOINT_GET_PHOTO =
  'https://graph.microsoft.com/v1.0/me/photo/$value';

const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Everyware Operations Dashboard';
  isIframe = false;
  loggedIn = false;
  profile?: ProfileType;

  private readonly _destroying$ = new Subject<void>();
  
  isImageLoading: boolean = false;
  imageToShow: any;

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private http: HttpClient,
    private domSanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.isIframe = window !== window.parent && !window.opener;

    this.msalBroadcastService.inProgress$
      .pipe(
        filter((status: InteractionStatus) => status === InteractionStatus.None),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
      });
  }

  getImage(imageUrl: string): Observable<Blob> {
    return this.http
      .get(imageUrl, {
        responseType: 'blob',
        headers: new HttpHeaders({ 'Content-Type': 'image/jpeg' }),
      })
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  
  getProfilePicture() {
    this.isImageLoading = true;
    this.getImage(GRAPH_ENDPOINT_GET_PHOTO).subscribe(
      (blob) => {
        this.isImageLoading = false;

        var urlCreator = window.URL || window.webkitURL;
        this.imageToShow = this.domSanitizer.bypassSecurityTrustUrl(
          urlCreator.createObjectURL(blob)
        );
      },
      (error) => {
        this.isImageLoading = false;
        console.log(error);
      }
    );
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        console.log(reader.result);
        const imgRes: any = reader.result;
        this.imageToShow = this.domSanitizer.bypassSecurityTrustUrl(imgRes);
      },
      false
    );
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  setLoginDisplay() {
    this.loggedIn = this.authService.instance.getAllAccounts().length > 0;

    if (this.loggedIn) {
      this.http.get(GRAPH_ENDPOINT)
        .subscribe(profile => {
          this.profile = profile;

          this.getProfilePicture();

        });
    }
  }

  getProfilePic() {
    if (this.profile) {
      const picEndpoint2 = `https://graph.microsoft.com/v1.0/users/${this.profile.id}/photo`;
      const picEndpoint = `https://graph.microsoft.com/v1.0/me/photo/$value`;
      this.http.get(picEndpoint)
        .subscribe(data => {
          console.log(data);
        });
    }
  }

  // gahhh! auth
  login() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      } else {
        this.authService.loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      }
    } else {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
      } else {
        this.authService.loginRedirect();
      }
    }
  }

  logout() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      this.authService.logoutPopup({
        postLogoutRedirectUri: "/",
        mainWindowRedirectUri: "/"
      });
    } else {
      this.authService.logoutRedirect({
        postLogoutRedirectUri: "/",
      });
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }
}
