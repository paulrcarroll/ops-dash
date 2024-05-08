import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserUtils } from '@azure/msal-browser';
import { HomeComponent } from './home/home.component';
import { MsalGuard } from '@azure/msal-angular';
import { GatewayHomeComponent } from './gateways/gateway-home/gateway-home.component';


const routes: Routes = [
  {
    path: 'gateways',
    component: GatewayHomeComponent,
    canActivate: [MsalGuard],
  },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: GatewayHomeComponent
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
