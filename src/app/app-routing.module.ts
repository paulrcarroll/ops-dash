import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserUtils } from '@azure/msal-browser';
import { HomeComponent } from './home/home.component';
import { MsalGuard } from '@azure/msal-angular';
import { PaymentsHomeComponent } from './dashboards/payments-home/payments-home.component';
import { DashHomeComponent } from './dashboards/dash-home/dash-home.component';
import { SmsHomeComponent } from './dashboards/sms-home/sms-home.component';
import { IsvHomeComponent } from './dashboards/isv-home/isv-home.component';


const routes: Routes = [
  {
    path: 'dash',
    component: DashHomeComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'payments',
    component: PaymentsHomeComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'sms',
    component: SmsHomeComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'isv',
    component: IsvHomeComponent,
    canActivate: [MsalGuard],
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DashHomeComponent
      }
    ]
  },
  {
    // Needed for Error routing
    path: 'error',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Don't perform initial navigation in iframes or popups
      initialNavigation:
        !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup()
          ? 'enabledNonBlocking'
          : 'disabled', // Set to enabledBlocking to use Angular Universal
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
