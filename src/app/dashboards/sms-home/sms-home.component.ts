import { Component } from '@angular/core';
import { TableViewOptions } from 'src/app/view-table/view-table.component';

@Component({
  selector: 'app-sms-home',
  templateUrl: './sms-home.component.html',
  styleUrl: './sms-home.component.scss'
})
export class SmsHomeComponent {

  recentSmsFailOptions: TableViewOptions = {
    queryParams: {
      viewName: 'ops.vwFailedSmsPctGtr3'
    },
    title: 'Recent SMS Failures > 3%'
  }
}
