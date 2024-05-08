import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GuiColumn, GuiRowSelection, GuiRowSelectionType, GuiSelectedRow } from '@generic-ui/ngx-grid';
import { OpsDataService } from '../../services/ops-data-service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-recent-failed',
  templateUrl: './recent-failed.component.html',
  styleUrl: './recent-failed.component.scss'
})
export class RecentFailedComponent {
  columns: Array<GuiColumn> = [{
    header: 'Sales Site',
    field: 'salesSite',
    width: 200
  }, {
    header: 'SsId',
    field: 'salesSiteId',
    width: 100
  }, {
    header: 'Start Date',
    field: 'siteStartDate',
    width: 150
  }, {
    header: 'Phone',
    field: 'phoneNumber',
    width: 120
  }, {
    header: 'Provider',
    field: 'provider',
    width: 120
  },
  {
    header: 'Sent',
    field: 'messagesSent',
    width: 80
  }, {
    header: 'Failed',
    field: 'failedMessages',
    width: 80
  }, {
    header: '%',
    field: 'pctFailed',
    width: 50
  }];

  @Input() smsData: any[] = [];
  @Output() chooseSsid = new EventEmitter<any>();

  detailData: any[] = [];
  exportFileName = 'recentFailedPct.xlsx';
  rowSelection: boolean | GuiRowSelection = {
    enabled: true,
    type: GuiRowSelectionType.ROW
  };

  constructor(public opsDataService: OpsDataService) {
  }

  onSelectedRows(rows: Array<GuiSelectedRow>): void {
    if (rows && rows.length) {
      const ssid = rows[0].source.salesSiteId;
      this.chooseSsid.emit(ssid);
    }
  }

  exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.smsData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.exportFileName);
  }
}
